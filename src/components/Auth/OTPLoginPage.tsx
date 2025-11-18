import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { supabase } from '../../utils/supabase/client';
import { Loader2, Phone, Mail, Chrome } from 'lucide-react';
import logo from 'figma:asset/b351f80226d29dc81dd89730efa7bf2830c8c39f.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface OTPLoginPageProps {
  onLoginSuccess: () => void;
  onSwitchToSignup: () => void;
  onSwitchToPasswordLogin: () => void;
}

export function OTPLoginPage({ onLoginSuccess, onSwitchToSignup, onSwitchToPasswordLogin }: OTPLoginPageProps) {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (loginMethod === 'phone') {
        // Send OTP to phone
        const { error } = await supabase.auth.signInWithOtp({
          phone: phoneOrEmail,
        });
        
        if (error) throw error;
      } else {
        // Send OTP to email
        const { error } = await supabase.auth.signInWithOtp({
          email: phoneOrEmail,
        });
        
        if (error) throw error;
      }

      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (loginMethod === 'phone') {
        const { error } = await supabase.auth.verifyOtp({
          phone: phoneOrEmail,
          token: otp,
          type: 'sms',
        });
        
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.verifyOtp({
          email: phoneOrEmail,
          token: otp,
          type: 'email',
        });
        
        if (error) throw error;
      }

      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
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
            <CardTitle className="text-2xl text-emerald-900">Sign In</CardTitle>
            <CardDescription>Choose your preferred sign-in method</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50"
            >
              <Chrome className="h-5 w-5 mr-2" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or sign in with OTP</span>
              </div>
            </div>

            {/* OTP Login */}
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as 'phone' | 'email')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </TabsTrigger>
                <TabsTrigger value="email">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4 mt-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 1234567890"
                        value={phoneOrEmail}
                        onChange={(e) => setPhoneOrEmail(e.target.value)}
                        required
                        className="border-emerald-200"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Send OTP
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-800">
                      OTP sent to {phoneOrEmail}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="border-emerald-200 text-center tracking-widest"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOtpSent(false)}
                        className="flex-1 border-emerald-300"
                      >
                        Change Number
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                      >
                        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Verify OTP
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={phoneOrEmail}
                        onChange={(e) => setPhoneOrEmail(e.target.value)}
                        required
                        className="border-emerald-200"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Send OTP
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-800">
                      OTP sent to {phoneOrEmail}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="border-emerald-200 text-center tracking-widest"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOtpSent(false)}
                        className="flex-1 border-emerald-300"
                      >
                        Change Email
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                      >
                        {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Verify OTP
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <button
                onClick={onSwitchToPasswordLogin}
                className="text-sm text-emerald-600 hover:underline w-full text-center"
              >
                Sign in with password instead
              </button>
              
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={onSwitchToSignup}
                  className="text-emerald-600 hover:underline"
                >
                  Create account
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials Note */}
        <Card className="mt-4 bg-amber-50/80 backdrop-blur-md border-amber-200">
          <CardContent className="pt-4">
            <p className="text-sm text-amber-800">
              <strong>Demo:</strong> Use demo@taarana.com / demo123456 for testing
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
