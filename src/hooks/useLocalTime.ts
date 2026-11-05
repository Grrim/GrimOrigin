import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });

/** Current time in Poland, e.g. "18:42 CET", refreshed every 30 s. */
export function useLocalTime() {
  const [time, setTime] = useState(() => formatter.format(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatter.format(new Date())), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}
