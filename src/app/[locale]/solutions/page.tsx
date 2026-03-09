import Link from "next/link";

const S = [
  { slug: "vast-data", cat: "STORAGE", badge: "CORE", color: "bg-teal-500", title: "VAST Data Storage", desc: "Petabyte-scale unstructured data on a single all-flash platform.", tags: ["All-Flash","NFS/S3","AI Ready"] },
  { slug: "hpe-cray", cat: "HPC", badge: "HPC", color: "bg-blue-500", title: "HPE Cray Supercomputer", desc: "Defense and research HPC cluster design, build, and full lifecycle.", tags: ["HPC","Supercomputer","MPI/SLURM"] },
  { slug: "dell-server", cat: "SERVER", badge: "SERVER", color: "bg-orange-500", title: "Dell PowerEdge Server", desc: "Optimized Dell PowerEdge servers for AI, HPC, and cloud workloads.", tags: ["PowerEdge","GPU Server","AI/ML"] },
  { slug: "network-security", cat: "SECURITY", badge: "SECURITY", color: "bg-cyan-500", title: "Security Solution", desc: "Official distributor of i-oneNet (Hunesion) and KCDS-Guard (Sycrab).", tags: ["Network Isolation","CDS","Zero Trust"] },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-widest text-teal-400 mb-3">SOLUTIONS</p>
        <h1 className="text-5xl font-bold mb-4">Solutions</h1>
        <p className="text-[#8ba3c7] text-lg mb-16">Integrated infrastructure services across AI, HPC, storage, and security</p>
        <div className="grid md:grid-cols-2 gap-6">
          {S.map((s) => (
            <Link key={s.slug} href={"/ko/solutions/" + s.slug + "/"}
              className="group border border-[#1a2d4a] bg-[#0a1628] rounded-xl p-8 hover:border-teal-500 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-[#8ba3c7] tracking-widest">{s.cat}</span>
                <span className={"text-xs px-2 py-1 rounded " + s.color + " text-white font-bold"}>{s.badge}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-teal-400 transition-colors">{s.title}</h2>
              <p className="text-[#8ba3c7] text-sm mb-6 leading-relaxed">{s.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {s.tags.map(t => (
                  <span key={t} className="text-xs border border-[#1a2d4a] px-3 py-1 rounded-full text-[#8ba3c7]">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
