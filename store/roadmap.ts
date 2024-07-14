import { defineStore } from 'pinia'
import type { Roadmap, Segment, Column, Stage, Job, Week, Task } from '~/types/roadmap'

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
      data: null,
      id: null as number | null
    },
    tasks: [] as Task[],
    roadmap: {} as any
  }),
  getters: {
    getDaySize(): number {
      return this.daySize
    },
    getWeekSize(): number {
      return this.colSize / 4
    },
  },
  actions: {
    setRoadmap(value: any) {
      this.roadmap = value
    },
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
    setModal(value: {type: string, show: boolean, id: number | null, data?: any}) {
      this.modal.show = value.show;
      this.modal.type = value.type;
      this.modal.id = value.id;
      this.modal.data = value.data;
    },
    setDaySize(value: number) {
      this.daySize = value
    },
    setWeeks(value: Week[]) {
      this.weeks = value
    },
    setTasks (value: Task[]) {
      this.tasks.splice(0, this.tasks.length);
      this.tasks.push(...value);
    },
    updateTaskStartDate(taskId: number, newDate: string) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        task.start_date = newDate;
      }
    },
    addSegment(segment: Segment, product_id: number) {

      const productIndex = this.roadmap.products.findIndex((p: any) => p.id === product_id);
      console.log('addSegment', segment);
      if(productIndex < 0) return;
      this.roadmap.products[productIndex].product_segments.push(segment)
    },
    removeSegment(segmentId: number, product_id: number) {
      const productIndex = this.roadmap.products.findIndex((p: any) => p.id === product_id);
      if(productIndex < 0) return;
      const index = this.roadmap.products[productIndex].product_segments.findIndex((s: any) => s.id === segmentId);
      this.roadmap.products[productIndex].product_segments.splice(index, 1);
    },
    removeTask(taskIndex: number, productIndex: number, segmentIndex: number, lineIndex: number) {
      this.roadmap.products[productIndex].product_segments[segmentIndex].lines[lineIndex].tasks.splice(taskIndex, 1);
    },
    addTask(task: Task) {
      this.roadmap.products.forEach((product: any) => {
        product.product_segments.forEach((segment: any) => {
          segment.lines.forEach((line: any) => {
            if (line.id === task.line_id) {
              line.tasks.push(task);
            }
          });
        });
      });
    },
    updateTask(task: Task) {
      // todo add things
      this.roadmap.products.forEach((product: any) => {
        product.product_segments.forEach((segment: any) => {
          segment.lines.forEach((line: any) => {
            if (line.id === task.line_id) {
              const index = line.tasks.findIndex((t: any) => t.id === task.id);
              line.tasks[index].name = task.name;
              line.tasks[index].info = task.info;
              line.tasks[index].subtitle = task.subtitle;
              line.tasks[index].start_date = task.start_date;
              line.tasks[index].logo = task.logo;
            }
          });
        });
      });
    }
  }
})
