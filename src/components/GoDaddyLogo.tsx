export function GoDaddyLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} overflow-hidden rounded-2xl inline-block`}>
      <img
        src="/src/assets/pngegg copy.png"
        alt="GoDaddy Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
