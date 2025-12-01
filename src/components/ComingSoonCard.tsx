import { Sparkles } from 'lucide-react';
import { RaffleWeek } from '../types/raffle';

interface ComingSoonCardProps {
  raffle: RaffleWeek;
}

export function ComingSoonCard({ raffle }: ComingSoonCardProps) {
  const days = Math.ceil((raffle.drawDate!.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const hours = Math.ceil(((raffle.drawDate!.getTime() - Date.now()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const colors = [
    'from-cyan-400 to-blue-500',
    'from-blue-400 to-teal-500',
    'from-teal-400 to-cyan-500',
  ];

  const colorClass = colors[raffle.week % colors.length];

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />

      <div className={`relative bg-gradient-to-br ${colorClass} bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-300 rounded-full filter blur-3xl animate-blob" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-teal-300 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-cyan-300 animate-spin" style={{ animationDuration: '3s' }} />
              <Sparkles className="absolute inset-0 w-12 h-12 text-blue-300 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
            </div>
          </div>

          <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-200 via-blue-200 to-teal-200 bg-clip-text text-transparent">
            Week {raffle.week}
          </h3>

          <p className="text-white text-opacity-80 font-semibold mb-6">
            Coming Soon
          </p>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 mb-6">
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent animate-pulse">
                  {Math.max(0, days)}
                </div>
                <p className="text-white text-opacity-60 text-sm mt-1">Days</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-teal-200 bg-clip-text text-transparent animate-pulse">
                  {Math.max(0, hours % 24)}
                </div>
                <p className="text-white text-opacity-60 text-sm mt-1">Hours</p>
              </div>
            </div>
          </div>

          <p className="text-white text-opacity-70 text-sm">
            Draw Date: {raffle.drawDate?.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-300 animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 rounded-full bg-teal-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
