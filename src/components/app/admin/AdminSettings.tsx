import React, { useState } from 'react';
import { 
  Building2, Shield, Bell, Key, Save, CheckCircle2, 
  Download, HardHat, Mail, Phone, MapPin, Globe
} from 'lucide-react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'BuildSync Construction & Architectural Services LLC',
    contractorLicense: 'TX-GC-982410-A',
    aiaChapter: 'AIA Austin #4402',
    phone: '+1 (512) 555-0199',
    email: 'operations@buildsync.io',
    address: '800 Brazos Street, Suite 500, Austin, TX 78701',
    insuranceCarrier: 'Travelers Commercial Builders Policy #TB-9021884',
    enableAutoNotifications: true,
    requirePermitReview: true,
    allowClientDirectUpload: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#06110D]">General Contractor & Console Settings</h1>
        <p className="text-sm text-[#666]">
          Configure company licensing, municipal permit integration policies, and administrative dispatch.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company & Licensing Info */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A7F3D0] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0EFED]">
            <Building2 size={20} className="text-[#10B981]" />
            <h2 className="text-base font-bold text-[#06110D]">Company & Licensing Credentials</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Company Legal Entity</label>
              <input
                type="text"
                value={companyInfo.companyName}
                onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm focus:ring-2 focus:ring-[#10B981]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">General Contractor License #</label>
              <input
                type="text"
                value={companyInfo.contractorLicense}
                onChange={(e) => setCompanyInfo({ ...companyInfo, contractorLicense: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">AIA Firm Registration</label>
              <input
                type="text"
                value={companyInfo.aiaChapter}
                onChange={(e) => setCompanyInfo({ ...companyInfo, aiaChapter: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Central Dispatch Phone</label>
              <input
                type="text"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Operations Email</label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Headquarters Address</label>
              <input
                type="text"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#444] uppercase tracking-wider mb-1">Commercial Liability & Builders Risk Carrier</label>
              <input
                type="text"
                value={companyInfo.insuranceCarrier}
                onChange={(e) => setCompanyInfo({ ...companyInfo, insuranceCarrier: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#A7F3D0] text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Workflow & Safety Policies */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A7F3D0] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0EFED]">
            <Shield size={20} className="text-[#10B981]" />
            <h2 className="text-base font-bold text-[#06110D]">Operational & Approval Policies</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#F0EFED] cursor-pointer hover:bg-[#F0FDF4] transition-colors">
              <div>
                <p className="text-sm font-bold text-[#06110D]">Client Milestone Notifications</p>
                <p className="text-xs text-[#777]">Automatically dispatch SMS and email when a stage milestone is verified.</p>
              </div>
              <input
                type="checkbox"
                checked={companyInfo.enableAutoNotifications}
                onChange={(e) => setCompanyInfo({ ...companyInfo, enableAutoNotifications: e.target.checked })}
                className="w-5 h-5 accent-[#10B981]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#F0EFED] cursor-pointer hover:bg-[#F0FDF4] transition-colors">
              <div>
                <p className="text-sm font-bold text-[#06110D]">Mandatory City Permit Signoff</p>
                <p className="text-xs text-[#777]">Require dual engineer sign-off before advancing project past Foundation phase.</p>
              </div>
              <input
                type="checkbox"
                checked={companyInfo.requirePermitReview}
                onChange={(e) => setCompanyInfo({ ...companyInfo, requirePermitReview: e.target.checked })}
                className="w-5 h-5 accent-[#10B981]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#F0EFED] cursor-pointer hover:bg-[#F0FDF4] transition-colors">
              <div>
                <p className="text-sm font-bold text-[#06110D]">Client Blueprint Uploads</p>
                <p className="text-xs text-[#777]">Allow clients to upload custom inspiration sketches and CAD revisions directly.</p>
              </div>
              <input
                type="checkbox"
                checked={companyInfo.allowClientDirectUpload}
                onChange={(e) => setCompanyInfo({ ...companyInfo, allowClientDirectUpload: e.target.checked })}
                className="w-5 h-5 accent-[#10B981]"
              />
            </label>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
              <CheckCircle2 size={16} />
              Settings successfully saved
            </span>
          ) : <div />}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#10B981] hover:bg-[#333] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Save size={15} />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
