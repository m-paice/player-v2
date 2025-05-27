export const generateTimeSlots = (start: string, end: string) => {
  const timeSlots: string[] = [];

  const startHour = parseInt(start.split(":")[0], 10);
  const endHour = parseInt(end.split(":")[0], 10);
  const startMinute = parseInt(start.split(":")[1], 10);
  const endMinute = parseInt(end.split(":")[1], 10);

  for (let hour = startHour; hour <= endHour; hour++) {
    const minuteStart = hour === startHour ? startMinute : 0;
    const minuteEnd = hour === endHour ? endMinute : 59;

    for (let minute = minuteStart; minute <= minuteEnd; minute += 30) {
      const formattedHour = String(hour).padStart(2, "0");
      const formattedMinute = String(minute).padStart(2, "0");
      timeSlots.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return timeSlots;
};
