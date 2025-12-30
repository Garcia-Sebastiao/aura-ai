export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="flex gap-x-4 items-center">
        <img src="/logo.png" className="w-8 h-8" alt="Aura Ai" />
        <div className="bg-primary/5 px-5 py-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}
