// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext'; // Import useAuth

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth(); // Get signUp function from context
  // No need for navigate here directly, AuthContext handles it (or user waits for confirmation email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Basic password strength check (example: minimum 6 characters)
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    // Call the actual signUp function from AuthContext
    const { error } = await signUp(email, password, name);

    // Error handling is done within the signUp function (shows toast)
    // Success handling (toast and potential navigation if auto-login) is done within the AuthContext
    // Or the user is told to check their email

    // We only need to stop loading indicator if there was an error here,
    // otherwise navigation/state change will happen via context.
    if (error) {
      setIsLoading(false);
    }
    // If signup requires email confirmation, we stay on the page, so stop loading
    // Check Supabase settings if "Confirm email" is enabled.
    // Let's assume it might require confirmation, so we stop loading regardless on success too for now.
    // A small delay might be good before stopping loading on success to allow context to potentially navigate
    setTimeout(() => setIsLoading(false), 500);

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
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-clay-600 focus:border-transparent"
                    required
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    placeholder="Password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-clay-600 focus:border-transparent"
                    required
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Keep terms checkbox for UI, but actual enforcement depends on your needs */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 focus:ring-clay-600"
                  required
                  disabled={isLoading}
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
                   <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span> // Better loading spinner
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Sign Up
                  </>
                )}
              </button>
            </form>
             {/* Optional: Add Google Sign In Button Here */}
             {/* You would need to call signInWithGoogle from useAuth() */}
             {/* Example: <button onClick={() => signInWithGoogle()} disabled={isLoading}>Sign Up with Google</button> */}
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
