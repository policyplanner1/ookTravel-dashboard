import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="OOK Travel" className="h-16 w-auto object-contain" />
        </Link>
      </div>
    </header>
  );
}
