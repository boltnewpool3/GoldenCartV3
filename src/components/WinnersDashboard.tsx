import { useState } from 'react';
import { Trophy, Trash2 } from 'lucide-react';
import { Winner } from '../types/raffle';
import { DeleteWinnerModal } from './DeleteWinnerModal';

interface WinnersDashboardProps {
  winners: Winner[];
  onDeleteWinner?: (week: number) => void;
}

export function WinnersDashboard({ winners, onDeleteWinner }: WinnersDashboardProps) {
  const [deleteModal, setDeleteModal] = useState<{ week: number; name: string } | null>(null);
  return (
    <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-400 bg-opacity-10 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white border-opacity-20">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-amber-300" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent">Winners Dashboard</h2>
      </div>

      <div className="grid gap-4">
        {winners.map((winner) => (
          <div
            key={winner.week}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white border-opacity-20 hover:border-opacity-40 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Week {winner.week}
                  </span>
                  <span className="text-emerald-300 font-semibold text-lg">
                    ${winner.prizeAmount}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {winner.name}
                </h3>
                <p className="text-white text-opacity-70 text-sm">
                  <span className="font-medium">Supervisor:</span> {winner.supervisor}
                </p>
                <p className="text-white text-opacity-70 text-sm">
                  <span className="font-medium">Department:</span> {winner.department}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-12 h-12 text-amber-300" />
                {onDeleteWinner && (
                  <button
                    onClick={() => setDeleteModal({ week: winner.week, name: winner.name })}
                    className="text-red-300 hover:text-red-400 transition-colors p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg"
                    title="Delete Winner"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteModal && (
        <DeleteWinnerModal
          winnerName={deleteModal.name}
          week={deleteModal.week}
          onConfirm={() => {
            if (onDeleteWinner) {
              onDeleteWinner(deleteModal.week);
            }
          }}
          onClose={() => setDeleteModal(null)}
        />
      )}
    </div>
  );
}
