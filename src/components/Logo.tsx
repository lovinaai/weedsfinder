/* WeedsFinder brand mark — seven-point leaf inside emerald gradient disc. LOCKED, see docs/BRAND.md */
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="wf-disc" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5ce992" />
          <stop offset="0.5" stopColor="#22c55e" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#wf-disc)" />
      <circle cx="16" cy="16" r="14.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <path
        d="M16 6.5c.9 2.2 1.4 4.4 1.4 6.4 2-1.6 4.4-2.7 6.9-3.1-1.3 2.2-2.9 4-4.7 5.2 2.3.1 4.6.8 6.4 2-2.4.9-4.8 1.2-6.9.9 1.2 1.4 2.1 3.2 2.5 5.1-2-.8-3.7-2-4.8-3.5-.2 1.9-.2 3.1.2 4.9h-2c.4-1.8.4-3 .2-4.9-1.1 1.5-2.8 2.7-4.8 3.5.4-1.9 1.3-3.7 2.5-5.1-2.1.3-4.5 0-6.9-.9 1.8-1.2 4.1-1.9 6.4-2-1.8-1.2-3.4-3-4.7-5.2 2.5.4 4.9 1.5 6.9 3.1 0-2 .5-4.2 1.4-6.4Z"
        fill="#06130a"
      />
    </svg>
  );
}
