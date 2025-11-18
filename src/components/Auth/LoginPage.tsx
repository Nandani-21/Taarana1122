import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { supabase } from '../../utils/supabase/client';
import { Loader2 } from 'lucide-react';
import logo from 'figma:asset/b351f80226d29dc81dd89730efa7bf2830c8c39f.png';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onSwitchToSignup: () => void;
}

export function LoginPage({ onLoginSuccess, onSwitchToSignup }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img src={logo} alt="Taarana Logo" className="h-32 w-auto" />
          </div>
          <p className="text-xl text-gray-600 italic">आरोग्यं परमं भाग्यम्</p>
          <p className="text-sm text-emerald-600 mt-1">Health is the greatest blessing</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-md border-emerald-200">
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-900">Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your wellness journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-emerald-200 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-emerald-200 focus:border-emerald-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account? </span>
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Sign up
                </button>
              </div>
            </form>

            {/* Demo Info */}
            <div className="mt-6 pt-6 border-t border-emerald-100">
              <p className="text-xs text-gray-500 text-center mb-2">Demo credentials:</p>
              <div className="bg-emerald-50 rounded-lg p-3 text-xs text-emerald-800">
                <p>Email: demo@healmate.com</p>
                <p>Password: demo123456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}