import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsBuildSync from './components/WhatIsBuildSync';
import HowItWorks from './components/HowItWorks';
import Consultation from './components/Consultation';
import WhyBuildSync from './components/WhyBuildSync';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import InfoDrawer from './components/InfoDrawer';
import AuthView from './components/app/AuthView';
import BuildSyncApp from './components/app/BuildSyncApp';
import { supabase } from './lib/supabase';
import { ModalKey, UserRole } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'app'>('landing');
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('buildsync_user_name') || '';
  });
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('buildsync_user_email') || '';
  });
  const [userAvatar, setUserAvatar] = useState<string | null>(() => {
    return localStorage.getItem('buildsync_user_avatar') || null;
  });
  const [activeModal, setActiveModal] = useState<ModalKey>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(() => {
    try {
      const rawKeys = Object.keys(localStorage);
      const hasSupabaseToken = rawKeys.some(k => k.startsWith('sb-') && k.endsWith('-auth-token'));
      return hasSupabaseToken && !!localStorage.getItem('buildsync_user_email');
    } catch {
      return false;
    }
  });

  React.useEffect(() => {
    let supabaseSub: { unsubscribe: () => void } | null = null;

    const applySession = async (session: any) => {
      const email = session?.user?.email || '';
      const metaName = session?.user?.user_metadata?.full_name || '';

      setUserEmail(email);
      if (email) localStorage.setItem('buildsync_user_email', email);

      let finalRole: UserRole = 'client';
      let finalName = metaName || (email ? email.split('@')[0] : 'Client');
      let finalAvatar: string | null = null;

      if (supabase && session?.user?.id) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, full_name, avatar_url')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            if (profile.role) finalRole = profile.role as UserRole;
            if (profile.full_name) finalName = profile.full_name;
            if (profile.avatar_url) finalAvatar = profile.avatar_url;
          } else {
            await supabase.from('profiles').upsert({
              id: session.user.id,
              full_name: finalName,
              role: finalRole,
              avatar_url: finalAvatar
            }, { onConflict: 'id' });
          }
        } catch (dbErr) {
          console.warn('Profile sync notice:', dbErr);
        }
      }

      setUserRole(finalRole);
      setUserName(finalName);
      localStorage.setItem('buildsync_user_name', finalName);
      if (finalAvatar) {
        setUserAvatar(finalAvatar);
        localStorage.setItem('buildsync_user_avatar', finalAvatar);
      }

      setCurrentView('app');
      setIsAuthenticating(false);
    };

    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          applySession(session);
        } else {
          setIsAuthenticating(false);
        }
      }).catch(() => {
        setIsAuthenticating(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          applySession(session);
        } else if (_event === 'SIGNED_OUT') {
          setIsAuthenticating(false);
          setCurrentView('landing');
        }
      });
      supabaseSub = subscription;
    } else {
      setIsAuthenticating(false);
    }

    return () => {
      if (supabaseSub) supabaseSub.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    if (supabase) {
      try { await supabase.auth.signOut(); } catch {}
    }
    setUserEmail('');
    setUserName('');
    setUserAvatar(null);
    localStorage.removeItem('buildsync_user_name');
    localStorage.removeItem('buildsync_user_email');
    localStorage.removeItem('buildsync_user_avatar');
    setIsAuthenticating(false);
    setCurrentView('landing');
  };

  const handleUpdateProfileName = async (newName: string) => {
    setUserName(newName);
    localStorage.setItem('buildsync_user_name', newName);
    if (supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await supabase.from('profiles').update({ full_name: newName }).eq('id', session.user.id);
        }
      } catch (err) {
        console.warn('Update profile error:', err);
      }
    }
  };

  const handleOpenModal = (key: ModalKey) => {
    setActiveModal(key);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleOpenAuth = () => {
    if (userEmail) {
      setCurrentView('app');
    } else {
      setUserRole('client');
      setCurrentView('auth');
    }
  };

  const handleLogin = (role: UserRole = 'client', name?: string, email?: string) => {
    setUserRole(role);
    if (name) {
      setUserName(name);
      localStorage.setItem('buildsync_user_name', name);
    }
    if (email) {
      setUserEmail(email);
      localStorage.setItem('buildsync_user_email', email);
    }
    setCurrentView('app');
  };

  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-[#050E0A] flex flex-col items-center justify-center text-white px-4 relative z-50">
        <div className="flex flex-col items-center max-w-sm text-center gap-5 p-8 rounded-2xl bg-[#081510] border border-emerald-500/20 shadow-2xl">
          <div className="w-12 h-12 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white tracking-wide">Signing in to BuildSync</h3>
            <p className="text-sm text-slate-300">Loading your account and client portal...</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'auth') {
    return (
      <AuthView 
        initialRole="client"
        onLogin={handleLogin} 
        onBack={() => setCurrentView('landing')} 
      />
    );
  }

  if (currentView === 'app') {
    return (
      <BuildSyncApp 
        initialRole={userRole}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        onLogout={handleLogout} 
        onReturnHome={() => setCurrentView('landing')}
        onUpdateProfileName={handleUpdateProfileName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-brand-text overflow-x-hidden relative selection:bg-brand-gold selection:text-brand-bg">
      {/* High-Performance Hardware-Accelerated Architectural Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050E0A]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-80 contrast-[1.12] brightness-[1.02] saturate-[1.08] transform-gpu"
        >
          <source src="https://res.cloudinary.com/nmizpaiu/video/upload/v1/Animate_futuristic_construction___202608132345.mp4" type="video/mp4" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 arch-grid opacity-20 pointer-events-none" />

        {/* Lightweight Native CSS Radial Glows */}
        <div 
          className="absolute -top-[15%] -left-[10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 transition-all duration-700 bg-[radial-gradient(circle,#10B981_0%,transparent_70%)]"
        />
        <div 
          className="absolute top-[30%] -right-[15%] w-[650px] h-[650px] rounded-full pointer-events-none opacity-15 transition-all duration-700 bg-[radial-gradient(circle,#34D399_0%,transparent_70%)]"
        />
        <div 
          className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full pointer-events-none opacity-15 transition-all duration-700 bg-[radial-gradient(circle,#10B981_0%,transparent_70%)]"
        />

        {/* Crisp Architectural Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050E0A]/40 via-[#06110D]/30 to-[#050E0A]/80 pointer-events-none" />
      </div>

      <Navbar 
        onOpenModal={handleOpenModal} 
        onOpenAuth={handleOpenAuth} 
      />
      
      <main className="relative z-10">
        <Hero 
          onOpenModal={handleOpenModal} 
          onOpenAuth={handleOpenAuth} 
        />
        <WhatIsBuildSync />
        <HowItWorks onOpenModal={handleOpenModal} />
        <Consultation onOpenModal={handleOpenModal} />
        <WhyBuildSync />
        <CallToAction onOpenModal={handleOpenModal} />
      </main>

      <Footer onOpenModal={handleOpenModal} onOpenAuth={handleOpenAuth} />

      {/* Interactive Lower Pop-Up / Bottom Drawer Modal */}
      <InfoDrawer
        activeModal={activeModal}
        onClose={handleCloseModal}
        onSelectModal={handleOpenModal}
      />
    </div>
  );
}
