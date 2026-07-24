import PublicNavbar from '@/components/common/PublicNavbar';
import Footer from '@/components/common/Footer';

export default function LegalDocument({ title, sections, notice }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNavbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: December 2024</p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{section.body}</p>
            </div>
          ))}
        </div>

        {notice && (
          <div className="mt-10 rounded-2xl bg-orange-50 border border-orange-100 px-5 py-4">
            <p className="text-center text-sm leading-6 text-orange-700">{notice}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
