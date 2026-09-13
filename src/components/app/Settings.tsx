import React, { useState, useRef } from 'react';
import { User, Bell, Shield, Key, LogOut, Home } from 'lucide-react';

interface SettingsProps {
  profilePic: string | null;
  setProfilePic: (pic: string | null) => void;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  onReturnHome?: () => void;
  onUpdateProfileName?: (newName: string) => Promise<void> | void;
}

export default function Settings({ 
  profilePic, 
  setProfilePic, 
  userName, 
  userEmail, 
  onLogout, 
  onReturnHome,
  onUpdateProfileName 
}: SettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState(userName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  React.useEffect(() => {
    if (userName) {
      setFullName(userName);
    }
  }, [userName]);

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    if (onUpdateProfileName && fullName.trim()) {
      try {
        await onUpdateProfileName(fullName.trim());
      } catch (err) {
        console.warn('Profile save error:', err);
      }
    }
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-2xl font-semibold text-[#06110D]">Profile & Settings</h1>
        <p className="text-[#666] text-sm">Manage your personal information and application preferences.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#A7F3D0] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#A7F3D0] flex items-center gap-4 bg-[#FAFAFA]">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#06110D] to-[#4A4A4A] flex items-center justify-center text-white text-xl font-semibold shadow-md overflow-hidden">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              userName ? userName.charAt(0).toUpperCase() : 'C'
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#06110D]">{userName || 'Client'}</h2>
            <p className="text-sm text-[#666]">{userEmail || 'client@example.com'}</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleProfileUpload} 
            className="hidden" 
            accept="image/*"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="ml-auto px-4 py-2 border border-[#A7F3D0] rounded-xl text-sm font-medium hover:bg-[#F0EFED] transition-colors"
          >
            Upload Photo
          </button>
        </div>

        <div className="p-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A0A0A0] flex items-center gap-2 mb-4">
                <User size={16} /> Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    className="w-full px-4 py-2.5 border border-[#A7F3D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-[#FCFBF9]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5">Company / Organization</label>
                  <input type="text" defaultValue="" className="w-full px-4 py-2.5 border border-[#A7F3D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-[#FCFBF9]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5">Email Address</label>
                  <input type="email" defaultValue={userEmail || ''} className="w-full px-4 py-2.5 border border-[#A7F3D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-[#FCFBF9]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2.5 border border-[#A7F3D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-[#FCFBF9]" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#A7F3D0]">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A0A0A0] flex items-center gap-2 mb-4">
                <Key size={16} /> Security
              </h3>
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-[#A7F3D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-[#FCFBF9]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5">New Password</label>
                  <input type="password" placeholder="Leave blank to keep current" className="w-full px-4 py-2.5 border border-[#A7F3D0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] bg-[#FCFBF9]" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#A7F3D0]">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A0A0A0] flex items-center gap-2 mb-4">
                <Bell size={16} /> Notification Preferences
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#10B981] rounded border-[#A7F3D0] focus:ring-[#10B981]" />
                  <span className="text-sm text-[#4A4A4A]">Email me when a document is uploaded</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#10B981] rounded border-[#A7F3D0] focus:ring-[#10B981]" />
                  <span className="text-sm text-[#4A4A4A]">Email me for new messages</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#10B981] rounded border-[#A7F3D0] focus:ring-[#10B981]" />
                  <span className="text-sm text-[#4A4A4A]">Weekly project progress summaries</span>
                </label>
              </div>
            </div>

            <div className="pt-8 border-t border-[#A7F3D0] flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {onReturnHome && (
                  <button type="button" onClick={onReturnHome} className="px-6 py-2.5 border border-[#10B981] text-[#10B981] rounded-xl text-sm font-semibold hover:bg-[#10B981]/10 transition-colors flex items-center justify-center gap-2">
                    <Home size={16} /> Back to Website
                  </button>
                )}
                {onLogout && (
                  <button type="button" onClick={onLogout} className="px-6 py-2.5 border border-rose-200 text-rose-500 rounded-xl text-sm font-semibold hover:bg-rose-50 transition-colors flex items-center justify-center gap-2">
                    <LogOut size={16} /> Sign Out
                  </button>
                )}
              </div>
              <div className="flex justify-end gap-4">
              <button type="button" className="px-6 py-2.5 border border-[#A7F3D0] text-[#4A4A4A] rounded-xl text-sm font-semibold hover:bg-[#F0EFED] transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-[#10B981] text-white rounded-xl text-sm font-bold hover:bg-[#2D2D2D] transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2">
                {isSaving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div></form>
        </div>
      </div>
    </div>
  );
}
