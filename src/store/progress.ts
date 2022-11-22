import { defineStore } from "pinia";

const defaultState = {
  progress: 1,
};

export default defineStore('scrum_novice_village_progress', {
  state: () => ({ ...defaultState }),
  getters: {},
  actions: {
    setProgress(progress: number) {
      this.progress = progress;
    } 
  },
});