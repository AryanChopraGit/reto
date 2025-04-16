import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User as UserIcon, Mail, Lock } from 'lucide-react'; // Renamed User to UserIcon
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext'; // Import useAuth

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth(); // Get the signUp function from context

  const handleSubmit = async (e: React.FormEvent) => { // Make handleSubmit async
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Basic password strength check (example)
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
    }

    setIsLoading(true);

    // Call the actual signUp function from AuthContext
    const { error } = await signUp(email, password, name);

    setIsLoading(false);

    // AuthContext handles success/info toast (for email confirmation)
    // and navigation on SIGNED_IN event (if auto-login occurs).
    // If email confirmation is required, the user stays on the page (or you could navigate them somewhere else).
    // if (!error && !data.session) { // Or however Supabase indicates confirmation needed
    //   navigate('/check-email'); // Optional: redirect to a specific page
    // }
  };

  return (
    <main className="py-16">
      <div className="container-custom max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-serif">Create an Account</CardTitle>
            <CardDescription>
              Sign up to track orders and save your favorite items
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                     {/* Use the renamed UserIcon */}
                    <UserIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-clay-600 focus:border-transparent"
                    required
                    disabled={isLoading} // Disable input while loading
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-clay-600 focus:border-transparent"
                    required
                    disabled={isLoading} // Disable input while loading
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    placeholder="Password (min. 6 characters)" // Added hint
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-clay-600 focus:border-transparent"
                    required
                    disabled={isLoading} // Disable input while loading
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-clay-600 focus:border-transparent"
                    required
                    disabled={isLoading} // Disable input while loading
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 focus:ring-clay-600"
                  required
                  disabled={isLoading} // Disable input while loading
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link to="/terms" className="text-clay-600 hover:text-clay-800 transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-clay-600 hover:text-clay-800 transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-2 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-pulse">Creating account...</span>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Sign Up
                  </>
                )}
              </button>
            </form>
          </CardContent>

          <CardFooter className="border-t px-6 py-4">
            <div className="text-center w-full">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-clay-600 hover:text-clay-800 font-medium transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default SignupPage;
