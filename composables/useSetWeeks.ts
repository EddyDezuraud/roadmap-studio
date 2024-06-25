import type { Week } from '../types/roadmap';

export const useSetWeeks = (roadmapStartDate: string | null, roadmapEndDate: string | null, daySize: number) => {
  const weeks = [] as Week[];

  const dateStart = roadmapStartDate ? new Date(String(roadmapStartDate)) : new Date();
  const dateEnd = roadmapEndDate ? new Date(String(roadmapEndDate)) : new Date();

  // Find the Monday of the week of dateStart
  const dayOfWeek = dateStart.getDay();
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  let currentDate = new Date(dateStart);
  currentDate.setDate(currentDate.getDate() + diffToMonday);

  let index = 0;
  let currentXPosition = 0;

  while (currentDate <= dateEnd) {
    const weekStart = new Date(currentDate);
    const weekEnd = new Date(currentDate);
    weekEnd.setDate(weekEnd.getDate() + 4); // Friday of the same week

    console.log('weekStart', weekStart);
    console.log('weekEnd', weekEnd);

    let numberOfDays = 0;

    // If the end of the week exceeds the dateEnd, adjust it
    if (weekEnd > dateEnd) {
      // Instead of modifying weekEnd directly, use dateEnd to calculate numberOfDays
      const adjustedNumberOfDays = (dateEnd.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24) + 1;
      weekEnd.setTime(dateEnd.getTime()); // Correctly set weekEnd to dateEnd
      // Calculate the number of days in the current week
      numberOfDays = adjustedNumberOfDays;
    } else {
      // Calculate the number of days in the current week
      numberOfDays = (weekEnd.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24) + 1;
    }

    if (numberOfDays > 7) {
      console.log('numberOfDays', numberOfDays);
    }

    weeks.push({
      start: weekStart.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      end: weekEnd.toISOString().split('T')[0],     // Format date as YYYY-MM-DD
      index: index,
      xPosition: currentXPosition,
      width: numberOfDays * daySize
    });

    // Update xPosition for the next week
    currentXPosition += numberOfDays * daySize;

    // Move to the Monday of the next week
    currentDate.setDate(currentDate.getDate() + 7);

    // Adjust to the next Monday if necessary
    const nextDayOfWeek = currentDate.getDay();
    const nextDiffToMonday = (nextDayOfWeek === 0 ? -6 : 1) - nextDayOfWeek;
    currentDate.setDate(currentDate.getDate() + nextDiffToMonday);

    console.log('nextDiffToMonday', nextDiffToMonday);

    index++;
  }

  // supprimer le dernier élément du tableau
  weeks.pop();

  return weeks;
}
