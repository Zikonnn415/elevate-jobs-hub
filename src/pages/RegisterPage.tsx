import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { register, clearError } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { UserType } from '@/models/types';
import { Briefcase, Mail, Lock, User, Building2, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialUserType = searchParams.get('type') === 'company' ? 'company' : 'job_seeker';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: initialUserType as UserType,
    companyName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters.',
        variant: 'destructive',
      });
      return;
    }

    const result = await dispatch(
      register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        userType: formData.userType,
        companyName: formData.userType === 'company' ? formData.companyName : undefined,
      })
    );
    
    if (register.fulfilled.match(result)) {
      toast({
        title: 'Account created!',
        description: 'Welcome to Elevate Workforce Solutions.',
      });
      navigate('/');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-bold mb-4">
            Join Nepal's Leading Job Platform
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Whether you're looking for your dream job or seeking top talent,
            we're here to help you succeed.
          </p>
          <div className="space-y-4">
            {[
              'Free account creation',
              'Personalized job recommendations',
              'Direct communication with employers',
              'Real-time application tracking',
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-left"
              >
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
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
              <CardTitle className="font-display text-2xl">Create an account</CardTitle>
              <CardDescription>
                Get started with your free account today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}

                {/* User Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateFormData('userType', 'job_seeker')}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all text-left',
                        formData.userType === 'job_seeker'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <User className={cn(
                        'h-6 w-6 mb-2',
                        formData.userType === 'job_seeker' ? 'text-primary' : 'text-muted-foreground'
                      )} />
                      <p className="font-medium">Job Seeker</p>
                      <p className="text-xs text-muted-foreground">Find your dream job</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateFormData('userType', 'company')}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all text-left',
                        formData.userType === 'company'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <Building2 className={cn(
                        'h-6 w-6 mb-2',
                        formData.userType === 'company' ? 'text-primary' : 'text-muted-foreground'
                      )} />
                      <p className="font-medium">Company</p>
                      <p className="text-xs text-muted-foreground">Hire top talent</p>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {formData.userType === 'company' ? 'Contact Name' : 'Full Name'}
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => updateFormData('fullName', e.target.value)}
                    icon={<User className="h-4 w-4" />}
                    required
                  />
                </div>

                {formData.userType === 'company' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      icon={<Building2 className="h-4 w-4" />}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    icon={<Mail className="h-4 w-4" />}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    icon={<Lock className="h-4 w-4" />}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
