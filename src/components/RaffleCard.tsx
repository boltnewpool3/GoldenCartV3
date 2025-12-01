import { Calendar, Users, Gift, CheckCircle, Play } from 'lucide-react';
import { RaffleWeek } from '../types/raffle';
import { CountdownTimer } from './CountdownTimer';
import { ComingSoonCard } from './ComingSoonCard';

interface RaffleCardProps {
  raffle: RaffleWeek;
  onStartDraw?: () => void;
  canDraw?: boolean;
}

export function RaffleCard({ raffle, onStartDraw, canDraw = false }: RaffleCardProps) {
  const isCompleted = raffle.status === 'completed';
  const isActive = raffle.status === 'active';
  const isComingSoon = raffle.status === 'coming_soon';

  if (isComingSoon) {
    return <ComingSoonCard raffle={raffle} />;
  }

  return (
    <div
      className={`rounded-3xl backdrop-blur-xl border border-white border-opacity-20 shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:border-opacity-40 ${
        isCompleted
          ? 'bg-white bg-opacity-5'
          : isActive
          ? 'bg-gradient-to-br from-cyan-400 via-blue-400 to-teal-400 bg-opacity-10'
          : 'bg-white bg-opacity-5'
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">
            Week {raffle.week}
          </h3>
          {isCompleted && (
            <div className="flex items-center gap-2 bg-emerald-500 bg-opacity-30 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400 border-opacity-30">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Winner Declared</span>
            </div>
          )}
          {isActive && (
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-1 rounded-full">
              <span className="text-sm font-semibold">Active</span>
            </div>
          )}
          {isComingSoon && (
            <div className="bg-white bg-opacity-10 backdrop-blur-lg text-white px-4 py-1 rounded-full border border-white border-opacity-20">
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-emerald-300 mb-4">
          <Gift className="w-5 h-5" />
          <span className="text-lg font-semibold">Prize: $300</span>
        </div>

        {isCompleted && raffle.winner && (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 border border-white border-opacity-20">
            <p className="text-sm text-white text-opacity-70 mb-2">Winner</p>
            <p className="font-bold text-lg text-white">{raffle.winner.name}</p>
            <p className="text-sm text-white text-opacity-60 mt-1">
              {raffle.winner.supervisor} • {raffle.winner.department}
            </p>
          </div>
        )}

        {isActive && (
          <>
            <div className="flex items-center gap-2 text-white text-opacity-80 mb-4">
              <Users className="w-5 h-5" />
              <span className="font-medium">
                {raffle.contestants.length} Contestants
              </span>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 max-h-60 overflow-y-auto mb-4 border border-white border-opacity-20">
              <div className="space-y-2">
                {raffle.contestants.map((contestant, idx) => (
                  <div
                    key={idx}
                    className="border-b border-white border-opacity-10 last:border-0 pb-2 last:pb-0"
                  >
                    <p className="font-semibold text-white text-sm">
                      {contestant.name}
                    </p>
                    <p className="text-xs text-white text-opacity-60">
                      {contestant.supervisor} • {contestant.department}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {canDraw && onStartDraw && (
              <button
                onClick={onStartDraw}
                className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Start Raffle Draw
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
