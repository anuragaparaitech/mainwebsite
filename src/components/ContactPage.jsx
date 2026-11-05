import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage({ onOpenDrawer }) {
  useEffect(() => {
    document.title = 'Contact | Aparaitech Software';
  }, []);

  return (
    <main className="min-h-[70vh] bg-surface px-6 pt-36 pb-24 md:pt-40">
      <div className="max-w-[1000px] mx-auto">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-on-surface-variant mb-10">
          <Link className="hover:text-secondary transition-colors" to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-on-surface font-medium">Contact</span>
        </nav>
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <p className="font-mono-tag text-mono-tag uppercase tracking-widest text-secondary mb-4">Contact Aparaitech</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Let’s talk about your next project.</h1>
            <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
              Share what you’re planning, the challenge you’re solving, or the team you’re looking to support. Start a conversation with our AI assistant to get oriented.
            </p>
            <button className="mt-8 inline-flex items-center gap-2 rounded bg-secondary px-6 py-3.5 font-semibold text-white hover:bg-secondary-container transition-colors" onClick={onOpenDrawer} type="button">
              Start a conversation <span aria-hidden="true">→</span>
            </button>
          </div>
          <aside className="rounded-xl border border-outline-variant/50 bg-white p-7 md:p-8">
            <p className="font-mono-tag text-mono-tag uppercase tracking-widest text-secondary">A useful first step</p>
            <h2 className="mt-4 text-xl font-bold">Tell us a little about</h2>
            <ul className="mt-5 space-y-3 text-on-surface-variant">
              <li className="flex gap-3"><span className="text-secondary">01</span> Your goals and priorities</li>
              <li className="flex gap-3"><span className="text-secondary">02</span> Your current systems or constraints</li>
              <li className="flex gap-3"><span className="text-secondary">03</span> The kind of support you need</li>
            </ul>
            <Link className="mt-8 inline-flex text-sm font-semibold text-secondary hover:underline" to="/services">
              Explore our services <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
