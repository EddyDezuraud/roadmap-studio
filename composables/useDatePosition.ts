export const useDatePosition = (date: Date, startDate: string | null, daySize: number) => {
  const x = ref(0);
  let iterationDate = startDate ? new Date(startDate) : new Date();

  while (iterationDate <= date) {
    const dayOfWeek = iterationDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
      x.value += daySize;
    }
    iterationDate.setDate(iterationDate.getDate() + 1);
  }

  return x ;
}