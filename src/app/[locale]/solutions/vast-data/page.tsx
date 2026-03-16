"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ─── 콘텐츠 ─────────────────────────────── */
const content = {
  ko: {
    badge1: "VAST Data 공식 파트너",
    badge2: "AI OS 2025",
    heroTitle1: "VAST DATA",
    heroTitle2: "AI 운영 체제",
    heroSub: "스토리지·데이터베이스·컴퓨팅을 하나로 통합한 세계 최초의 AI 운영 체제. 에이전트 AI 시대를 위한 엑사바이트 규모 데이터 인프라를 VWorks가 구축합니다.",
    ctaPrimary: "도입 상담 신청 →",
    ctaSecondary: "플랫폼 구성 보기",
    osTitle: "VAST AI OPERATING SYSTEM — 아키텍처",
    osLayers: [
      { name: "DataStore", sub: "NFS · S3 · SMB · Block · NVMe", desc: "올플래시 스토리지", color: "var(--teal)", bg: "rgba(0,201,177,0.08)", border: "rgba(0,201,177,0.25)" },
      { name: "DataBase",  sub: "벡터 · SQL · 스트리밍",          desc: "AI 네이티브 DB",   color: "var(--purple)", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.2)" },
      { name: "DataEngine",sub: "서버리스 · 이벤트 · Python",    desc: "실시간 컴퓨팅",   color: "var(--amber)", bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.2)" },
      { name: "DataSpace", sub: "온프레미스 · 클라우드 · 엣지",   desc: "글로벌 네임스페이스", color: "var(--cyan)", bg: "rgba(56,217,245,0.07)", border: "rgba(56,217,245,0.2)" },
    ],
    stats: [
      { num: "99.9999%", label: "가용성 (Six Nines)" },
      { num: "60%",      label: "TCO 절감" },
      { num: "11x",      label: "벡터 검색 속도" },
      { num: "91%",      label: "벡터 비용 절감" },
    ],
    whatLabel: "VAST DATA란",
    whatTitle: "AI 시대를 위한\n새로운 데이터 패러다임",
    whatBody1: "VAST Data는 기존의 스토리지·데이터베이스·컴퓨팅의 경계를 허문 세계 최초의 AI 운영 체제입니다. 2019년 창업 이후 Fortune 100 기업의 25% 이상이 도입하였으며, 2025년 기준 누적 수주 20억 달러를 돌파, 전년 대비 5배 성장을 기록했습니다.",
    whatBody2: "VAST의 혁신적인 DASE(Disaggregated and Shared Everything) 아키텍처는 컴퓨팅과 스토리지를 분리하면서도 NVMe-oF로 직결해 기존 시스템의 성능·확장성·비용 간 트레이드오프를 완전히 해소합니다.",
    archSteps: [
      { title: "기존 레거시 아키텍처의 문제", desc: "스토리지·DB·컴퓨팅 사일로화 → 느린 ETL → GPU 유휴 → 높은 TCO. AI 워크로드에 근본적으로 부적합.", color: "var(--teal)" },
      { title: "VAST DASE 아키텍처",          desc: "컴퓨팅(CNode)과 스토리지(DNode)를 분리 후 NVMe-oF로 직결. 독립 스케일아웃. 성능·용량을 각각 자유롭게 증설.", color: "var(--cyan)" },
      { title: "단일 전역 네임스페이스",       desc: "온프레미스·퍼블릭 클라우드·엣지를 하나의 네임스페이스로 통합. NFS·S3·SMB·SQL 멀티프로토콜 동시 지원.", color: "var(--amber)" },
      { title: "AI 에이전트 시대 준비 완료",   desc: "서버리스 실행·실시간 벡터 검색·에이전트 런타임까지 내장. GPU를 최대한 활용하는 데이터 인프라.", color: "var(--purple)" },
    ],
    platformLabel: "플랫폼 구성",
    platformTitle: "4개 핵심 엔진으로 구성된\n통합 AI 데이터 플랫폼",
    platformSub: "스토리지부터 에이전트 AI까지 — 단일 플랫폼이 전 과정을 담당합니다",
    components: [
      {
        icon: "💾", eng: "STORAGE LAYER", name: "DataStore", color: "var(--teal)",
        bg: "rgba(0,201,177,0.07)", border: "rgba(0,201,177,0.2)",
        desc: "파일·오브젝트·블록·볼륨을 단일 플랫폼에서 동시에 처리하는 차세대 올플래시 스토리지. 세계 최대 규모의 AI 데이터셋을 Six Nines 가용성으로 보호합니다. 기존 NAS 대비 60% 낮은 TCO로 엑사바이트 규모까지 선형 확장.",
        specs: [
          "NFS v3/4.1 · SMB 2.1/3.1 · S3 · Block · NVMe-oF · Kubernetes CSI 동시 지원",
          "Six Nines(99.9999%) 가용성 — 인라인 중복제거·압축으로 스토리지 효율 극대화",
          "VMware·Hyper-V·Kubernetes 완벽 통합 — 레거시·컨테이너 워크로드 공존",
          "GPUDirect/RDMA 지원으로 AI 학습 데이터 병목 해소",
        ],
        metric: "TCO 60% 절감 · 99.9999% 가용성",
      },
      {
        icon: "🧠", eng: "AI-NATIVE DATABASE", name: "DataBase", color: "var(--purple)",
        bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.2)",
        desc: "구조화 데이터·벡터·스트림·카탈로그·로그·비정형 데이터 메타데이터를 하나의 AI 네이티브 데이터베이스로 통합. 기존 벡터 DB 대비 11배 빠른 검색과 91% 낮은 비용을 실현합니다.",
        specs: [
          "실시간 벡터 인덱싱 — 트릴리언 벡터 규모까지 하이퍼스케일 지원",
          "SQL·벡터·스트리밍을 단일 쿼리로 통합 분석 (Trino / Spark on CNodes)",
          "RAG·검색·실시간 추론에 필요한 컨텍스트 메타데이터 자동 생성",
          "RBAC 기반 멀티테넌시·암호화·QoS 엔터프라이즈 거버넌스 내장",
        ],
        metric: "벡터 검색 11배 빠름 · 비용 91% 절감",
      },
      {
        icon: "⚡", eng: "SERVERLESS COMPUTE", name: "DataEngine", color: "var(--amber)",
        bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.2)",
        desc: "데이터가 있는 곳에서 직접 컴퓨팅을 실행하는 서버리스 실행·오케스트레이션 엔진. 이벤트 트리거·Python 함수·Kafka 호환 브로커로 배치·스트리밍·벡터·SQL 워크플로를 완전 자동화합니다.",
        specs: [
          "InsightEngine — RAG 파이프라인 자동화 (청킹·임베딩·벡터 저장·검색 일괄 처리)",
          "AgentEngine — 엔터프라이즈 AI 에이전트 런타임 (체크포인팅·완전 감사 추적)",
          "SyncEngine — 파일·오브젝트·스트림 실시간 동기화 및 인제스트 가속화",
          "Trino·Spark 온 CNodes — 데이터 이동 없이 고성능 SQL 분석",
        ],
        metric: "데이터 이동 제로 · 실시간 ETL 자동화",
      },
      {
        icon: "🌐", eng: "GLOBAL NAMESPACE", name: "DataSpace", color: "var(--cyan)",
        bg: "rgba(56,217,245,0.07)", border: "rgba(56,217,245,0.2)",
        desc: "온프레미스·퍼블릭 클라우드·엣지 거점 전체를 하나의 일관된 글로벌 네임스페이스로 연결. 어디서나 올플래시 성능과 강한 일관성을 동시에 보장합니다.",
        specs: [
          "분산 잠금·리스 관리로 WAN 병목 없이 전 사이트 강한 일관성 보장",
          "예측 프리페치·인텔리전트 캐싱으로 엣지-코어-클라우드 원활한 데이터 접근",
          "NFS·SMB·S3·SQL 표준 프로토콜로 벤더 종속 없는 하이브리드 운영",
          "DataEngine 연동으로 컴퓨팅 위치·데이터 위치 자동 최적 배치",
        ],
        metric: "엑사바이트 글로벌 패브릭 · 즉시 일관성",
      },
    ],
    usecaseLabel: "도입 사례",
    usecaseTitle: "산업별 적용 시나리오",
    usecaseSub: "VWorks가 실제 구축한 레퍼런스와 함께 살펴보는 VAST Data 활용 사례",
    tabs: ["HPC · 국방", "AI · 딥러닝", "연구기관", "엔터프라이즈"],
    usecases: [
      {
        title: "국방·HPC\n클러스터 스토리지",
        desc: "대한민국 해군 해양수치모델 HPC 클러스터에 VAST Data를 적용, 기상·해양 시뮬레이션 데이터의 병렬 I/O 병목을 해소했습니다. InfiniBand 패브릭과 완벽히 연동되어 수천 코어에서 동시 접근 시에도 선형 성능을 유지합니다.",
        points: [
          "NFS over RDMA(RoCE)로 HPC 노드 직접 연결 — 레이턴시 최소화",
          "기상·해양·센서 데이터 통합 저장 — 멀티프로토콜 단일 볼륨",
          "Slurm 스케줄러와 완벽 연동 — 작업별 QoS 독립 보장",
          "망분리 환경에서도 DataSpace 내부 글로벌 네임스페이스 구성 가능",
        ],
        metrics: [
          { num: "10x",  label: "I/O 성능 향상",   color: "var(--teal)" },
          { num: "PB",   label: "수치모델 데이터 규모", color: "var(--amber)" },
          { num: "99.99%", label: "가용성 달성",    color: "var(--cyan)" },
          { num: "단일", label: "플랫폼으로 통합",  color: "var(--purple)" },
        ],
      },
      {
        title: "AI·딥러닝\n학습 인프라",
        desc: "GPU 클러스터의 학습 병목은 대부분 스토리지 I/O에서 발생합니다. VAST DataStore는 GPUDirect Storage(GDS)를 지원해 CPU 우회 직접 GPU 메모리 로딩을 가능하게 합니다. DataEngine의 InsightEngine으로 RAG 파이프라인을 완전 자동화합니다.",
        points: [
          "GPUDirect/RDMA — CPU 바이패스로 스토리지→GPU 직접 데이터 전달",
          "NVIDIA DGX SuperPOD·DGX BasePOD 공식 스토리지 인증",
          "InsightEngine — 비정형 데이터 자동 임베딩·벡터 저장·RAG 검색",
          "학습 중단 없이 용량·성능 독립 확장 (DASE 아키텍처)",
        ],
        metrics: [
          { num: "11x",  label: "벡터 검색 속도",  color: "var(--teal)" },
          { num: "91%",  label: "벡터 비용 절감",  color: "var(--amber)" },
          { num: "0",    label: "GPU 유휴 시간",   color: "var(--cyan)" },
          { num: "∞",    label: "선형 확장성",     color: "var(--purple)" },
        ],
      },
      {
        title: "연구기관\n데이터 관리",
        desc: "국가 연구기관·대학·병원의 대규모 비정형 데이터(시뮬레이션 결과·의료영상·센서 로그)를 통합 관리. DataSpace의 글로벌 네임스페이스로 여러 연구 거점 간 데이터를 실시간으로 공유합니다.",
        points: [
          "기상·해양·기후 수치모델 출력물 — 페타바이트 규모 아카이브",
          "의료영상(DICOM)·유전체 데이터 — POSIX+S3 동시 접근",
          "복수 클러스터 간 동일 데이터 동시 분석 — DataSpace 강한 일관성",
          "아카이브 경제성 + 올플래시 성능 — 계층화 없이 단일 티어로 운영",
        ],
        metrics: [
          { num: "EB",    label: "확장 가능 규모",  color: "var(--teal)" },
          { num: "1티어", label: "계층화 불필요",   color: "var(--amber)" },
          { num: "동시",  label: "멀티사이트 접근", color: "var(--cyan)" },
          { num: "60%",   label: "TCO 절감",        color: "var(--purple)" },
        ],
      },
      {
        title: "엔터프라이즈\nAI 팩토리",
        desc: "제조·방산·에너지 기업의 AI 기반 예측정비·품질검사·공정최적화에 VAST AI OS를 적용. 공장 센서 데이터를 실시간으로 수집·처리·추론하는 완전 자동화된 AI 파이프라인을 구성합니다.",
        points: [
          "STX엔진 AI 서버 인프라 — VAST DataStore + GPU 클러스터 통합 구축",
          "DataEngine 이벤트 트리거 — 센서 이상 감지 즉시 AI 추론 실행",
          "AgentEngine으로 복잡한 다단계 AI 에이전트 워크플로 자동화",
          "온프레미스+클라우드 하이브리드 — DataSpace 단일 네임스페이스",
        ],
        metrics: [
          { num: "실시간", label: "AI 추론 파이프라인", color: "var(--teal)" },
          { num: "자동화", label: "ETL 파이프라인",     color: "var(--amber)" },
          { num: "단일",   label: "통합 플랫폼",        color: "var(--cyan)" },
          { num: "5x",     label: "YoY 시장 성장",      color: "var(--purple)" },
        ],
      },
    ],
    whyLabel: "왜 VWorks인가",
    whyTitle: "VAST Data 도입,\nVWorks와 함께해야 하는 이유",
    whyCards: [
      { num: "01", title: "공식 파트너십",     desc: "VWorks Technologies는 VAST Data 한국 공식 파트너입니다. 정식 라이선스 공급, 공식 기술 지원 채널, 벤더 직접 에스컬레이션 경로를 보유합니다." },
      { num: "02", title: "국방·공공 특화",   desc: "대한민국 해군 HPC 클러스터 3건 구축 경험. 방위사업청 등록 업체로서 보안 망분리 환경에서의 VAST Data 구축 노하우를 보유한 국내 전문 파트너." },
      { num: "03", title: "엔드투엔드 구축",  desc: "컨설팅·설계·구축·운영·유지보수까지 전 과정을 책임집니다. 부울경 기반 24×7 현장 대응과 기업부설연구소(대구) 기반 기술 심화 지원." },
      { num: "04", title: "HPC 생태계 통합",  desc: "VAST DataStore + InfiniBand 패브릭 + GPU 클러스터 + Slurm 워크로드 매니저를 하나의 통합 솔루션으로 설계·구축합니다." },
      { num: "05", title: "검증된 레퍼런스",  desc: "대한민국 해군·한국수력원자력·STX엔진 등 국방·공공·민간 분야 5건 이상의 실제 구축 레퍼런스. 유사 사례 기반의 정확한 설계와 빠른 구현." },
    ],
    awardsLabel: "수상 및 인증",
    awards: [
      { org: "FORBES",          title: "Cloud 100 #24위",          year: "2025" },
      { org: "FORBES",          title: "AI 50 선정",               year: "2025" },
      { org: "CNBC",            title: "Disruptor 50",             year: "2025" },
      { org: "DATA BREAKTHROUGH",title: "데이터 관리 기업 올해의 상", year: "2025" },
      { org: "HPCWIRE",         title: "Readers' Choice 다수 수상", year: "2025" },
      { org: "GARTNER",         title: "Magic Quadrant Challenger", year: "2023" },
    ],
    ctaLabel: "VAST DATA 도입 문의",
    ctaTitle: "지금 바로\n상담을 시작하세요",
    ctaDesc: "환경 분석부터 규모 산정, PoC(개념검증), 구축, 운영까지 VWorks가 전 과정을 책임집니다. 국방·공공·연구기관 전문 엔지니어가 직접 답변드립니다.",
    ctaBtn: "VAST Data 도입 문의하기 →",
    ctaNote: "문의 접수 후 1~2 영업일 내 전문 엔지니어가 연락드립니다",
  },
  en: {
    badge1: "VAST Data Official Partner",
    badge2: "AI OS 2025",
    heroTitle1: "VAST DATA",
    heroTitle2: "AI Operating System",
    heroSub: "The world's first AI Operating System, unifying storage, database, and compute into one platform. VWorks builds exabyte-scale data infrastructure for the agentic AI era.",
    ctaPrimary: "Request Consultation →",
    ctaSecondary: "View Platform",
    osTitle: "VAST AI OPERATING SYSTEM — Architecture",
    osLayers: [
      { name: "DataStore", sub: "NFS · S3 · SMB · Block · NVMe", desc: "All-Flash Storage", color: "var(--teal)", bg: "rgba(0,201,177,0.08)", border: "rgba(0,201,177,0.25)" },
      { name: "DataBase",  sub: "Vector · SQL · Streaming",       desc: "AI-Native DB",     color: "var(--purple)", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.2)" },
      { name: "DataEngine",sub: "Serverless · Event · Python",    desc: "Real-time Compute", color: "var(--amber)", bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.2)" },
      { name: "DataSpace", sub: "On-Prem · Cloud · Edge",         desc: "Global Namespace",  color: "var(--cyan)", bg: "rgba(56,217,245,0.07)", border: "rgba(56,217,245,0.2)" },
    ],
    stats: [
      { num: "99.9999%", label: "Availability (Six Nines)" },
      { num: "60%",      label: "TCO Reduction" },
      { num: "11x",      label: "Faster Vector Search" },
      { num: "91%",      label: "Vector Cost Savings" },
    ],
    whatLabel: "WHAT IS VAST DATA",
    whatTitle: "A New Data Paradigm\nfor the AI Era",
    whatBody1: "VAST Data is the world's first AI Operating System, breaking the boundaries of traditional storage, databases, and compute. Since its 2019 launch, over 25% of the Fortune 100 have adopted it, surpassing $2B in cumulative bookings in 2025 with 5x year-over-year growth.",
    whatBody2: "VAST's innovative DASE (Disaggregated and Shared Everything) architecture separates compute and storage while connecting them via NVMe-oF, completely eliminating the traditional tradeoffs between performance, scalability, and cost.",
    archSteps: [
      { title: "The Problem with Legacy Architectures", desc: "Siloed storage, DB, and compute → Slow ETL → GPU idle time → High TCO. Fundamentally unsuited for AI workloads.", color: "var(--teal)" },
      { title: "VAST DASE Architecture",                desc: "Separates Compute (CNode) and Storage (DNode), connected via NVMe-oF. Independent scale-out. Freely expand performance and capacity.", color: "var(--cyan)" },
      { title: "Single Global Namespace",               desc: "Unifies on-premises, public cloud, and edge into one namespace. Simultaneous multi-protocol support: NFS, S3, SMB, SQL.", color: "var(--amber)" },
      { title: "Ready for the AI Agent Era",            desc: "Serverless execution, real-time vector search, and agent runtime built-in. Data infrastructure that maximizes GPU utilization.", color: "var(--purple)" },
    ],
    platformLabel: "PLATFORM",
    platformTitle: "Unified AI Data Platform\nwith 4 Core Engines",
    platformSub: "From storage to agentic AI — a single platform handles the entire lifecycle",
    components: [
      {
        icon: "💾", eng: "STORAGE LAYER", name: "DataStore", color: "var(--teal)",
        bg: "rgba(0,201,177,0.07)", border: "rgba(0,201,177,0.2)",
        desc: "Next-gen all-flash storage that simultaneously handles files, objects, blocks, and volumes on a single platform. Protects the world's largest AI datasets with Six Nines availability. Linearly scales to exabytes at 60% lower TCO than traditional NAS.",
        specs: [
          "Simultaneous NFS v3/4.1 · SMB 2.1/3.1 · S3 · Block · NVMe-oF · Kubernetes CSI",
          "Six Nines (99.9999%) availability — inline deduplication & compression",
          "VMware · Hyper-V · Kubernetes integration — legacy & container workloads coexist",
          "GPUDirect/RDMA support eliminates AI training data bottlenecks",
        ],
        metric: "60% TCO Reduction · 99.9999% Availability",
      },
      {
        icon: "🧠", eng: "AI-NATIVE DATABASE", name: "DataBase", color: "var(--purple)",
        bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.2)",
        desc: "Unifies structured data, vectors, streams, catalogs, logs, and unstructured metadata into a single AI-native database. Delivers 11x faster vector search at 91% lower cost than traditional vector databases.",
        specs: [
          "Real-time vector indexing — hyperscale support up to trillion-vector scale",
          "Unified SQL · vector · streaming analytics in a single query (Trino / Spark on CNodes)",
          "Automatic context metadata generation for RAG, search, and real-time inference",
          "Built-in RBAC multi-tenancy · encryption · QoS enterprise governance",
        ],
        metric: "11x Faster Vector Search · 91% Cost Reduction",
      },
      {
        icon: "⚡", eng: "SERVERLESS COMPUTE", name: "DataEngine", color: "var(--amber)",
        bg: "rgba(251,191,36,0.07)", border: "rgba(251,191,36,0.2)",
        desc: "Serverless execution and orchestration engine that runs compute directly where the data lives. Fully automates batch, streaming, vector, and SQL workflows with event triggers, Python functions, and Kafka-compatible broker.",
        specs: [
          "InsightEngine — RAG pipeline automation (chunking · embedding · vector store · retrieval)",
          "AgentEngine — Enterprise AI agent runtime with checkpointing and full audit trails",
          "SyncEngine — Real-time sync and accelerated ingest for files, objects, and streams",
          "Trino · Spark on CNodes — high-performance SQL analytics without data movement",
        ],
        metric: "Zero Data Movement · Real-time ETL Automation",
      },
      {
        icon: "🌐", eng: "GLOBAL NAMESPACE", name: "DataSpace", color: "var(--cyan)",
        bg: "rgba(56,217,245,0.07)", border: "rgba(56,217,245,0.2)",
        desc: "Connects all on-premises, public cloud, and edge locations into a single consistent global namespace. Guarantees all-flash performance and strong consistency everywhere. Supports AWS, Azure, GCP, and neo-clouds without vendor lock-in.",
        specs: [
          "Distributed lock/lease management ensures strong consistency across all sites without WAN bottlenecks",
          "Predictive prefetch and intelligent caching for seamless edge-to-cloud-to-core access",
          "Standard protocols (NFS · SMB · S3 · SQL) for vendor-agnostic hybrid operations",
          "DataEngine integration for automatic optimal placement of compute and data",
        ],
        metric: "Exabyte Global Fabric · Instant Consistency",
      },
    ],
    usecaseLabel: "USE CASES",
    usecaseTitle: "Industry Applications",
    usecaseSub: "VAST Data use cases illustrated with real deployments by VWorks",
    tabs: ["HPC · Defense", "AI · Deep Learning", "Research", "Enterprise"],
    usecases: [
      {
        title: "Defense · HPC\nCluster Storage",
        desc: "Deployed VAST Data for the Republic of Korea Navy's oceanographic HPC cluster, eliminating parallel I/O bottlenecks for weather and ocean simulation data. Maintains linear performance with simultaneous access from thousands of cores via InfiniBand fabric.",
        points: [
          "NFS over RDMA (RoCE) direct connection to HPC nodes — minimized latency",
          "Unified storage of weather, ocean, and sensor data — multi-protocol single volume",
          "Seamless Slurm scheduler integration — per-job QoS isolation",
          "DataSpace internal global namespace configurable even in air-gapped environments",
        ],
        metrics: [
          { num: "10x",  label: "I/O Performance",    color: "var(--teal)" },
          { num: "PB",   label: "Model Data Scale",    color: "var(--amber)" },
          { num: "99.99%", label: "Availability",      color: "var(--cyan)" },
          { num: "Single", label: "Unified Platform",  color: "var(--purple)" },
        ],
      },
      {
        title: "AI · Deep Learning\nTraining Infrastructure",
        desc: "Training bottlenecks in GPU clusters are mostly caused by storage I/O. VAST DataStore supports GPUDirect Storage (GDS), enabling direct GPU memory loading that bypasses the CPU. DataEngine's InsightEngine fully automates RAG pipelines.",
        points: [
          "GPUDirect/RDMA — direct storage-to-GPU data delivery, bypassing CPU",
          "Official storage certification for NVIDIA DGX SuperPOD and DGX BasePOD",
          "InsightEngine — automatic embedding, vector storage, and RAG retrieval for unstructured data",
          "Independent capacity and performance expansion without training interruption (DASE architecture)",
        ],
        metrics: [
          { num: "11x",  label: "Vector Search Speed", color: "var(--teal)" },
          { num: "91%",  label: "Vector Cost Savings",  color: "var(--amber)" },
          { num: "0",    label: "GPU Idle Time",        color: "var(--cyan)" },
          { num: "∞",    label: "Linear Scalability",   color: "var(--purple)" },
        ],
      },
      {
        title: "Research\nData Management",
        desc: "Unified management of large-scale unstructured data (simulation outputs, medical images, sensor logs) for national research institutes, universities, and hospitals. DataSpace's global namespace enables real-time data sharing across multiple research sites.",
        points: [
          "Weather/ocean/climate model outputs — petabyte-scale archive",
          "Medical imaging (DICOM) · genomics data — simultaneous POSIX+S3 access",
          "Concurrent analysis of the same data across multiple clusters — DataSpace strong consistency",
          "Archive economics + all-flash performance — single-tier operations without tiering",
        ],
        metrics: [
          { num: "EB",    label: "Scalable Capacity", color: "var(--teal)" },
          { num: "1-Tier", label: "No Tiering",       color: "var(--amber)" },
          { num: "Multi-site", label: "Concurrent Access", color: "var(--cyan)" },
          { num: "60%",   label: "TCO Reduction",     color: "var(--purple)" },
        ],
      },
      {
        title: "Enterprise\nAI Factory",
        desc: "Applying VAST AI OS for AI-driven predictive maintenance, quality inspection, and process optimization in manufacturing, defense, and energy companies. Building fully automated AI pipelines that collect, process, and infer from factory sensor data in real time.",
        points: [
          "STX Engine AI server infrastructure — integrated VAST DataStore + GPU cluster deployment",
          "DataEngine event triggers — immediate AI inference upon sensor anomaly detection",
          "AgentEngine automates complex multi-step AI agent workflows",
          "On-premises + cloud hybrid — DataSpace single namespace",
        ],
        metrics: [
          { num: "Real-time", label: "AI Inference Pipeline", color: "var(--teal)" },
          { num: "Automated", label: "ETL Pipeline",          color: "var(--amber)" },
          { num: "Unified",   label: "Single Platform",       color: "var(--cyan)" },
          { num: "5x",        label: "YoY Market Growth",     color: "var(--purple)" },
        ],
      },
    ],
    whyLabel: "WHY VWORKS",
    whyTitle: "Why Choose VWorks\nfor VAST Data",
    whyCards: [
      { num: "01", title: "Official Partnership",   desc: "VWorks Technologies is an official VAST Data partner in Korea. We hold authorized licensing rights, official technical support channels, and direct vendor escalation paths." },
      { num: "02", title: "Defense Specialization", desc: "3 ROK Navy HPC cluster deployments. As a DAPA-registered vendor, we hold unique expertise in deploying VAST Data in air-gapped, security-critical environments." },
      { num: "03", title: "End-to-End Delivery",    desc: "We own the entire lifecycle: consulting, design, deployment, operations, and maintenance. 24×7 on-site support from Busan and deep technical support from our R&D lab in Daegu." },
      { num: "04", title: "HPC Ecosystem Integration", desc: "We design and deploy VAST DataStore + InfiniBand fabric + GPU cluster + Slurm workload manager as a single integrated solution. No complex multi-vendor interfaces." },
      { num: "05", title: "Proven References",      desc: "5+ real-world deployments across defense, public, and private sectors: ROK Navy, KHNP, STX Engine, and more. Accurate design and rapid delivery based on comparable cases." },
    ],
    awardsLabel: "AWARDS & RECOGNITION",
    awards: [
      { org: "FORBES",           title: "Cloud 100 #24",                year: "2025" },
      { org: "FORBES",           title: "AI 50",                        year: "2025" },
      { org: "CNBC",             title: "Disruptor 50",                 year: "2025" },
      { org: "DATA BREAKTHROUGH", title: "Data Management Company of the Year", year: "2025" },
      { org: "HPCWIRE",          title: "Readers' Choice — Multiple",   year: "2025" },
      { org: "GARTNER",          title: "Magic Quadrant Challenger",    year: "2023" },
    ],
    ctaLabel: "VAST DATA INQUIRY",
    ctaTitle: "Start Your\nConsultation Today",
    ctaDesc: "VWorks owns the full project lifecycle from environment assessment, sizing, PoC, deployment, to operations. Our defense and public-sector engineers will respond directly.",
    ctaBtn: "Inquire about VAST Data →",
    ctaNote: "A specialist engineer will contact you within 1–2 business days",
  },
};

