import {
  Zap, FileSpreadsheet, Wallet, Headphones, ShieldCheck, LayoutDashboard,
  CheckCircle2, Smartphone, Plane, FileCheck2, BadgeIndianRupee, HeartPulse, Users,
} from 'lucide-react';
import PublicNavbar from '@/components/common/PublicNavbar';
import Footer from '@/components/common/Footer';
import StoreBadges from '@/components/common/StoreBadges';

const stats = [
  { label: 'Commission per policy', value: '15%' },
  { label: 'Partner support', value: '24/7' },
  { label: 'Platform uptime', value: '95%+' },
  { label: 'Data protection', value: 'DPDPA' },
];

const features = [
  {
    icon: Zap,
    title: 'Instant Travel Quotes',
    text: 'Generate accurate Trip Secure Program premiums in seconds for any destination, traveller count, or trip length.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Bulk Policy Uploads',
    text: 'Issue insurance for entire groups at once by uploading a simple CSV or Excel sheet of traveller details.',
  },
  {
    icon: Wallet,
    title: 'Transparent Commissions',
    text: 'Track every policy you sell and see your 15% commission credited to your account on the 15th of every month.',
  },
  {
    icon: LayoutDashboard,
    title: 'Business Dashboard',
    text: 'Monitor your policies, leads, and earnings from one clean dashboard built for agents and relationship managers.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Compliant',
    text: 'Built to DPDPA and IRDAI-aligned standards, with encrypted data handling at every step of the customer journey.',
  },
  {
    icon: Headphones,
    title: 'Dedicated RM Support',
    text: 'A dedicated Relationship Manager is always on hand to help with quotes, KYC, and claims assistance.',
  },
];

const travellerBenefits = [
  { icon: HeartPulse, text: 'Medical emergency, trip cancellation, delay & baggage loss cover' },
  { icon: Zap, text: 'Instant policy issuance with digital documents delivered right away' },
  { icon: Headphones, text: '24/7 assistance and claims support anywhere in the world' },
  { icon: Users, text: 'Flexible plans for solo travellers, families, and groups' },
];

const agentBenefits = [
  { icon: Wallet, text: '15% commission on every policy, credited monthly to your account' },
  { icon: FileSpreadsheet, text: 'Bulk policy issuance for groups with a single CSV upload' },
  { icon: Headphones, text: 'Dedicated Relationship Manager for quotes, KYC & claims support' },
  { icon: LayoutDashboard, text: 'Real-time dashboard to track leads, policies & earnings' },
];

const steps = [
  {
    icon: Smartphone,
    title: 'Download the App',
    text: 'Get the OOK Travel app on Google Play and sign in with your partner account.',
  },
  {
    icon: Plane,
    title: 'Get a Travel Quote',
    text: "Enter your traveller's destination and dates to instantly generate a Trip Secure Program premium.",
  },
  {
    icon: FileCheck2,
    title: 'Issue the Policy',
    text: 'Complete traveller KYC and submit the application — individually or in bulk for groups.',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Earn Your Commission',
    text: 'Every issued policy earns you commission, paid out monthly directly to your bank account.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 -left-24 w-80 h-80 bg-red-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Sell The Trip Secure Program.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
              Earn Every Time.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
            OOK Travel is the partner platform for travel agents and relationship managers to
            quote, issue, and manage the Trip Secure Program — and earn commission
            on every policy sold.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <StoreBadges />
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/60 p-6 sm:p-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  {s.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Everything you need to grow</h2>
          <p className="mt-4 text-slate-500 leading-relaxed">
            A single platform to quote, sell, and track the Trip Secure Program for your customers —
            built for speed and reliability.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="p-7 rounded-3xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-sm shadow-orange-500/30">
                <Icon size={22} className="text-white" strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits for travellers & agents */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Built for travellers and agents alike</h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Whether you're travelling or growing a business, the Trip Secure Program works for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-5">
                <Plane size={22} className="text-white" strokeWidth={2.2} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">For Travellers</h3>
              <p className="mt-2 text-sm text-slate-500">Complete protection for every trip, issued in minutes.</p>
              <ul className="mt-6 space-y-4">
                {travellerBenefits.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon size={18} className="text-orange-600 flex-shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-sm leading-relaxed text-slate-600">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-5">
                <Wallet size={22} className="text-white" strokeWidth={2.2} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">For Agents &amp; Partners</h3>
              <p className="mt-2 text-sm text-slate-500">Everything you need to sell more and earn more.</p>
              <ul className="mt-6 space-y-4">
                {agentBenefits.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon size={18} className="text-orange-600 flex-shrink-0 mt-0.5" strokeWidth={2.2} />
                    <span className="text-sm leading-relaxed text-slate-600">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How it works</h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              From quote to commission in four simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="relative">
                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <Icon size={24} className="text-orange-400" strokeWidth={2.2} />
                </div>
                <span className="absolute top-0 right-0 text-5xl font-extrabold text-white/5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / compliance */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="rounded-3xl bg-orange-50 border border-orange-100 p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
          <div className="h-20 w-20 flex-shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ShieldCheck size={36} className="text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Built on trust and compliance</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              All insurance-related activities are handled by Policy Planner Insurance Brokers Pvt. Ltd.,
              a licensed IRDAI intermediary. OOK Travel operates under Maa Pranaam Fortune LLP as a
              marketing and lead-generation platform, in line with the Digital Personal Data Protection
              Act 2023 and applicable IRDAI regulations.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {['Licensed insurance partner', 'Encrypted data handling', 'DPDPA aligned'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-orange-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-14 sm:px-16 sm:py-16 text-center">
          <div className="absolute -top-16 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white">
            Ready to start earning with OOK Travel?
          </h2>
          <p className="relative mt-4 max-w-xl mx-auto text-orange-50">
            Download the app and generate your first Trip Secure Program quote today.
          </p>
          <div className="relative mt-8 flex items-center justify-center">
            <StoreBadges />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
