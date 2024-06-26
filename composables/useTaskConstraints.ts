import type { Task } from '@/types/roadmap';

export const useTaskConstraints = () => {

  const isTaskDateLine = (tasks: Task[], date: Date) => {
    return tasks.some(task => isTaskDate(task, date));
  }

  const isTaskDate = (task: Task, date: Date) => {
    const startDate = new Date(task.start_date);
    const endDate = getTaskEndDate(task);
    return startDate <= date && date <= endDate;
  }

  const addWorkingDays = (startDate: Date, days: number): Date => {
    let date = new Date(startDate);
    while (days > 0) {
        date.setDate(date.getDate() + 1);
        // Check if the date is not a Saturday or Sunday
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            days -= 1;
        }
    }
    return date;
  }

  const getTaskEndDate = (task: Task): Date => {
    const startDate = new Date(task.start_date);
    let endDate = new Date(startDate);
    task.task_stages.forEach(taskStage => {
      endDate = addWorkingDays(endDate, taskStage.duration);
    });
    return endDate;
  }

  const arrayOfDatesLine = (tasks: Task[]): Date[] => {
    const dates: Date[] = [];
    tasks.forEach(task => {
      const startDate = new Date(task.start_date);
      const endDate = getTaskEndDate(task);
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
          dates.push(new Date(d));
        }
      }
    });
    return dates;
  }

  const arrayOfDatesTask = (task: Task): Date[] => {
    const dates: Date[] = [];
    const startDate = new Date(task.start_date);
    const endDate = getTaskEndDate(task);
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
        dates.push(new Date(d));
      }
    }
    return dates;
  }

  const getWeekDaysList = (startDate: string): Date[] => {
    const dates: Date[] = [];
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
        dates.push(new Date(d));
      }
    }
    return dates;
  }

  return {
    isTaskDateLine,
    isTaskDate,
    arrayOfDatesLine,
    arrayOfDatesTask,
    getWeekDaysList,
  }
}
