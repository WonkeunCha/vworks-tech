import Link from "next/link";

export default function NetworkSecurityPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-4">
          <Link href="/ko/solutions/" className="text-xs text-[#8ba3c7] hover:text-teal-400">back to Solutions</Link>
        </div>
        <div className="flex gap-2 mb-6">
          <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded font-bold">SECURITY</span>
          <span className="text-xs text-[#8ba3c7] tracking-widest self-center">SECURITY NETWORK</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">Security Solution</h1>
        <p className="text-xl text-[#8ba3c7] mb-4">Network Isolation and CDS Official Distributor</p>
        <p className="text-[#8ba3c7] mb-12">Official distributor of i-oneNet (Hunesion) network isolation and KCDS-Guard (Sycrab) defense CDS.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[{n:"10yr",l:"#1 in procurement"},{n:"50%",l:"Market share"},{n:"13+",l:"Defense agencies"},{n:"2",l:"VWorks refs"}].map((s)=>(
            <div key={s.l} className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-2">{s.n}</div>
              <div className="text-xs text-[#8ba3c7]">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 text-cyan-400">i-oneNet (Hunesion)</h2>
            <p className="text-sm text-[#8ba3c7] mb-4">10-year consecutive number one in Korea network isolation market</p>
            {["Bidirectional real-time network isolation","Zero Trust authentication built-in","CSAP SaaS standard security cert","AWS and Azure cloud support"].map((f)=>(
              <div key={f} className="flex items-start gap-2 mb-2">
                <span className="text-cyan-400 text-xs mt-0.5">v</span>
                <span className="text-xs text-[#c8d8f0]">{f}</span>
              </div>
            ))}
          </div>
          <div className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 text-cyan-400">KCDS-Guard (Sycrab)</h2>
            <p className="text-sm text-[#8ba3c7] mb-4">Defense-grade CDS deployed at 13+ military agencies</p>
            {["Ministry of Defense Navy Army deployments","National security V3.0 compliant","N2SF C/S/O support","VWorks refs: KHNP and Navy HPC"].map((f)=>(
              <div key={f} className="flex items-start gap-2 mb-2">
                <span className="text-cyan-400 text-xs mt-0.5">v</span>
                <span className="text-xs text-[#c8d8f0]">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-cyan-500/30 bg-cyan-500/5 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Request a Consultation</h3>
          <p className="text-[#8ba3c7] mb-6">Official distributor VWorks handles analysis to deployment</p>
          <Link href="/ko/contact/" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-[#050d1a] font-bold px-8 py-3 rounded-lg transition-colors">Free Consultation</Link>
        </div>
      </div>
    </main>
  );
}
