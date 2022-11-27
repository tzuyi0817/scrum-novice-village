import { Ref } from 'vue';

export interface DemoListItem {
  id: string;
  name: string;
}

export interface Selector {
  ['.']: string;
  ['#']: string;
}

export interface ListMap {
  draggableList: Ref<string[]>;
  modelValue: Ref<unknown[]>;
}
