import React, { useState, useEffect } from 'react';
import { Compass, ArrowLeft, Mail, Lock, ArrowRight, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types';
import { supabase } from '../../lib/supabase';

interface AuthViewProps {
  initialRole?: UserRole;
  onLogin: (role?: UserRole, userName?: string, userEmail?: string) => void;
  onBack: () => void;
}

export default function AuthView({ onLogin, onBack }: AuthViewProps) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Human-friendly error messages
  const getFriendlyErrorMessage = (err: any, isSignUpMode: boolean): string => {
    if (!err) return 'Invalid email or password. Please check your credentials and try again.';
    
    const raw = (err.message || err.error_description || String(err)).toLowerCase();
    const code = (err.code || '').toLowerCase();

    if (
      code.includes('email_provider_disabled') ||
      raw.includes('email_provider_disabled') ||
      raw.includes('email signups are disabled') ||
      raw.includes('email logins are disabled')
    ) {
      return 'Email authentication is currently disabled in your Supabase project. Please go to Supabase Dashboard -> Authentication -> Providers -> Email and turn "Enable Email provider" ON.';
    }

    if (raw.includes('load failed') || raw.includes('failed to fetch') || raw.includes('network error')) {
      return 'Unable to reach authentication service. Please ensure the Email provider is enabled in your Supabase project (Authentication -> Providers -> Email).';
    }

    if (raw.includes('email not confirmed') || raw.includes('confirm your email') || raw.includes('unconfirmed')) {
      return 'Please verify your email address. Check your inbox for the confirmation link, or sign in if already verified.';
    }

    if (
      code.includes('invalid-credential') ||
      code.includes('user-not-found') ||
      code.includes('wrong-password') ||
      raw.includes('invalid-credential') ||
      raw.includes('user-not-found') ||
      raw.includes('wrong-password') ||
      raw.includes('invalid login credentials')
    ) {
      return isSignUpMode
        ? 'Unable to create account with these credentials. Please check your details.'
        : 'Invalid email or password. If you do not have an account yet, click "Sign Up" below.';
    }

    if (code.includes('invalid-email') || raw.includes('invalid-email') || raw.includes('valid email')) {
      return 'Please enter a valid email address.';
    }

    if (code.includes('email-already-in-use') || raw.includes('email-already-in-use') || raw.includes('already registered')) {
      return 'An account with this email already exists. Please switch to "Sign In".';
    }

    if (code.includes('weak-password') || raw.includes('weak-password') || raw.includes('at least 6 characters')) {
      return 'Password must be at least 6 characters long.';
    }

    if (code.includes('missing-password') || raw.includes('missing-password')) {
      return 'Please enter your password.';
    }

    if (code.includes('too-many-requests') || raw.includes('too-many-requests')) {
      return 'Too many failed attempts. Please wait a moment and try again.';
    }

    if (err.message && typeof err.message === 'string' && err.message.length > 3) {
      return err.message;
    }

    return isSignUpMode
      ? 'Unable to create account. Please check your details and try again.'
      : 'Invalid email or password. Please check your credentials and try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const trimmedInput = emailOrUsername.trim();
    if (!trimmedInput) {
      setErrorMsg('Please enter your email or username.');
      setLoading(false);
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      setLoading(false);
      return;
    }

    const isEmail = trimmedInput.includes('@');
    const targetEmail = isEmail 
      ? trimmedInput.toLowerCase() 
      : `${trimmedInput.toLowerCase().replace(/[^a-z0-9_.-]/g, '')}@buildsync.internal`;
    
    const targetName = isSignUp 
      ? (fullName.trim() || trimmedInput) 
      : (trimmedInput.includes('@') ? trimmedInput.split('@')[0] : trimmedInput);

    if (isSignUp && password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    // Supabase Authentication
    if (supabase) {
      try {
        if (isSignUp) {
          const { data, error } = await supabase.auth.signUp({
            email: targetEmail,
            password,
            options: { data: { full_name: targetName } }
          });
          if (error) throw error;
          if (data.user) {
            try {
              await supabase.from('profiles').upsert([
                { id: data.user.id, full_name: targetName, role: 'client' }
              ], { onConflict: 'id' });
            } catch {}
          }
          
          if (data.session) {
            localStorage.setItem('buildsync_user_name', targetName);
            localStorage.setItem('buildsync_user_email', isEmail ? targetEmail : '');
            setSuccessMsg('Account created successfully! Taking you to your portal...');
            setTimeout(() => {
              onLogin('client', targetName, isEmail ? targetEmail : '');
            }, 600);
            return;
          } else {
            // Email confirmation link was sent
            setSuccessMsg('Account created! If email confirmation is enabled on your project, please check your inbox to confirm, then sign in.');
            setIsSignUp(false);
            setLoading(false);
            return;
          }
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({ 
            email: targetEmail, 
            password 
          });
          if (error) throw error;
          if (data.user) {
            let resolvedName = targetName;
            try {
              const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', data.user.id).single();
              if (profile?.full_name) {
                resolvedName = profile.full_name;
              }
            } catch {}
            localStorage.setItem('buildsync_user_name', resolvedName);
            localStorage.setItem('buildsync_user_email', isEmail ? targetEmail : '');
            onLogin('client', resolvedName, isEmail ? targetEmail : '');
            return;
          }
        }
      } catch (sbErr: any) {
        console.warn('Supabase auth attempt:', sbErr);
        setErrorMsg(getFriendlyErrorMessage(sbErr, isSignUp));
        setLoading(false);
        return;
      }
    } else {
      setErrorMsg('Authentication service is not connected. Please check your internet connection.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050E0A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-[#E5E4E0]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#06110D]/90 z-10" />
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute bottom-1/4 -right-20 w-[300px] h-[300px] bg-[#059669]/10 rounded-full blur-3xl pointer-events-none z-10" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center cursor-pointer" onClick={onBack}>
          <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <Compass size={24} className="text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white tracking-tight">
          {isSignUp ? 'Create an Account' : 'Client Portal'}
        </h2>
        <p className="mt-2 text-center text-sm text-[#A0A0A0]">
          {isSignUp ? 'Sign up to manage your project' : 'Sign in to access your dashboard'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-[#06110D] py-8 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:px-10 border border-white/10 backdrop-blur-2xl">
          <button
            onClick={onBack}
            className="flex items-center text-xs text-[#A0A0A0] hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft size={14} className="mr-1" /> Back to Website
          </button>
          
          {errorMsg && (
            <div className="mb-5 bg-red-500/10 border border-red-500/40 text-red-300 text-sm p-3.5 rounded-xl flex items-start gap-2.5">
              <AlertCircle size={17} className="text-red-400 flex-shrink-0 mt-0.5" />
              <span className="leading-snug">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 bg-green-500/10 border border-green-500/50 text-green-400 text-sm p-3.5 rounded-xl flex items-center gap-2">
              <CheckCircle2 size={17} className="flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Full Name / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-[#666]" />
                  </div>
                  <input
                    type="text"
                    required={isSignUp}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all sm:text-sm"
                    placeholder="e.g. John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                {isSignUp ? 'Email Address' : 'Email or Username'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-[#666]" />
                </div>
                <input
                  type={isSignUp ? 'email' : 'text'}
                  required
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all sm:text-sm"
                  placeholder={isSignUp ? 'client@example.com' : 'client@example.com or username'}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Password
                </label>
                {isSignUp && (
                  <span className="text-[11px] text-[#888]">Min. 6 characters</span>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-[#666]" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl bg-white/5 text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-[#10B981] hover:bg-[#059669] transition-all cursor-pointer mt-5 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#A0A0A0]">
            {isSignUp ? (
              <>Already have an account? <button onClick={() => { setIsSignUp(false); setErrorMsg(''); }} className="text-[#10B981] hover:underline font-bold ml-1 cursor-pointer">Sign In</button></>
            ) : (
              <>Don't have an account? <button onClick={() => { setIsSignUp(true); setErrorMsg(''); }} className="text-[#10B981] hover:underline font-bold ml-1 cursor-pointer">Sign Up</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
