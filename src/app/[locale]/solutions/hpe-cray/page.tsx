import Link from "next/link";

const F = [
  "HPE Cray EX/XD supercomputer supply and build",
  "MPI/SLURM HPC software stack configuration",
  "InfiniBand HDR/NDR high-speed interconnect",
  "GPU cluster NVIDIA H100/A100 integration",
  "Defense/public security compliance",
  "Full lifecycle design to maintenance",
];

export default function HpeCrayPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-4">
          <Link href="/ko/solutions/" className="text-xs text-[#8ba3c7] hover:text-teal-400">back to Solutions</Link>
        </div>
        <div className="flex gap-2 mb-6">
          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded font-bold">HPC</span>
          <span className="text-xs text-[#8ba3c7] tracking-widest self-center">INFRASTRUCTURE HPC</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">HPE Cray Supercomputer</h1>
        <p className="text-xl text-[#8ba3c7] mb-12">Defense and research HPC cluster design, build, and operations</p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[{n:"2+",l:"Defense HPC refs"},{n:"KHNP",l:"Navy HPC build"},{n:"24x7",l:"Operations"}].map((s)=>(
            <div key={s.l} className="border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{s.n}</div>
              <div className="text-sm text-[#8ba3c7]">{s.l}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6">Key Capabilities</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {F.map((f)=>(
            <div key={f} className="flex items-start gap-3 border border-[#1a2d4a] bg-[#0a1628] rounded-lg p-4">
              <span className="text-blue-400 mt-0.5">v</span>
              <span className="text-sm text-[#c8d8f0]">{f}</span>
            </div>
          ))}
        </div>
        <div className="border border-blue-500/30 bg-blue-500/5 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">HPC Consultation</h3>
          <p className="text-[#8ba3c7] mb-6">HPE Cray official partner VWorks proposes the optimal configuration</p>
          <Link href="/ko/contact/" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3 rounded-lg transition-colors">Free Consultation</Link>
        </div>
      </div>
    </main>
  );
}
