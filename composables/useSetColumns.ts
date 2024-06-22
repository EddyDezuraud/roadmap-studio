export const useUseSetColumns = (roadmapStartDate: string | null, roadmapEndDate: string | null, colSize: number) => {

  const columns = []
  const dateStart = roadmapStartDate ? new Date(String(roadmapStartDate)) : new Date();
  const dateEnd = roadmapEndDate ? new Date(String(roadmapEndDate)) : new Date();

  let currentDate = new Date(dateStart.getFullYear(), dateStart.getMonth(), 2);
  const endDate = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), 2);

  while (currentDate <= endDate) {
    columns.push({
      date: currentDate.toISOString().split('T')[0],
      show: true,
      size: colSize ? colSize : 385,
      markers: []
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return columns;
}
