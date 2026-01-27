import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { login, clearError } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Briefcase, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    const result = await dispatch(login({ email, password }));
    
    if (login.fulfilled.match(result)) {
      toast({
        title: 'Welcome back!',
        description: 'You have been successfully logged in.',
      });
      
      const redirectTo = searchParams.get('redirect') || '/';
      navigate(redirectTo);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-muted/40 to-background">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-md">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-foreground">
                Elevate
              </span>
              <span className="font-display text-lg font-bold text-primary">
                {' '}Workforce
              </span>
            </div>
          </Link>

          <Card className="border border-border/60 shadow-xl glass-strong">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="font-display text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="h-4 w-4" />}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Lock className="h-4 w-4" />}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Create one
                  </Link>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Demo Credentials</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('seeker@test.com');
                      setPassword('password123');
                    }}
                    className="p-3 rounded-lg border hover:bg-muted transition-colors text-left"
                  >
                    <p className="font-medium text-foreground">Job Seeker</p>
                    <p className="text-xs text-muted-foreground">seeker@test.com</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('company@test.com');
                      setPassword('password123');
                    }}
                    className="p-3 rounded-lg border hover:bg-muted transition-colors text-left"
                  >
                    <p className="font-medium text-foreground">Company</p>
                    <p className="text-xs text-muted-foreground">company@test.com</p>
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel - Illustration / Info */}
      <div className="hidden lg:flex lg:flex-1 gradient-hero items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary/25 blur-3xl animate-pulse-soft" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl animate-pulse-soft" />
        </div>

        <div className="relative max-w-lg w-full space-y-6 text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1 text-xs font-medium glass-effect">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Trusted by professionals across Nepal
          </div>

          <h2 className="font-display text-3xl lg:text-4xl font-bold text-shadow-md">
            Your career journey starts <span className="text-primary-foreground/90">here.</span>
          </h2>

          <p className="text-primary-foreground/85 text-base leading-relaxed">
            Discover verified opportunities, track every application in real-time, and stay organized
            as you move towards your next role.
          </p>

          <div className="grid grid-cols-3 gap-4 text-left">
            {[
              { label: 'Jobs Posted', value: '1,250+' },
              { label: 'Companies', value: '340+' },
              { label: 'Placements', value: '5,680+' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-primary-foreground/10 px-3 py-4 backdrop-blur-md border border-primary-foreground/15 shadow-card"
              >
                <p className="text-xs text-primary-foreground/70 mb-1">{item.label}</p>
                <p className="font-display text-xl font-semibold text-primary-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
