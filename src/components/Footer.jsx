import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-primary-container text-on-primary-container pt-16 pb-12 border-t border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-gutter-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">
          <div className="space-y-4">
            <Logo size="sm" onDark nameClassName="text-on-secondary" />
            <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
              Aparaitech Software is an enterprise AI software engineering firm and IT solutions provider. ISO 27001 & 9001 Certified. MSME Registered.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-mono-tag text-mono-tag text-on-primary-container">
                All Systems Operational • Mutual NDA Protected
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps uppercase text-on-secondary tracking-wider font-bold">
              SERVICES
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm">
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                Cloud Computing
              </li>
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                Software Development
              </li>
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                AI & Machine Learning
              </li>
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                DevOps & CI/CD
              </li>
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                Cybersecurity Solutions
              </li>
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                Mobile App Development
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps uppercase text-on-secondary tracking-wider font-bold">
              LIVE PLATFORMS
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm">
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                Apna Store
              </li>
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                Cloud Kitchen OS
              </li>
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                Service Hub Web
              </li>
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                NovaTax Platform
              </li>
              <li className="text-on-primary-container hover:text-on-secondary transition-colors cursor-pointer">
                BlastBee Messaging
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps uppercase text-on-secondary tracking-wider font-bold">
              OFFICIAL HEAD OFFICE
            </h4>
            <div className="space-y-3 font-body-sm text-body-sm text-on-primary-container">
              <div>
                <p className="font-semibold text-on-secondary">
                  Pune Center of Excellence
                </p>
                <p className="text-xs leading-relaxed">
                  Office 122, Gera Imperium, Opposite Wipro Circle, Hinjawadi Phase 2, Pune, Maharashtra 411057
                </p>
              </div>
              <div>
                <p className="font-semibold text-on-secondary">
                  Bengaluru Innovation Hub
                </p>
                <p className="text-xs">
                  Software Corridor, Karnataka
                </p>
              </div>
              <div>
                <p className="font-semibold text-on-secondary">
                  Japan Strategic Partner
                </p>
                <p className="text-xs">
                  Embarc.Inc, Tokyo, Japan
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono-tag text-mono-tag text-on-primary-container">
          <p>
            © 2026 AparaiTech Software. All rights reserved. Directed by Founder Pratik Pawar.
          </p>
          <p>
            Pune (Hinjawadi Phase 2) • Bengaluru • Tokyo Partner
          </p>
        </div>
      </div>
    </footer>
  );
}
