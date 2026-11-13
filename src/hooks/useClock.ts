import { useEffect, useState } from 'react';

const format = (timeZone: string | undefined, seconds: boolean) =>
  new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: seconds ? '2-digit' : undefined, timeZone });

/** Live clock. `timeZone` undefined = the visitor's own time. */
export function useClock(timeZone?: string, seconds = false) {
  const [time, setTime] = useState(() => format(timeZone, seconds));
  useEffect(() => {
    const tick = () => setTime(format(timeZone, seconds));
    tick();
    const id = window.setInterval(tick, seconds ? 1000 : 10000);
    return () => window.clearInterval(id);
  }, [timeZone, seconds]);
  return time;
}
