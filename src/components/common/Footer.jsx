import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl px-4 py-2.5 inline-flex">
            <img src={logo} alt="OOK Travel" className="h-9 w-auto object-contain" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            A marketing &amp; lead-generation partner platform for the Trip Secure Program,
            brought to you by Maa Pranaam Fortune LLP.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
            <li><Link to="/login" className="hover:text-orange-400 transition-colors">Staff Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-orange-400 transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link to="/support" className="hover:text-orange-400 transition-colors">Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-orange-400 flex-shrink-0" />
              <a href="mailto:support@ooktravel.in" className="hover:text-orange-400 transition-colors">support@ooktravel.in</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-orange-400 flex-shrink-0" />
              <a href="tel:+917798612243" className="hover:text-orange-400 transition-colors">+91 77986 12243</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-orange-400 flex-shrink-0 mt-0.5" />
              <span>B-3, KPCT Mall, Adjacent to Vishal Mega Mart, Fatima Nagar, Wanawadi, Pune-411013</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {year} OOK Travel &middot; Maa Pranaam Fortune LLP. All rights reserved.</p>
          <p>Insurance services powered by Policy Planner Insurance Brokers Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
