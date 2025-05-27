import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState({
    time: dayjs().format("HH:mm"),
    date: dayjs().format("DD/MM/YYYY"),
    day: dayjs().format("dddd"),
    month: dayjs().format("MMMM"),
    year: dayjs().format("YYYY"),
    weekDay: dayjs().format("dddd"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime({
        time: dayjs().format("HH:mm"),
        date: dayjs().format("DD/MM/YYYY"),
        day: dayjs().format("dddd"),
        month: dayjs().format("MMMM"),
        year: dayjs().format("YYYY"),
        weekDay: dayjs().format("dddd"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};
