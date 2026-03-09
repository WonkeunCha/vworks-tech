import Link from "next/link";

const products = [
  "PowerEdge R750/R760: General-purpose 2U rack server",
  "PowerEdge XE9680: AI/ML GPU server (H100 x8)",
  "PowerEdge MX: Modular blade server",
  "PowerEdge R6625/R7625: AMD EPYC server",
  "Defense/public procurement (registered supplier)",
  "One-stop service: install, configure, maintain",
];

export default function DellServerPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-4">
          <Link href="/ko/solutions/" className="text-xs text-[#8ba3c7] hover:text-teal-400">back to Solutions</Link>
        </div>
        <div className="flex gap-2 mb-6">
          <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded font-bold">SERVER</span>
          <span className="text-xs text-[#8ba3c7] tracking-widest self-center">SERVER INFRASTRUCTURE</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">Dell PowerEdge Server</h1>
        <p className="text-xl text-[#8ba3c7] mb-12">Optimized servers for AI, HPC, and cloud workloads</p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[{n:"Dell",l:"Official Partner"},{n:"GPU",l:"AI Server Specialist"},{n:"24x7",l:"Technical Support"}].map((s)=>(
            <div key={s.l} className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{s.n}</div>
              <div className="text-sm text-[#8ba3c7]">{s.l}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6">Product Lineup</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {products.map((f)=>(
            <div key={f} className="flex items-start gap-3 border border-[#1a2d4a] bg-[#0a1628] rounded-lg p-4">
              <span className="text-orange-400 mt-0.5">OK</span>
              <span className="text-sm text-[#c8d8f0]">{f}</span>
            </div>
          ))}
        </div>
        <div className="border border-orange-500/30 bg-orange-500/5 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Request a Consultation</h3>
          <p className="text-[#8ba3c7] mb-6">VWorks handles everything from spec to installation</p>
          <Link href="/ko/contact/" className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3 rounded-lg transition-colors">Free Consultation</Link>
        </div>
      </div>
    </main>
  );
}