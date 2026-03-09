import Link from "next/link";

const F = [
  "All-Flash architecture, microsecond latency",
  "Single namespace: NFS, S3, SMB unified",
  "Inline dedup/compression, TCO -70%",
  "GPU Direct Storage for AI/ML workloads",
  "CC certification for defense/public sector",
  "Non-disruptive scale-out and auto-tiering",
];

export default function VastDataPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-4">
          <Link href="/ko/solutions/" className="text-xs text-[#8ba3c7] hover:text-teal-400">back to Solutions</Link>
        </div>
        <div className="flex gap-2 mb-6">
          <span className="text-xs bg-teal-500 text-white px-2 py-1 rounded font-bold">CORE</span>
          <span className="text-xs text-[#8ba3c7] tracking-widest self-center">STORAGE CORE PARTNER</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">VAST Data Storage</h1>
        <p className="text-xl text-[#8ba3c7] mb-12">Petabyte-scale unstructured data on a single all-flash platform</p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[{n:"PB+",l:"Data scale built"},{n:"5+",l:"Defense references"},{n:"24x7",l:"Technical support"}].map((s)=>(
            <div key={s.l} className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-teal-400 mb-2">{s.n}</div>
              <div className="text-sm text-[#8ba3c7]">{s.l}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {F.map((f)=>(
            <div key={f} className="flex items-start gap-3 border border-[#1a2d4a] bg-[#0a1628] rounded-lg p-4">
              <span className="text-teal-400 mt-0.5">v</span>
              <span className="text-sm text-[#c8d8f0]">{f}</span>
            </div>
          ))}
        </div>
        <div className="border border-teal-500/30 bg-teal-500/5 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Request a Consultation</h3>
          <p className="text-[#8ba3c7] mb-6">VAST Data official partner VWorks proposes the optimal configuration</p>
          <Link href="/ko/contact/" className="inline-block bg-teal-500 hover:bg-teal-400 text-[#050d1a] font-bold px-8 py-3 rounded-lg transition-colors">Free Consultation</Link>
        </div>
      </div>
    </main>
  );
}
