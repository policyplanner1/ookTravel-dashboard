const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.maapranaamfortune.ooktravel';

export default function StoreBadges({ className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-6 py-3.5 bg-slate-950 text-white rounded-2xl hover:bg-slate-800 shadow-lg shadow-slate-900/20 hover:shadow-xl transition-all active:scale-[0.98]"
      >
        <img src="/google-play-store.webp" alt="" className="h-6 w-6 flex-shrink-0" />
        <span className="text-left">
          <span className="block text-[11px] leading-none text-slate-300">Get it on</span>
          <span className="block text-base font-bold leading-tight">Google Play</span>
        </span>
      </a>

      <div
        className="inline-flex items-center gap-3 px-6 py-3.5 bg-slate-100 text-slate-400 rounded-2xl cursor-not-allowed select-none"
        aria-disabled="true"
      >
        <img src="/appstore.png" alt="" className="h-6 w-6 flex-shrink-0 opacity-60" />
        <span className="text-left">
          <span className="block text-[11px] leading-none">Coming soon on</span>
          <span className="block text-base font-bold leading-tight">App Store</span>
        </span>
      </div>
    </div>
  );
}
