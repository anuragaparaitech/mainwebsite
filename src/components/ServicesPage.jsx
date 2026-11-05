import { useEffect } from 'react';
import Services from './Services';

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Services | Aparaitech Software';
  }, []);

  return (
    <main className="min-h-screen bg-surface">
      <Services standalone />
    </main>
  );
}
