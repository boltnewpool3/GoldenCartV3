import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center animate-bounce-in">
      <TimeUnit value={timeLeft.days} label="Days" color="from-pink-400 to-rose-500" />
      <TimeUnit value={timeLeft.hours} label="Hours" color="from-purple-400 to-indigo-500" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" color="from-blue-400 to-cyan-500" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" color="from-green-400 to-emerald-500" />
    </div>
  );
}

function TimeUnit({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center transform hover:scale-110 transition-transform duration-300">
      <div className={`bg-gradient-to-br ${color} rounded-xl px-4 py-3 shadow-lg hover:shadow-2xl transition-shadow min-w-[70px] relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        <span className="text-3xl font-bold text-white relative z-10 animate-pulse">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm font-semibold text-gray-700 mt-2">{label}</span>
    </div>
  );
}
