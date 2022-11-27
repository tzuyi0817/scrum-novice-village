<script setup lang="ts">
import { useSlots, defineComponent, h, useAttrs, watch, onBeforeUnmount, shallowRef } from 'vue';
import type { VNode, Component } from 'vue';
import { isVNodeArrayChildren, isVNode } from '@/utils/checkType';
import { createUuid } from '@/utils/common';
import useDrag from '@/hooks/useDrag';
import type { Selector } from '@/types/drag';

interface Props {
  tag?: string;
  modelValue: unknown[];
  disabledArea?: boolean;
  draggable?: string;
}

const slots = useSlots();
const attrs = useAttrs();
const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
});

const SlotItems = shallowRef<Component | null>(null);
const areaId = createUuid();
const { 
  handleDragAreaEnter,
  handleDrag,
  handleDragStart,
  handleDragEnd,
  handleDragEnter,
  handleDragOver,
  setDraggableList,
  draggableList,
  listMap,
} = useDrag(props, areaId);

function renderDom() {
  return defineComponent({
    render() {
      if (!slots.default) return null;
      return slots.default().map(vNode => {
        const rawProps  = {
          class: attrs.class && [attrs.class],
          ondragenter: handleDragAreaEnter,
          ['data-draggable-area']: areaId,
        };
        const children = isVNodeArrayChildren(vNode.children)
          ? vNode.children?.map((child, index) => {
            if (isVNode(child)) {
              const draggable = isDraggable(child);

              return {
                ...child,
                props: {
                  ...child.props,
                  draggable,
                  ondragstart: draggable && handleDragStart,
                  ondrag: draggable && handleDrag,
                  ondragend: draggable && handleDragEnd,
                  ondragenter: draggable && handleDragEnter,
                  ondragover: draggable && handleDragOver,
                  class: setChildClass(child, draggable),
                  ['data-draggable-id']: draggableList.value[index],
                },
              };
            }
            return child;
          })
          : vNode.children;

        return h(props.tag, rawProps, [{ ...vNode, children }]);
      });
    }
  });
}

function isDraggable(child: VNode) {
  const { draggable } = props;
  if (draggable === void 0 || typeof draggable !== 'string') return true;
  const config = { '.': 'class', '#': 'id' };
  const selector = draggable.slice(0, 1) as keyof Selector;
  const dragClass = draggable.slice(1);
  const selectorName = child.props?.[config[selector]] ?? '';

  return selectorName.split(' ').includes(dragClass);
}

function setChildClass(child: VNode, draggable: boolean) {
  const className = child.props?.class;
  const addClass = draggable ? 'draggable_hover' : 'draggable_disable';

  return (className ? `${className} ` : '') + addClass;
}

watch(() => props.modelValue, setDraggableList, { immediate: true });
watch(
  () => [props.draggable, props.disabledArea, props.modelValue, props.disabledArea], 
  () => SlotItems.value = renderDom(),
  { immediate: true },
);
onBeforeUnmount(() => listMap.delete(areaId));
</script>

<template>
  <slot-items />
</template>

<style lang="postcss">
.draggable_hover {
  @apply hover:cursor-grab;
}

.draggable_disable {
  @apply hover:cursor-no-drop;
}
</style>
