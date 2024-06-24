export const useUseSetColumns = (roadmapStartDate: string | null, roadmapEndDate: string | null, daySize: number) => {

  const columns = []
  const dateStart = roadmapStartDate ? new Date(String(roadmapStartDate)) : new Date();
  const dateEnd = roadmapEndDate ? new Date(String(roadmapEndDate)) : new Date();

  let currentDate = new Date(dateStart.getFullYear(), dateStart.getMonth(), 2);
  const endDate = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), 2);

  while (currentDate <= endDate) {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

  // Calculate the number of weekdays in the current month
    let workdaysInMonth = 0;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
        workdaysInMonth++;
      }
    }
    
    columns.push({
      date: currentDate.toISOString().split('T')[0],
      show: true,
      size: daySize ? (daySize * workdaysInMonth) : (10 * workdaysInMonth),
      markers: []
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return columns;
}
