import { useState } from 'react';
import TimeInput from '../TimeInput';

export default function TimeInputExample() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const handleChange = (h: number, m: number, s: number) => {
    console.log('Time changed:', h, m, s);
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  return (
    <div className="p-8 bg-background min-h-screen flex items-center justify-center">
      <TimeInput
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        onChange={handleChange}
        disabled={false}
      />
    </div>
  );
}