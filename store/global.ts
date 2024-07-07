import { defineStore } from 'pinia'
import type { Roadmap } from '~/types/roadmap'

export const globalStore = defineStore({
  id: 'globalStore',
  state: () => ({ 
    roadmapList: [] as Roadmap[],
  }),
  actions: {
    setRoadmapList(value: Roadmap[]) {
      this.roadmapList = value
    },
  }
})
