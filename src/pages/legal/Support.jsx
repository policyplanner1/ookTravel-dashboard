import { useState } from 'react';
import { ChevronDown, ChevronUp, CircleHelp, Headphones, Mail, MessageCircleMore, Phone } from 'lucide-react';
import PublicNavbar from '@/components/common/PublicNavbar';
import Footer from '@/components/common/Footer';
import { FAQS } from './legalContent';

const PHONE = '+91 77986 12243';
const PHONE_DIGITS = '917798612243';
const EMAIL = 'support@ooktravel.in';

const supportOptions = [
  {
    title: 'Call Support',
    description: PHONE,
    icon: Phone,
    href: `tel:+${PHONE_DIGITS}`,
  },
  {
    title: 'Email Us',
    description: EMAIL,
    icon: Mail,
    href: `mailto:${EMAIL}`,
  },
  {
    title: 'WhatsApp Help',
    description: 'Chat with your Relationship Manager',
    icon: MessageCircleMore,
    href: `https://wa.me/${PHONE_DIGITS}`,
  },
];

function FAQItem({ item, isLast }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={isLast ? '' : 'border-b border-gray-100'}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 py-4 text-left"
      >
        <span className="text-sm font-bold text-slate-900">{item.question}</span>
        {open ? (
          <ChevronUp size={18} className="text-slate-900 flex-shrink-0" strokeWidth={2.3} />
        ) : (
          <ChevronDown size={18} className="text-slate-400 flex-shrink-0" strokeWidth={2.3} />
        )}
      </button>
      {open && <p className="pb-4 text-sm leading-6 text-slate-500">{item.answer}</p>}
    </div>
  );
}

export default function Support() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNavbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Help &amp; Support</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Reach out for policy questions, quote help, or travel assistance guidance.
        </p>

        <div className="mt-8 rounded-3xl border border-gray-100 bg-white shadow-sm px-6 py-6 flex items-center gap-4">
          <div className="h-14 w-14 flex-shrink-0 rounded-2xl bg-orange-50 flex items-center justify-center">
            <Headphones size={26} className="text-orange-600" strokeWidth={2.3} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">24/7 Assistance</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Our support team is available anytime during your trip.
            </p>
          </div>
        </div>

        <div className="mt-5 grid sm:grid-cols-3 gap-4">
          {supportOptions.map(({ title, description, icon: Icon, href }) => (
            <a
              key={title}
              href={href}
              className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all px-5 py-5"
            >
              <div className="h-11 w-11 flex-shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Icon size={19} className="text-white" strokeWidth={2.3} />
              </div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">{title}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">{description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-gray-100 bg-white shadow-sm px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <CircleHelp size={20} className="text-orange-600" strokeWidth={2.3} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">FAQs</h2>
              <p className="text-xs text-slate-500">Frequently Asked Questions</p>
            </div>
          </div>

          {FAQS.map((item, index) => (
            <FAQItem key={item.question} item={item} isLast={index === FAQS.length - 1} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