/* ─── 컴포넌트 ────────────────────────────── */
export default function VastDataPage() {
  const c = content['ko'] ?? content.ko;
  const [activeTab, setActiveTab] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* hero 캔버스 — Mesh Gradient Orb 애니메이션 */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    // Orb 정의: [초기 x비율, 초기 y비율, 반경비율, 속도x, 속도y, r, g, b, opacity]
    type Orb = { x: number; y: number; vx: number; vy: number; r: number; cr: number; cg: number; cb: number; op: number };
    const orbs: Orb[] = [
      { x: 0.7,  y: 0.3,  vx:  0.35, vy:  0.20, r: 0.55, cr:   0, cg: 201, cb: 177, op: 0.22 },
      { x: 0.2,  y: 0.6,  vx: -0.28, vy: -0.18, r: 0.50, cr:  56, cg: 217, cb: 245, op: 0.16 },
      { x: 0.5,  y: 0.9,  vx:  0.22, vy: -0.25, r: 0.45, cr:   0, cg: 120, cb: 140, op: 0.18 },
      { x: 0.85, y: 0.7,  vx: -0.30, vy:  0.22, r: 0.40, cr:   0, cg: 201, cb: 177, op: 0.14 },
      { x: 0.1,  y: 0.2,  vx:  0.18, vy:  0.30, r: 0.38, cr:  20, cg:  80, cb: 180, op: 0.12 },
    ];

    const resize = () => {
      canvas.width  = canvas.parentElement?.offsetWidth  ?? window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? 540;
      // x, y를 pixel 좌표로 초기화 (첫 resize 시)
    };
    resize();

    // pixel 좌표로 변환
    const pOrbs = orbs.map(o => ({
      x: o.x * canvas.width, y: o.y * canvas.height,
      vx: o.vx, vy: o.vy,
      r: Math.min(canvas.width, canvas.height) * o.r,
      cr: o.cr, cg: o.cg, cb: o.cb, op: o.op,
    }));

    const handleResize = () => {
      const W = canvas.parentElement?.offsetWidth  ?? window.innerWidth;
      const H = canvas.parentElement?.offsetHeight ?? 540;
      canvas.width  = W;
      canvas.height = H;
      pOrbs.forEach((o, i) => {
        o.r = Math.min(W, H) * orbs[i].r;
      });
    };
    window.addEventListener("resize", handleResize);

    const loop = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // 배경
      ctx.fillStyle = "#050d1a";
      ctx.fillRect(0, 0, W, H);

      // Orb 그리기
      for (const o of pOrbs) {
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0,   `rgba(${o.cr},${o.cg},${o.cb},${o.op})`);
        grad.addColorStop(0.45,`rgba(${o.cr},${o.cg},${o.cb},${o.op * 0.4})`);
        grad.addColorStop(1,   `rgba(${o.cr},${o.cg},${o.cb},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        // 이동
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r * 0.3) o.vx =  Math.abs(o.vx);
        if (o.x > W + o.r * 0.3) o.vx = -Math.abs(o.vx);
        if (o.y < -o.r * 0.3) o.vy =  Math.abs(o.vy);
        if (o.y > H + o.r * 0.3) o.vy = -Math.abs(o.vy);
      }

      // 상하 depth overlay
      const ov = ctx.createLinearGradient(0, 0, 0, H);
      ov.addColorStop(0,   "rgba(5,13,26,0.45)");
      ov.addColorStop(0.35,"rgba(5,13,26,0)");
      ov.addColorStop(1,   "rgba(5,13,26,0.55)");
      ctx.fillStyle = ov;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(raf); };
  }, []);

  /* 스크롤 reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const S = {
    label: { fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: "0.3em", color: "var(--teal)", marginBottom: 12 } as React.CSSProperties,
    h2: { fontFamily: "'Pretendard',sans-serif", fontSize: "clamp(20px, 5vw, 58px)", letterSpacing: "0.02em", lineHeight: 1.05, marginBottom: 14 } as React.CSSProperties,
    sub: { fontSize: 14, color: "var(--muted)", fontWeight: 300, maxWidth: 560 } as React.CSSProperties,
    body: { fontSize: 14, color: "var(--text)", fontWeight: 300, lineHeight: 1.95, marginBottom: 18 } as React.CSSProperties,
    mono: { fontFamily: "'Share Tech Mono',monospace" } as React.CSSProperties,
    display: { fontFamily: "'Pretendard',sans-serif" } as React.CSSProperties,
  };

  return (
    <>
      <style>{`
        .reveal { opacity:0; transform:translateY(22px); transition:opacity .6s ease,transform .6s ease; }
        .reveal.visible { opacity:1; transform:none; }
        .comp-card { transition:border-color .2s,transform .2s; }
        .comp-card:hover { border-color:rgba(0,201,177,0.35) !important; transform:translateY(-2px); }
        .why-card:hover { border-color:rgba(0,201,177,0.25) !important; }
        .tab-btn { transition:all .2s; cursor:pointer; }
        .tab-btn:hover { border-color:rgba(0,201,177,0.3) !important; color:rgba(0,201,177,0.7) !important; }
        @media(max-width:900px){
          .hero-grid { grid-template-columns:1fr !important; }
          .two-col { grid-template-columns:1fr !important; }
          .comp-grid { grid-template-columns:1fr !important; }
          .why-grid { grid-template-columns:1fr 1fr !important; }
          .use-panel-grid { grid-template-columns:1fr !important; }
        }
        @media(max-width:600px){
          .why-grid { grid-template-columns:1fr !important; }
          .awards-row { flex-direction:column !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", paddingTop: 130, paddingBottom: 80, paddingLeft: 32, paddingRight: 32, overflow: "hidden", borderBottom: "1px solid rgba(31,74,117,0.4)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 70% 40%,rgba(0,201,177,0.06) 0%,transparent 65%)" }} />
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 400px", gap: 56, alignItems: "center" }}>
          {/* LEFT */}
          <div>

            {/* badges */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={{ ...S.mono, fontSize: 9, letterSpacing: "0.18em", padding: "5px 14px", color: "var(--teal)", background: "rgba(0,201,177,0.08)", border: "1px solid rgba(0,201,177,0.2)", borderRadius: 2 }}>● {c.badge1}</span>
              <span style={{ ...S.mono, fontSize: 9, letterSpacing: "0.18em", padding: "5px 14px", color: "var(--amber)", background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 2 }}>★ {c.badge2}</span>
            </div>

            {/* logo image + subtitle */}
            <div style={{ marginBottom: 24 }}>
              
              <h1 style={{ ...S.display, fontSize: "clamp(24px, 7vw, 86px)", letterSpacing: "0.02em", lineHeight: 0.92 }}>
                <span style={{ background: "linear-gradient(135deg,var(--teal),var(--cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {c.heroTitle2}
                </span>
                <br />
                <span style={{ fontSize: "clamp(18px, 3.5vw, 46px)", color: "var(--text)", fontWeight: 300, fontFamily: "'Noto Sans KR',sans-serif", letterSpacing: "0em" }}>
                  {c.heroTitle1}
                </span>
              </h1>
            </div>

            <p style={{ ...S.body, fontSize: 15, marginBottom: 32, maxWidth: 520 }}>{c.heroSub}</p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href={`/${'ko'}/contact`} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,var(--teal),var(--cyan))", color: "var(--bg)", fontSize: 14, fontWeight: 500, padding: "13px 28px", borderRadius: 2, textDecoration: "none", fontFamily: "'Noto Sans KR',sans-serif" }}>
                {c.ctaPrimary}
              </Link>
              <a href="#platform" style={{ display: "inline-flex", alignItems: "center", border: "1px solid rgba(0,201,177,0.2)", color: "var(--teal)", fontSize: 14, padding: "13px 28px", borderRadius: 2, textDecoration: "none", fontFamily: "'Noto Sans KR',sans-serif" }}>
                {c.ctaSecondary}
              </a>
            </div>
          </div>

          {/* RIGHT — OS diagram */}
          <div style={{ background: "var(--surface)", border: "1px solid rgba(0,201,177,0.2)", borderRadius: 3, padding: 26, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--teal),var(--cyan))" }} />
            <div style={{ ...S.mono, fontSize: 9, letterSpacing: "0.2em", color: "var(--teal)", marginBottom: 14 }}>{c.osTitle}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {c.osLayers.map((layer, i) => (
                <div key={i}>
                  {i > 0 && <div style={{ textAlign: "center", fontSize: 14, opacity: 0.3, margin: "-1px 0" }}>↕</div>}
                  <div style={{ padding: "11px 15px", background: layer.bg, border: `1px solid ${layer.border}`, borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ ...S.mono, fontSize: 11, letterSpacing: "0.08em", color: layer.color }}>{layer.name}</div>
                      <div style={{ ...S.mono, fontSize: 8, color: "var(--muted)", letterSpacing: "0.1em", marginTop: 2 }}>{layer.sub}</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 300, opacity: 0.8, color: layer.color }}>{layer.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 5, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
              {c.stats.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "9px 4px" }}>
                  <div style={{ ...S.display, fontSize: 22, color: "var(--teal)", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ ...S.mono, fontSize: 7.5, letterSpacing: "0.1em", color: "var(--muted)", marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VAST AI OS 서브페이지 네비게이션 ── */}
      <section className="reveal" style={{ padding: "clamp(32px,4vw,64px) clamp(16px,4vw,32px)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: "0.3em", color: "var(--teal)", marginBottom: 12 }}>
            VAST AI OS 제품 라인업
          </div>
          <h2 style={{ fontFamily: "'Pretendard',sans-serif", fontSize: "clamp(18px, 4vw, 32px)", letterSpacing: "0.02em", lineHeight: 1.1, marginBottom: 32 }}>
            모든 기능을 자세히 살펴보세요
          </h2>
          
          {/* 3대 카테고리 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* 카테고리 1: What is VAST? */}
            <div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid rgba(0,201,177,0.15)" }}>
                WHAT IS VAST?
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
                {[
                  { href: "/ko/solutions/vast-data/ai-os/", name: "AI Operating System", desc: "DASE 아키텍처 · 7대 핵심 엔진", color: "var(--teal)" },
                  { href: "/ko/solutions/vast-data/gemini/", name: "Gemini 구독 모델", desc: "HW/SW 분리 · 무한 생명주기", color: "#f59e0b" },
                  { href: "/ko/solutions/vast-data/platform/", name: "Supported Platform", desc: "EBox · DBox · CBox · 스위치", color: "var(--cyan)" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}
                    style={{ display: "block", padding: "16px 18px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(0,201,177,0.3)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 500, color: item.color, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300 }}>{item.desc}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 카테고리 2: AI Workloads */}
            <div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "var(--cyan)", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid rgba(56,217,245,0.15)" }}>
                AI WORKLOADS
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
                {[
                  { href: "/ko/solutions/vast-data/datastore/", name: "DataStore", desc: "올플래시 스토리지 · 6나인 가용성", color: "var(--teal)" },
                  { href: "/ko/solutions/vast-data/database/", name: "DataBase", desc: "AI 네이티브 DB · 벡터 검색 11x", color: "var(--purple)" },
                  { href: "/ko/solutions/vast-data/dataspace/", name: "DataSpace", desc: "글로벌 네임스페이스 · 엣지→클라우드", color: "var(--cyan)" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}
                    style={{ display: "block", padding: "16px 18px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(56,217,245,0.3)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 500, color: item.color, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300 }}>{item.desc}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 카테고리 3: Infrastructure Services */}
            <div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: "0.15em", color: "#f59e0b", marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid rgba(251,191,36,0.15)" }}>
                INFRASTRUCTURE SERVICES
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                {[
                  { href: "/ko/solutions/vast-data/dataengine/", name: "DataEngine", desc: "서버리스 컴퓨트", color: "#f59e0b" },
                  { href: "/ko/solutions/vast-data/syncengine/", name: "SyncEngine", desc: "데이터 마이그레이션", color: "#8b5cf6" },
                  { href: "/ko/solutions/vast-data/insightengine/", name: "InsightEngine", desc: "RAG · 벡터 임베딩", color: "#ec4899" },
                  { href: "/ko/solutions/vast-data/agentengine/", name: "AgentEngine", desc: "AI 에이전트 (2026)", color: "#14b8a6" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}
                    style={{ display: "block", padding: "16px 18px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "rgba(251,191,36,0.3)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 500, color: item.color, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300 }}>{item.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS VAST ── */}
      <section className="reveal" style={{ padding: "clamp(40px,6vw,96px) clamp(16px,4vw,32px)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={S.label}>{c.whatLabel}</div>
          <h2 style={S.h2}>{c.whatTitle.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 56, marginTop: 44, alignItems: "start" }}>
            <div>
              <p style={S.body}>{c.whatBody1}</p>
              <p style={S.body}>{c.whatBody2}</p>
              <div style={{ padding: "18px 22px", background: "rgba(0,201,177,0.07)", border: "1px solid rgba(0,201,177,0.2)", borderRadius: 2, marginTop: 20 }}>
                <p style={{ fontSize: 13, color: "var(--white)", fontWeight: 400, lineHeight: 1.7 }}>
                  🏆 <strong style={{ color: "var(--teal)" }}>2025 Forbes Cloud 100 #24</strong> · Forbes AI 50 · CNBC Disruptor 50 · HPCwire Readers' Choice<br />
                  누적 수주 <strong style={{ color: "var(--teal)" }}>$2B 돌파</strong> · 데이터 인프라 역사상 가장 빠른 성장
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {c.archSteps.map((step, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {i > 0 && <div style={{ textAlign: "center", fontSize: 20, color: "var(--teal)", opacity: 0.5 }}>↓</div>}
                  <div style={{ padding: "14px 18px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, borderLeft: `3px solid ${step.color}` }}>
                    <div style={{ ...S.mono, fontSize: 10, letterSpacing: "0.1em", color: step.color, marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 300, lineHeight: 1.6 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM COMPONENTS ── */}
      <section id="platform" className="reveal" style={{ padding: "clamp(40px,6vw,96px) clamp(16px,4vw,32px)", background: "linear-gradient(180deg,transparent,rgba(15,42,74,0.12),transparent)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={S.label}>{c.platformLabel}</div>
          <h2 style={S.h2}>{c.platformTitle.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
          <p style={{ ...S.sub, marginBottom: 48 }}>{c.platformSub}</p>

          <div className="comp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
            {c.components.map((comp) => (
              <div key={comp.name} className="comp-card" style={{ padding: "34px 30px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${comp.color},transparent)` }} />
                <div style={{ fontSize: 30, marginBottom: 14 }}>{comp.icon}</div>
                <div style={{ ...S.mono, fontSize: 9, letterSpacing: "0.2em", color: comp.color, marginBottom: 5 }}>{comp.eng}</div>
                <div style={{ ...S.display, fontSize: 32, letterSpacing: "0.03em", lineHeight: 1, marginBottom: 12, color: "var(--white)" }}>{comp.name}</div>
                <p style={{ ...S.body, marginBottom: 16 }}>{comp.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {comp.specs.map((spec, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--muted)", fontWeight: 300, lineHeight: 1.6, alignItems: "flex-start" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: comp.color, flexShrink: 0, marginTop: 6 }} />
                      {spec}
                    </div>
                  ))}
                </div>
                <div style={{ ...S.mono, fontSize: 10, letterSpacing: "0.1em", padding: "5px 12px", background: comp.bg, border: `1px solid ${comp.border}`, borderRadius: 2, marginTop: 16, color: comp.color, display: "inline-flex" }}>
                  {comp.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="reveal" style={{ padding: "clamp(40px,6vw,96px) clamp(16px,4vw,32px)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={S.label}>{c.usecaseLabel}</div>
          <h2 style={S.h2}>{c.usecaseTitle}</h2>
          <p style={{ ...S.sub, marginBottom: 36 }}>{c.usecaseSub}</p>

          {/* tabs */}
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap", marginBottom: 2 }}>
            {c.tabs.map((tab, i) => (
              <button
                key={i}
                className="tab-btn"
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "10px 20px",
                  background: activeTab === i ? "rgba(0,201,177,0.08)" : "var(--surface)",
                  border: `1px solid ${activeTab === i ? "rgba(0,201,177,0.25)" : "var(--border)"}`,
                  color: activeTab === i ? "var(--teal)" : "var(--muted)",
                  ...S.mono, fontSize: 10, letterSpacing: "0.12em",
                  borderRadius: 2,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* panel */}
          {c.usecases.map((uc, i) => (
            <div key={i} className="use-panel-grid" style={{ display: activeTab === i ? "grid" : "none", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, padding: 40, background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div>
                <h3 style={{ ...S.display, fontSize: 34, lineHeight: 1.1, marginBottom: 12 }}>
                  {uc.title.split("\n").map((l, j) => <span key={j}>{l}{j === 0 && <br />}</span>)}
                </h3>
                <p style={{ ...S.body, marginBottom: 22 }}>{uc.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {uc.points.map((pt, j) => (
                    <div key={j} style={{ display: "flex", gap: 12, fontSize: 13, color: "var(--muted)", fontWeight: 300, lineHeight: 1.6 }}>
                      <span style={{ flexShrink: 0 }}>✅</span>{pt}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8, alignContent: "start" }}>
                {uc.metrics.map((m, j) => (
                  <div key={j} style={{ padding: "20px", background: "var(--surface2)", border: "1px solid var(--border)", textAlign: "center" }}>
                    <div style={{ ...S.display, fontSize: 34, lineHeight: 1, marginBottom: 4, color: m.color }}>{m.num}</div>
                    <div style={{ ...S.mono, fontSize: 8.5, letterSpacing: "0.12em", color: "var(--muted)" }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY VWORKS ── */}
      <section className="reveal" style={{ padding: "clamp(40px,6vw,96px) clamp(16px,4vw,32px)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={S.label}>{c.whyLabel}</div>
          <h2 style={S.h2}>{c.whyTitle.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>

          {/* 5 cards — 3+2 layout */}
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, marginTop: 48 }}>
            {c.whyCards.map((card) => (
              <div key={card.num} className="why-card" style={{ padding: "30px 24px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, position: "relative", overflow: "hidden", transition: "border-color .2s" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--teal),transparent)" }} />
                <div style={{ ...S.display, fontSize: 50, color: "rgba(0,201,177,0.1)", lineHeight: 1, marginBottom: 10 }}>{card.num}</div>
                <div style={{ ...S.display, fontSize: 21, letterSpacing: "0.02em", marginBottom: 8 }}>{card.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 300, lineHeight: 1.8 }}>{card.desc}</div>
              </div>
            ))}
          </div>

          {/* Awards */}
          <div style={{ marginTop: 64 }}>
            <div style={S.label}>{c.awardsLabel}</div>
            <div className="awards-row" style={{ display: "flex", gap: 2, flexWrap: "wrap", marginTop: 16 }}>
              {c.awards.map((a, i) => (
                <div key={i} style={{ flex: "1 1 160px", padding: "18px 16px", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ ...S.mono, fontSize: 8.5, letterSpacing: "0.15em", color: "var(--teal)" }}>{a.org}</div>
                  <div style={{ fontSize: 12, color: "var(--text)", fontWeight: 400, lineHeight: 1.5 }}>{a.title}</div>
                  <div style={{ ...S.mono, fontSize: 9, color: "var(--muted)" }}>{a.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="reveal" style={{ padding: "80px 32px 120px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={S.label}>{c.ctaLabel}</div>
          <h2 style={{ ...S.display, fontSize: "clamp(24px, 6vw, 70px)", letterSpacing: "0.02em", lineHeight: 1, marginBottom: 16 }}>
            {c.ctaTitle.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted)", fontWeight: 300, marginBottom: 36, lineHeight: 1.7 }}>{c.ctaDesc}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, maxWidth: 460, margin: "0 auto 32px" }}>
            <div style={{ padding: "15px 18px", background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div style={{ ...S.mono, fontSize: 8.5, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 6 }}>PHONE</div>
              <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 300 }}>051-747-6428</div>
            </div>
            <div style={{ padding: "15px 18px", background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div style={{ ...S.mono, fontSize: 8.5, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 6 }}>EMAIL</div>
              <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 300 }}>aiden@vworks.tech</div>
            </div>
          </div>

          <Link
            href={`/${'ko'}/contact`}
            style={{ display: "inline-flex", alignItems: "center", background: "linear-gradient(135deg,var(--teal),var(--cyan))", color: "var(--bg)", fontSize: 16, fontWeight: 500, padding: "15px 48px", borderRadius: 2, textDecoration: "none", fontFamily: "'Noto Sans KR',sans-serif" }}
          >
            {c.ctaBtn}
          </Link>
          <div style={{ marginTop: 14, ...S.mono, fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)" }}>{c.ctaNote}</div>
        </div>
      </section>
    </>
  );
}
