export const useDatePosition = (date: Date, roadmapStartDate: string | null, daySize: number) => {
  // Convertir roadmapStartDate en objet Date, sinon utiliser la date actuelle
  const dateStart = roadmapStartDate ? new Date(String(roadmapStartDate)) : new Date();
  
  // Initialiser currentDate avec la date de début du roadmap
  let currentDate = new Date(dateStart);
  
  // Variable pour stocker la position en pixels
  let x = 0;

  // Parcourir les jours jusqu'à atteindre la date spécifiée
  while (currentDate < date) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclure les dimanches (0) et samedis (6)
      x += daySize;
    }
    // Passer au jour suivant
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return x;
}
