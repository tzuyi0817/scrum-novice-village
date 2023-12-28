import { ref, nextTick, toRefs } from 'vue';
import { createUuid, swap } from '@/utils/common';
import type { ListMap } from '@/types/drag';

const listMap = new Map<string, ListMap>();
const dragId = ref<string | undefined>(undefined);
const dragAreaId = ref<string | undefined>(undefined);
const currentDragElement = ref<HTMLLIElement | null>(null);
const currentDropElement = ref<HTMLLIElement | null>(null);

interface Props {
  modelValue: unknown[];
  disabledArea?: boolean;
}

export default function useDrag(props: Props, areaId: string) {
  const draggableList = ref<Array<string>>([]);
  const { modelValue } = toRefs(props);

  listMap.set(areaId, { draggableList, modelValue });

  function handleDragAreaEnter(event: DragEvent) {
    const areaId = (<HTMLLIElement>event.target).dataset.draggableArea;
    if (areaId === void 0 || props.disabledArea) return;
    moveOtherArea(areaId);
  }

  function handleDrag(event: DragEvent) {
    const target = <HTMLLIElement>event.target;
    if (target.dataset.draggableId === currentDragElement.value?.dataset.draggableId) return;
    currentDragElement.value = target;
  }
  
  async function handleDragStart(event: DragEvent) {
    if (!event.dataTransfer) return;
    const target = <HTMLLIElement>event.target;
    const parent = target.parentElement?.parentElement?.parentElement;

    window.navigator?.vibrate(100);
    event.dataTransfer.effectAllowed = 'move';
    dragId.value = target.dataset.draggableId;
    dragAreaId.value = (<HTMLLIElement>target.parentNode).dataset.draggableArea;
    parent && (parent.style.zIndex = '6');
  }
  
  function handleDragEnd() {
    if (!currentDragElement.value) return;
    const { parentElement } = currentDragElement.value;
    const parent = parentElement?.parentElement?.parentElement;

    currentDragElement.value.style.opacity = '1';
    parent && (parent.style.zIndex = '0');
  }
  
  function handleDragEnter(event: DragEvent) {
    event.preventDefault();
    const target = <HTMLLIElement>event.target;
    const dropId = target.dataset.draggableId;
    const areaId = (<HTMLLIElement>target.parentNode).dataset.draggableArea;

    if (areaId !== void 0 && areaId !== dragAreaId.value) {
      moveOtherArea(areaId, dropId);
      return;
    }
    if (!dropId || target.dataset.draggableId === currentDropElement.value?.dataset.draggableId) return;
    currentDropElement.value = target;
    move(event, dropId);
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    if (!event.dataTransfer) return;
    event.dataTransfer.dropEffect = 'move';
  }
  
  async function move(event: DragEvent, dropId?: string) {
    if (!dragId.value || dragId.value === dropId) return;
    const dragIndex = draggableList.value.findIndex(id => id === dragId.value);
    const dropIndex = draggableList.value.findIndex(id => id === dropId);

    await nextTick();
    swap({ a: dragIndex, b: dropIndex, from: draggableList.value });
    swap({ a: dragIndex, b: dropIndex, from: props.modelValue });
  }

  async function moveOtherArea(areaId: string, dropId?: string) {
    if (!dragAreaId.value) return;
    const { draggableList: preList, modelValue: preModel } = listMap.get(dragAreaId.value)!;
    dragAreaId.value = areaId;
    const { draggableList: list, modelValue: model } = listMap.get(dragAreaId.value)!;
    const dragIndex = preList.value.findIndex((id: string) => id === dragId.value);

    if (!dropId) {
      moveToEmptyArea(preList.value, list.value, dragIndex);
      moveToEmptyArea(preModel.value, model.value, dragIndex);
    } else {
      const dropIndex = list.value.findIndex((id: string) => id === dropId);

      swap({ a: dragIndex, b: dropIndex, from: preList.value, to: list.value });
      swap({ a: dragIndex, b: dropIndex, from: preModel.value, to: model.value });
      return;
    }
    await nextTick();
    hideNewElement();
  }

  function moveToEmptyArea(previous: unknown[], current: unknown[], index: number) {
    const [target] = previous.splice(index, 1);
    current.push(target);
  }

  function hideNewElement() {
    currentDragElement.value = document.querySelector(`[data-draggable-id='${dragId.value}']`);
    currentDragElement.value!.style.opacity = '0.3';
  }
  
  function setDraggableList() {
    draggableList.value = props.modelValue.map((_: unknown) => createUuid());
  }

  return {
    handleDragAreaEnter,
    handleDrag,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragOver,
    setDraggableList,
    draggableList,
    listMap,
  }
}
