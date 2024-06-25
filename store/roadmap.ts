import { defineStore } from 'pinia'
import type { Column, Stage, Job, Week } from '~/types/roadmap'

export const roadmapStore = defineStore({
  id: 'roadmapStore',
  state: () => ({ 
    colSize: 0,
    daySize: 10,
    nbDayByMonth: 20,
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-12-31'),
    width: 0,
    columns : [] as Column[],
    weeks: [] as Week[],
    stages: [] as Stage[],
    jobs: [] as Job[],
    modal: {
      type: '',
      show: false,
      data: null
    }
  }),
  getters: {
    getDaySize(): number {
      return this.daySize
    },
    getWeekSize(): number {
      return this.colSize / 4
    }
  },
  actions: {
    setColSize(value: number) {
      this.colSize = value
    },
    setStartDate(value: string) {
      this.startDate = new Date(value)
    },
    setEndDate(value: string) {
      this.endDate = new Date(value)
    },
    setWidth(value: number) {
      this.width = value
    },
    setColumns(value: Column[]) {
      this.columns = value
    },
    setStages(value: Stage[]) {
      this.stages = value
    },
    setJobs(value: Job[]) {
      this.jobs = value
    },
    setModal(value: {type: string, show: boolean, data: any}) {
      this.modal.show = value.show;
      this.modal.type = value.type;
      this.modal.data = value.data;
    },
    setDaySize(value: number) {
      this.daySize = value
    },
    setWeeks(value: Week[]) {
      this.weeks = value
    }
  }
})
