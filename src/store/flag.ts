import { defineStore } from "pinia";

const defaultState = {
  isLoading: true,
};

export default defineStore('scrum_novice_village_flag', {
  state: () => ({ ...defaultState }),
  getters: {},
  actions: {
    setLoadingFlag(isLoading: boolean) {
      this.isLoading = isLoading;
    } 
  },
});