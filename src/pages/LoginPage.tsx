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
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
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

          <Card className="border-0 shadow-xl">
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

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex lg:flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-bold mb-4">
            Your Career Journey Starts Here
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Join thousands of professionals who have found their dream jobs through
            Elevate Workforce Solutions.
          </p>
          <div className="flex flex-col gap-4">
            {[
              'Access to 1,250+ job opportunities',
              'Connect with 340+ verified companies',
              'Track applications in real-time',
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <ArrowRight className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
