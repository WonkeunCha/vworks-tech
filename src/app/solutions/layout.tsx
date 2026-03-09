import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--navy-deep)', minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
