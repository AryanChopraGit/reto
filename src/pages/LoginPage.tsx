// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext'; // Import useAuth

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth(); // Get signIn function from context
  // No need to navigate here directly, AuthContext handles it

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Call the actual signIn function from AuthContext
    const { error } = await signIn(email, password);

    // Error handling is done within the signIn function (shows toast)
    // Success handling (toast and navigation) is done within the AuthContext's onAuthStateChange listener

    // We only need to stop the loading indicator if there was an error here,
    // otherwise, navigation will happen via context.
    if (error) {
       setIsLoading(false);
    }
    // No need to set isLoading(false) on success, as the component might unmount due to navigation
  };

  return (
    <main className="py-16">
      <div className="container-custom max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-serif">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
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
                    <Key className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-clay-600 focus:border-transparent"
                    required
                    disabled={isLoading} // Disable input while loading
                  />
                </div>
                <div className="text-right">
                  {/* TODO: Implement forgot password functionality if needed */}
                  {/* <Link to="/forgot-password" className="text-sm text-clay-600 hover:text-clay-800 transition-colors">
                    Forgot Password?
                  </Link> */}
                </div>
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
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>
            {/* Optional: Add Google Sign In Button Here */}
            {/* You would need to call signInWithGoogle from useAuth() */}
            {/* Example: <button onClick={() => signInWithGoogle()} disabled={isLoading}>Sign In with Google</button> */}

          </CardContent>

          <CardFooter className="border-t px-6 py-4">
            <div className="text-center w-full">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-clay-600 hover:text-clay-800 font-medium transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;
