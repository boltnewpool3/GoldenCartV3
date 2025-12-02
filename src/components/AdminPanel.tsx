import { useState, useEffect } from 'react';
import { X, Settings, Calendar, Save } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface RaffleConfig {
  id: number;
  week: number;
  draw_date: string;
  is_active: boolean;
}

interface AdminPanelProps {
  onClose: () => void;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [configs, setConfigs] = useState<RaffleConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

  useEffect(() => {
    if (isAuthenticated && supabase) {
      loadConfigs();
    }
  }, [isAuthenticated]);

  const loadConfigs = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('raffle_config')
      .select('*')
      .order('week', { ascending: true });

    if (error) {
      setError('Failed to load configurations');
    } else {
      setConfigs(data || []);
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('raffle_admin_password') || 'InternationalMessaging@20';

    if (password === storedPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleDateChange = (week: number, newDate: string) => {
    setConfigs(prev => prev.map(config =>
      config.week === week
        ? { ...config, draw_date: newDate }
        : config
    ));
  };

  const handleSave = async (week: number) => {
    if (!supabase) {
      setError('Supabase not configured');
      return;
    }

    const config = configs.find(c => c.week === week);
    if (!config) return;

    setLoading(true);
    const { error } = await supabase
      .from('raffle_config')
      .update({
        draw_date: config.draw_date,
        updated_at: new Date().toISOString()
      })
      .eq('week', week);

    if (error) {
      setError(`Failed to save Week ${week}: ${error.message}`);
    } else {
      setSaveMessage(`Week ${week} saved successfully!`);
      setTimeout(() => setSaveMessage(''), 3000);
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-cyan-100 rounded-full p-3">
                <Settings className="w-8 h-8 text-cyan-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Admin Panel
            </h3>
            <p className="text-gray-600">
              Enter password to manage raffle dates
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="admin-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Enter password"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-8 h-8 text-cyan-600" />
          <h2 className="text-3xl font-bold text-gray-800">
            Raffle Configuration
          </h2>
        </div>

        {!supabase && (
          <div className="mb-6 p-4 bg-red-100 rounded-lg border-2 border-red-300">
            <p className="text-red-700 font-semibold">
              Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.
            </p>
          </div>
        )}

        {saveMessage && (
          <div className="mb-6 p-4 bg-green-100 rounded-lg border-2 border-green-300 animate-bounce-in">
            <p className="text-green-700 font-semibold">{saveMessage}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 rounded-lg border-2 border-red-300">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {loading && configs.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-pulse text-gray-600">Loading configurations...</div>
            </div>
          ) : (
            configs.map((config) => (
              <div
                key={config.week}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Week {config.week}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    config.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {config.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Draw Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={config.draw_date.slice(0, 16)}
                      onChange={(e) => handleDateChange(config.week, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => handleSave(config.week)}
                    disabled={loading}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:bg-gray-400"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Changes to raffle dates will take effect immediately. Make sure to refresh the page after saving to see updates.
          </p>
        </div>
      </div>
    </div>
  );
}
