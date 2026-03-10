'use client';
import AnimatedHeroBg from '@/components/AnimatedHeroBg';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/* ── 16G Intel Rack ─────────────────────────────────────── */
const G16_INTEL = [
  {
    tier: '1U · ENTRY · 1-SOCKET', name: 'R260', sub: 'POWEREDGE R260 · 16G INTEL',
    color: '#007DB8', bg: 'rgba(0,125,184,.07)', border: 'rgba(0,125,184,.25)',
    desc: '1U 엔트리 단일소켓 서버. Intel Xeon E-2400 탑재. 소규모 조직, 지사, 엣지 환경 파일·웹·앱 서비스에 최적.',
    specs: [['CPU', 'Intel Xeon E-2400 (1S, 최대 8코어)'], ['MEMORY', 'DDR5 / 최대 128GB'], ['STORAGE', '최대 8×2.5" SATA/SAS/NVMe'], ['PCIe', 'Gen5 ×1']],
    tags: ['파일서버', '엣지', 'SMB'],
  },
  {
    tier: '1U · MIDRANGE · 1-SOCKET', name: 'R360', sub: 'POWEREDGE R360 · 16G INTEL',
    color: '#007DB8', bg: 'rgba(0,125,184,.07)', border: 'rgba(0,125,184,.25)',
    desc: '1U 미드레인지 단일소켓. Intel Xeon E-2400. R260 대비 스토리지·PCIe 확장성 향상. SMB 핵심 앱서버·VDI 엔드포인트에 적합.',
    specs: [['CPU', 'Intel Xeon E-2400 (1S)'], ['MEMORY', 'DDR5 / 최대 128GB ECC'], ['STORAGE', '최대 8×2.5" NVMe/SAS/SATA'], ['PCIe', 'Gen5 ×2']],
    tags: ['VDI 엔드포인트', '앱서버', 'SMB'],
  },
  {
    tier: '1U · HIGH PERF · 2-SOCKET', name: 'R660', sub: 'POWEREDGE R660 · 16G INTEL ★',
    color: '#007DB8', bg: 'rgba(0,125,184,.07)', border: 'rgba(0,125,184,.25)',
    desc: '1U 2소켓 고성능 주력 모델. Intel Xeon Scalable 4세대, 최대 112코어. vSAN·HCI·소프트웨어 정의 솔루션 표준 플랫폼. DDR5 + PCIe Gen5 E3.S NVMe.',
    specs: [['CPU', 'Intel Xeon 4세대 (2S, 최대 112코어)'], ['MEMORY', 'DDR5 16 DIMM / 최대 4TB'], ['STORAGE', '최대 10×2.5" E3.S NVMe'], ['PCIe', '2×Gen5 + 3×Gen4']],
    tags: ['vSAN / HCI', '가상화', 'DB'],
  },
  {
    tier: '1U · VDI/CLOUD-NATIVE · 2-SOCKET', name: 'R660xs', sub: 'POWEREDGE R660xs · 16G XS',
    color: '#007DB8', bg: 'rgba(0,125,184,.07)', border: 'rgba(0,125,184,.25)',
    desc: 'R660 xs 변형. 중밀도 VDI·클라우드 네이티브 최적화. 최대 32코어로 하이퍼바이저 라이선스·냉각 비용 절감. 1DPC 설계로 HPC 스케일아웃 지원.',
    specs: [['CPU', 'Intel Xeon 4세대 (2S, 최대 32코어)'], ['MEMORY', 'DDR5 16 DIMM'], ['특징', '1DPC 설계, HPC 스케일아웃'], ['BOOT', 'BOSS-N1 M.2 NVMe']],
    tags: ['중밀도 VDI', 'HPC 스케일아웃', '클라우드'],
  },
  {
    tier: '2U · FLAGSHIP GENERAL · 2-SOCKET', name: 'R760', sub: 'POWEREDGE R760 · 16G INTEL ★',
    color: '#007DB8', bg: 'rgba(0,125,184,.07)', border: 'rgba(0,125,184,.25)',
    desc: '2U 범용 플래그십. R660의 2U 버전으로 스토리지·PCIe 확장성 대폭 강화. 최대 32 DIMM, GPU 복폭 최대 4장. DB·분석·AI 추론 핵심.',
    specs: [['CPU', 'Intel Xeon 4세대 (2S, 최대 112코어)'], ['MEMORY', 'DDR5 32 DIMM / 최대 8TB'], ['STORAGE', '최대 24×2.5" E3.S NVMe'], ['PCIe', '4×Gen5 + 8×Gen4']],
    tags: ['DB / 분석', 'AI 추론', '범용 워크로드'],
  },
  {
    tier: '2U · AI / GPU OPTIMIZED', name: 'R760xa', sub: 'POWEREDGE R760xa · GPU OPTIMIZED',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.25)',
    desc: 'R760의 AI/GPU 최적화 변형. 복폭 GPU 확장성 극대화. AI 추론·모델 파인튜닝·GPU 컴퓨팅 워크로드 특화. PCIe Gen5 고대역폭.',
    specs: [['CPU', 'Intel Xeon 4세대 (2S)'], ['GPU', '최대 4장 복폭(DW) PCIe Gen5'], ['MEMORY', 'DDR5 32 DIMM'], ['PCIe', 'Gen5 고대역폭 슬롯']],
    tags: ['AI 추론', 'GPU 컴퓨팅', '파인튜닝'],
  },
  {
    tier: '2U · STORAGE DENSE · 2-SOCKET', name: 'R760xd2', sub: 'POWEREDGE R760xd2 · STORAGE DENSE',
    color: '#007DB8', bg: 'rgba(0,125,184,.07)', border: 'rgba(0,125,184,.25)',
    desc: '2U 초고밀도 스토리지 서버. 대용량 드라이브 베이 최대 32개. 저비용 대용량 스토리지 구성에 최적. 빅데이터·미디어·아카이빙 환경.',
    specs: [['CPU', 'Intel Xeon 4세대 (2S)'], ['STORAGE', '최대 32×3.5" 드라이브 (고밀도)'], ['MEMORY', 'DDR5 32 DIMM'], ['USE', '빅데이터, 아카이빙']],
    tags: ['스토리지 밀도', '빅데이터', '아카이빙'],
  },
];

/* ── 16G AMD Rack ───────────────────────────────────────── */
const G16_AMD = [
  {
    tier: '1U · AMD EPYC 4세대 · 1-SOCKET', name: 'R6615', sub: 'POWEREDGE R6615 · EPYC GENOA 1S',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.25)',
    desc: 'AMD EPYC Genoa 1소켓 1U. 단일 소켓 최대 96코어. HPC 스케일아웃·클라우드 네이티브·고밀도 컴퓨팅 최적. Intel 대비 코어당 단가 경쟁력.',
    specs: [['CPU', 'AMD EPYC 9004 (1S, 최대 96코어)'], ['MEMORY', 'DDR5 12 DIMM'], ['STORAGE', '최대 10×2.5" NVMe'], ['PCIe', 'Gen5 ×6']],
    tags: ['HPC 스케일아웃', '클라우드', '고밀도'],
  },
  {
    tier: '1U · AMD EPYC 4세대 · 2-SOCKET', name: 'R6625', sub: 'POWEREDGE R6625 · EPYC GENOA 2S',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.25)',
    desc: 'AMD EPYC Genoa 2소켓 1U. 최대 192코어. 대규모 가상화·ERP·SAP·인메모리 DB에서 우수한 코어당 비용 효율. PCIe Gen5 기본.',
    specs: [['CPU', 'AMD EPYC 9004 (2S, 최대 192코어)'], ['MEMORY', 'DDR5 24 DIMM / 최대 6TB'], ['STORAGE', '최대 10×2.5" E3.S'], ['PCIe', 'Gen5']],
    tags: ['ERP / SAP', '대용량 가상화', '인메모리 DB'],
  },
  {
    tier: '2U · AMD EPYC 4세대 · 1-SOCKET', name: 'R7615', sub: 'POWEREDGE R7615 · EPYC GENOA 1S 2U',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.25)',
    desc: 'AMD EPYC Genoa 1소켓 2U. 풍부한 스토리지·PCIe 확장. 스토리지 집약적·AI 엣지 추론·빅데이터 수집 환경에 적합.',
    specs: [['CPU', 'AMD EPYC 9004 (1S, 최대 96코어)'], ['MEMORY', 'DDR5 24 DIMM'], ['STORAGE', '최대 24×2.5" 또는 12×3.5"'], ['USE', 'AI 엣지, 빅데이터']],
    tags: ['스토리지 집약', 'AI 엣지', '빅데이터'],
  },
  {
    tier: '2U · AMD EPYC 4세대 · 2-SOCKET · 플래그십', name: 'R7625', sub: 'POWEREDGE R7625 · EPYC GENOA 2S ★',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.25)',
    desc: 'AMD Genoa 2소켓 2U 플래그십. 최대 192코어, 24 DIMM, 복폭 GPU 최대 4장. 대규모 가상화·DB·AI 훈련 AMD 최상위 모델.',
    specs: [['CPU', 'AMD EPYC 9004 (2S, 최대 192코어)'], ['MEMORY', 'DDR5 24 DIMM / 최대 6TB'], ['STORAGE', '최대 24×2.5" E3.S'], ['GPU', 'Gen5 복폭 ×4']],
    tags: ['대규모 DB', 'AI 추론·훈련', 'HPC'],
  },
  {
    tier: '1U · AMD EPYC 5세대(Turin) · 2-SOCKET · NEW', name: 'R6725', sub: 'POWEREDGE R6725 · EPYC TURIN 2S · 2024.11',
    color: '#a78bfa', bg: 'rgba(167,139,250,.07)', border: 'rgba(167,139,250,.25)',
    desc: 'AMD EPYC Turin 2소켓 1U. SAP-SD 201,000 users 세계 기록. 최대 500W CPU 에어쿨링 지원. 2024년 11월 출시. 최고 효율·성능 1U AMD 서버.',
    specs: [['CPU', 'AMD EPYC 9005 Turin (2S, Zen 5c)'], ['MEMORY', 'DDR5-6400 24 DIMM'], ['RECORD', 'SAP-SD 201,000 users 세계 기록'], ['출시', '2024년 11월']],
    tags: ['세계 기록 (SAP)', 'EPYC 5세대', 'ERP'],
  },
  {
    tier: '2U · AMD EPYC 5세대(Turin) · 2-SOCKET · NEW', name: 'R7725', sub: 'POWEREDGE R7725 · EPYC TURIN 2S · 2024.11',
    color: '#a78bfa', bg: 'rgba(167,139,250,.07)', border: 'rgba(167,139,250,.25)',
    desc: 'AMD 16G 최상위. VMMark4 가상화 세계 기록 보유. 최대 384코어(2×192), DDR5-6400. AI·빅데이터·HPC 최고 성능. 2024 Dell AI 팩토리 핵심.',
    specs: [['CPU', 'AMD EPYC 9005 Turin (2S, 최대 384코어)'], ['MEMORY', 'DDR5-6400 24 DIMM'], ['RECORD', 'VMMark4 세계 기록'], ['출시', '2024년 11월']],
    tags: ['가상화 세계 기록', 'EPYC 5세대', 'AI 인프라'],
  },
];

/* ── 16G Tower ──────────────────────────────────────────── */
const G16_TOWER = [
  {
    tier: 'TOWER · ENTRY · 1-SOCKET', name: 'T160', sub: 'POWEREDGE T160 · 16G ENTRY',
    color: '#4ade80', bg: 'rgba(74,222,128,.07)', border: 'rgba(74,222,128,.25)',
    desc: '소규모 사무소·지사 엔트리 타워. Intel Xeon E-2400 또는 Core i3. 낮은 소음, 간편 설치. 별도 서버실 없이 사무공간 배치 가능.',
    specs: [['CPU', 'Intel Xeon E-2400 / Core i3 (1S)'], ['MEMORY', 'DDR5 / 최대 128GB ECC'], ['STORAGE', '최대 4×3.5" 또는 8×2.5"'], ['PCIe', 'Gen5 ×2']],
    tags: ['파일·프린트', '소규모 DB', 'SMB'],
  },
  {
    tier: 'TOWER · MIDRANGE · 1-SOCKET', name: 'T360', sub: 'POWEREDGE T360 · 16G MIDRANGE',
    color: '#4ade80', bg: 'rgba(74,222,128,.07)', border: 'rgba(74,222,128,.25)',
    desc: '중견기업·연구실 미드레인지 타워. Intel Xeon E-2400 단일소켓, 최대 8×3.5" 스토리지·PCIe Gen5. 소규모 DB·ERP·CAD 워크스테이션 대용.',
    specs: [['CPU', 'Intel Xeon E-2400 (1S, 최대 8코어)'], ['MEMORY', 'DDR5 / 최대 256GB ECC'], ['STORAGE', '최대 8×3.5" + 2×2.5"'], ['PCIe', 'Gen5 ×4']],
    tags: ['SMB ERP', '연구실', 'CAD'],
  },
  {
    tier: 'TOWER · ENTERPRISE · 2-SOCKET', name: 'T560', sub: 'POWEREDGE T560 · 16G ENTERPRISE',
    color: '#4ade80', bg: 'rgba(74,222,128,.07)', border: 'rgba(74,222,128,.25)',
    desc: '기업급 2소켓 타워 플래그십. Intel Xeon Scalable 4세대 2소켓. 랙서버급 성능을 타워 폼팩터로. 최대 24 DIMM, GPU 최대 6장.',
    specs: [['CPU', 'Intel Xeon Scalable 4세대 (2S, 최대 112코어)'], ['MEMORY', 'DDR5 24 DIMM / 최대 8TB'], ['STORAGE', '최대 24×2.5" NVMe'], ['GPU', 'PCIe Gen5 복폭 ×6']],
    tags: ['대기업 DB', 'CAD/시뮬레이션', 'AI 추론'],
  },
];

/* ── 16G 4-Socket ───────────────────────────────────────── */
const G16_4S = [
  {
    tier: '2U · 4-SOCKET · IN-MEMORY DB', name: 'R860', sub: 'POWEREDGE R860 · 4×XEON 2U',
    color: '#38D9F5', bg: 'rgba(56,217,245,.07)', border: 'rgba(56,217,245,.25)',
    desc: '2U 4소켓 Intel 고성능 서버. 최대 240코어, 64 DIMM. 인메모리 DB(SAP HANA), 극초고밀도 가상화, CPU 집약 AI/ML 최적.',
    specs: [['CPU', 'Intel Xeon 4세대 (4S, 최대 240코어)'], ['MEMORY', 'DDR5 64 DIMM / 최대 32TB'], ['STORAGE', '최대 32×2.5"'], ['PCIe', 'Gen5 ×8']],
    tags: ['SAP HANA', '고밀도 VM', 'AI/ML CPU'],
  },
  {
    tier: '4U · 4-SOCKET · MAX SCALE', name: 'R960', sub: 'POWEREDGE R960 · 4×XEON 4U',
    color: '#38D9F5', bg: 'rgba(56,217,245,.07)', border: 'rgba(56,217,245,.25)',
    desc: 'R860의 4U 확장. 동일 컴퓨트·메모리에 스토리지·PCIe 확장성 강화. 대형 연구기관·금융·통신 핵심 시스템 최상위 엔터프라이즈 서버.',
    specs: [['CPU', 'Intel Xeon 4세대 (4S, 최대 240코어)'], ['MEMORY', 'DDR5 64 DIMM / 최대 32TB'], ['STORAGE', '4U 확장 베이'], ['USE', '대형 ERP, 미션크리티컬 DB']],
    tags: ['엔터프라이즈 최상위', '미션크리티컬 DB'],
  },
];

/* ── 15G Intel Rack ─────────────────────────────────────── */
const G15_INTEL = [
  {
    tier: '1U · ENTRY · 1-SOCKET', name: 'R250', sub: 'POWEREDGE R250 · 15G INTEL',
    color: '#00C9B1', bg: 'rgba(0,201,177,.07)', border: 'rgba(0,201,177,.2)',
    desc: '1U 엔트리 단일소켓. Intel Xeon E-2300 탑재. 저예산 소규모 서버 수요. 파일·프린트·앱 서버.',
    specs: [['CPU', 'Intel Xeon E-2300 (1S)'], ['MEMORY', 'DDR4 / 최대 128GB ECC'], ['STORAGE', '최대 4×3.5" SATA/SAS'], ['MGMT', 'iDRAC9']],
    tags: ['파일서버', 'SMB 엔트리'],
  },
  {
    tier: '1U · MIDRANGE · 1-SOCKET', name: 'R350', sub: 'POWEREDGE R350 · 15G INTEL',
    color: '#00C9B1', bg: 'rgba(0,201,177,.07)', border: 'rgba(0,201,177,.2)',
    desc: '1U 미드레인지 단일소켓. Intel Xeon E-2300. R250 대비 스토리지·PCIe 확장성 강화. 소규모 ERP·앱서버·VDI 엔드포인트.',
    specs: [['CPU', 'Intel Xeon E-2300 (1S)'], ['MEMORY', 'DDR4 / 최대 128GB ECC'], ['STORAGE', '최대 8×2.5" NVMe/SAS/SATA'], ['MGMT', 'iDRAC9 Express']],
    tags: ['SMB ERP', '앱서버'],
  },
  {
    tier: '1U · HIGH PERF · 2-SOCKET', name: 'R650', sub: 'POWEREDGE R650 · 15G INTEL',
    color: '#00C9B1', bg: 'rgba(0,201,177,.07)', border: 'rgba(0,201,177,.2)',
    desc: '15G 1U 2소켓 주력 모델. Intel Xeon Ice Lake 3세대 최대 80코어. 16G R660 이전 세대. 기존 15G 환경 확장·예산 우선 구축에 적합.',
    specs: [['CPU', 'Intel Xeon Ice Lake 3세대 (2S, 최대 80코어)'], ['MEMORY', 'DDR4 16 DIMM / 최대 4TB'], ['STORAGE', '최대 10×2.5" NVMe'], ['PCIe', 'Gen4 ×3']],
    tags: ['vSAN / HCI', '가상화', 'DB'],
  },
  {
    tier: '2U · FLAGSHIP · 2-SOCKET', name: 'R750', sub: 'POWEREDGE R750 · 15G INTEL',
    color: '#00C9B1', bg: 'rgba(0,201,177,.07)', border: 'rgba(0,201,177,.2)',
    desc: '15G 2U 범용 플래그십. Intel Xeon Ice Lake 3세대. 16G R760 이전 세대. DB·분석·AI 추론·대규모 가상화 기존 인프라 확장에 적합.',
    specs: [['CPU', 'Intel Xeon Ice Lake 3세대 (2S, 최대 80코어)'], ['MEMORY', 'DDR4 32 DIMM / 최대 8TB'], ['STORAGE', '최대 24×2.5" NVMe'], ['GPU', 'PCIe Gen4 복폭 ×4']],
    tags: ['범용 DB', 'AI 추론', '대규모 가상화'],
  },
  {
    tier: '2U · AI GPU OPTIMIZED', name: 'R750xa', sub: 'POWEREDGE R750xa · 15G AI',
    color: '#00C9B1', bg: 'rgba(0,201,177,.07)', border: 'rgba(0,201,177,.2)',
    desc: '15G AI/GPU 최적화 2U. R750 GPU 특화 변형. PCIe Gen4 복폭 GPU 최대 4장. 16G R760xa 이전 세대. AI 추론·ML 트레이닝 예산 효율 구축.',
    specs: [['CPU', 'Intel Xeon Ice Lake 3세대 (2S)'], ['GPU', 'PCIe Gen4 복폭 ×4'], ['MEMORY', 'DDR4 32 DIMM'], ['USE', 'AI 추론, ML 트레이닝']],
    tags: ['AI 추론', 'ML 트레이닝'],
  },
];

/* ── 15G AMD Rack ───────────────────────────────────────── */
const G15_AMD = [
  {
    tier: '1U · AMD EPYC Milan · 1-SOCKET', name: 'R6515', sub: 'POWEREDGE R6515 · EPYC MILAN 1S',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.2)',
    desc: 'AMD EPYC Milan 1소켓 1U. 최대 64코어. 클라우드 스케일아웃·HPC·고밀도 컴퓨팅 우수한 코어당 비용 효율.',
    specs: [['CPU', 'AMD EPYC 7003 Milan (1S, 최대 64코어)'], ['MEMORY', 'DDR4 8 DIMM'], ['STORAGE', '최대 10×2.5"'], ['PCIe', 'Gen4']],
    tags: ['클라우드 스케일아웃', 'HPC'],
  },
  {
    tier: '1U · AMD EPYC Milan · 2-SOCKET', name: 'R6525', sub: 'POWEREDGE R6525 · EPYC MILAN 2S',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.2)',
    desc: 'AMD EPYC Milan 2소켓 1U. 최대 128코어. 대규모 가상화·ERP·SAP. Intel 대비 합리적 코어당 비용. 15G AMD 2소켓 주력 모델.',
    specs: [['CPU', 'AMD EPYC 7003 Milan (2S, 최대 128코어)'], ['MEMORY', 'DDR4 16 DIMM / 최대 4TB'], ['STORAGE', '최대 10×2.5"'], ['PCIe', 'Gen4']],
    tags: ['대용량 가상화', 'ERP/SAP', 'HPC'],
  },
  {
    tier: '2U · AMD EPYC Milan · 2-SOCKET · 플래그십', name: 'R7525', sub: 'POWEREDGE R7525 · EPYC MILAN 2S FLAGSHIP',
    color: '#fbbf24', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.2)',
    desc: '15G AMD 2소켓 2U 플래그십. 최대 128코어, 32 DIMM. 16G R7625 이전 세대. 대규모 가상화·DB·AI 예산 효율 핵심 선택지.',
    specs: [['CPU', 'AMD EPYC 7003 Milan (2S, 최대 128코어)'], ['MEMORY', 'DDR4 32 DIMM / 최대 4TB'], ['STORAGE', '최대 24×2.5" NVMe'], ['GPU', 'PCIe Gen4 복폭']],
    tags: ['DB / AI', 'HPC', '대규모 가상화'],
  },
];

/* ── 비교 테이블 ────────────────────────────────────────── */
const CMP = [
  { model: 'R660', gen: '16G', ff: '1U 2S', cpu: 'Intel Xeon 4세대', sk: 2, mem: 'DDR5 16 DIMM', stor: '10×2.5" E3.S', pcie: 'Gen5', use: 'vSAN, DB, 가상화', isNew: true },
  { model: 'R760', gen: '16G', ff: '2U 2S', cpu: 'Intel Xeon 4세대', sk: 2, mem: 'DDR5 32 DIMM 8TB', stor: '24×2.5" E3.S', pcie: 'Gen5', use: 'DB, AI 추론, 범용', isNew: true },
  { model: 'R860', gen: '16G', ff: '2U 4S', cpu: 'Intel Xeon 4세대', sk: 4, mem: 'DDR5 64 DIMM 32TB', stor: '32×2.5"', pcie: 'Gen5', use: 'SAP HANA, 고밀도 VM', isNew: true },
  { model: 'R6625', gen: '16G', ff: '1U 2S', cpu: 'AMD EPYC Genoa(4세대)', sk: 2, mem: 'DDR5 24 DIMM 6TB', stor: '10×2.5" E3.S', pcie: 'Gen5', use: 'ERP/SAP, 대용량 VM', isNew: true },
  { model: 'R7625', gen: '16G', ff: '2U 2S', cpu: 'AMD EPYC Genoa(4세대)', sk: 2, mem: 'DDR5 24 DIMM 6TB', stor: '24×2.5" E3.S', pcie: 'Gen5', use: 'DB, AI 훈련, HPC', isNew: true },
  { model: 'R6725', gen: '16G', ff: '1U 2S', cpu: 'AMD EPYC Turin(5세대)', sk: 2, mem: 'DDR5-6400 24 DIMM', stor: '10×2.5" E3.S', pcie: 'Gen5', use: 'SAP 세계기록, ERP', isNew: true },
  { model: 'R7725', gen: '16G', ff: '2U 2S', cpu: 'AMD EPYC Turin(5세대)', sk: 2, mem: 'DDR5-6400 24 DIMM', stor: '24×2.5" E3.S', pcie: 'Gen5', use: '가상화 세계기록, AI', isNew: true },
  { model: 'R650', gen: '15G', ff: '1U 2S', cpu: 'Intel Xeon Ice Lake(3세대)', sk: 2, mem: 'DDR4 16 DIMM 4TB', stor: '10×2.5"', pcie: 'Gen4', use: 'vSAN, DB, 가상화', isNew: false },
  { model: 'R750', gen: '15G', ff: '2U 2S', cpu: 'Intel Xeon Ice Lake(3세대)', sk: 2, mem: 'DDR4 32 DIMM 8TB', stor: '24×2.5"', pcie: 'Gen4', use: '범용 DB, AI 추론', isNew: false },
  { model: 'R6525', gen: '15G', ff: '1U 2S', cpu: 'AMD EPYC Milan(3세대)', sk: 2, mem: 'DDR4 16 DIMM 4TB', stor: '10×2.5"', pcie: 'Gen4', use: 'ERP, 대용량 VM', isNew: false },
  { model: 'R7525', gen: '15G', ff: '2U 2S', cpu: 'AMD EPYC Milan(3세대)', sk: 2, mem: 'DDR4 32 DIMM 4TB', stor: '24×2.5"', pcie: 'Gen4', use: 'DB, AI, HPC', isNew: false },
];

/* ── 스펙시트 링크 ──────────────────────────────────────── */
const SHEETS = [
  { label: '16G · 1U 엔트리 Intel', model: 'R260 / R360', desc: 'Intel E-2400 · 1소켓 · 파일서버·SMB', color: '#007DB8', href: 'https://www.dell.com/en-us/shop/servers-storage-and-networking/poweredge-r360-rack-server/spd/poweredge-r360', gen: 16 },
  { label: '16G · Intel 2소켓 주력', model: 'R660 / R760', desc: 'Intel Xeon 4세대 · DDR5 · vSAN·DB', color: '#007DB8', href: 'https://www.dell.com/en-us/shop/servers-storage-and-networking/poweredge-r760-rack-server/spd/poweredge-r760/pe_r760_16920_vi_vp', gen: 16 },
  { label: '16G · 4소켓 엔터프라이즈', model: 'R860 / R960', desc: 'Intel 4소켓 · SAP HANA · 미션크리티컬', color: '#38D9F5', href: 'https://www.dell.com/en-us/shop/servers-storage-and-networking/poweredge-r860-rack-server/spd/poweredge-r860', gen: 16 },
  { label: '16G · AMD EPYC Genoa', model: 'R6625 / R7625', desc: 'AMD EPYC 4세대 · ERP·HPC·AI', color: '#fbbf24', href: 'https://www.dell.com/en-us/shop/servers-storage-and-networking/poweredge-r7625-rack-server/spd/poweredge-r7625', gen: 16 },
  { label: '16G · AMD EPYC Turin (NEW)', model: 'R6725 / R7725', desc: 'AMD EPYC 5세대 · 세계 기록 · 2024.11', color: '#a78bfa', href: 'https://www.dell.com/en-us/shop/servers-storage-and-networking/poweredge-r6725-rack-server/spd/poweredge-r6725', gen: 16 },
  { label: '16G · Tower 서버', model: 'T160 / T360 / T560', desc: 'SMB 엔트리 ~ 기업급 타워', color: '#4ade80', href: 'https://www.dell.com/en-us/shop/servers-storage-and-networking/poweredge-t560-tower-server/spd/poweredge-t560', gen: 16 },
  { label: '15G · Intel Rack', model: 'R650 / R750', desc: 'Intel Xeon Ice Lake · DDR4 · 예산 우선', color: '#00C9B1', href: 'https://www.dell.com/en-us/shop/servers-storage-and-networking/poweredge-r750-rack-server/spd/poweredge-r750', gen: 15 },
  { label: '15G · AMD EPYC Milan', model: 'R6525 / R7525', desc: 'AMD EPYC Milan · ERP·HPC · 예산 우선', color: '#fbbf24', href: 'https://www.dell.com/en-us/shop/servers-storage-and-networking/poweredge-r7525-rack-server/spd/poweredge-r7525', gen: 15 },
];

/* ── WHY ────────────────────────────────────────────────── */
const WHY = [
  { n: '01', title: 'Dell 공식 파트너', desc: '공급·구축·유지보수 원스톱. 15G/16G 전 제품군 공식 공급 채널.' },
  { n: '02', title: 'AI 서버 구축 레퍼런스', desc: 'STX엔진 AI 서버 인프라 구축 레퍼런스 보유. AI/GPU 워크로드 최적 모델 선정 전문.' },
  { n: '03', title: '국방·공공 조달 등록', desc: '방위사업청·공공기관 조달 등록 기업. 국방·공공 분야 Dell 서버 공급 전문.' },
  { n: '04', title: '풀스택 인프라 통합', desc: 'Dell 서버 + VAST Data 스토리지 + 망분리 보안까지. 단일 창구 전체 인프라 구축.' },
];

/* ── 서브컴포넌트: 제품 카드 ────────────────────────────── */
function ProductCard({ p }: { p: typeof G16_INTEL[0] }) {
  return (
    <div
      className="product-card"
      style={{ borderColor: p.border, background: '#0a1628' }}
    >
      <div style={{ borderTop: `2px solid ${p.color}` }} className="card-top">
        <div className="card-tier" style={{ color: p.color }}>{p.tier}</div>
        <div className="card-name" style={{ color: p.color }}>{p.name}</div>
        <div className="card-sub">{p.sub}</div>
        <div className="card-desc">{p.desc}</div>
      </div>
      <div className="card-specs">
        {p.specs.map(([k, v]) => (
          <div key={k} className="spec-row">
            <span className="spec-key">{k}</span>
            <span className="spec-val">{v}</span>
          </div>
        ))}
      </div>
      <div className="card-tags">
        {p.tags.map((t) => (
          <span key={t} className="tag" style={{ color: p.color, borderColor: p.border, background: p.bg }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ── 서브컴포넌트: 탭 ───────────────────────────────────── */
function TabSection({ tabs, panels }: { tabs: string[]; panels: React.ReactNode[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="tabs-row">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`tab-btn${active === i ? ' active' : ''}`}
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div>{panels[active]}</div>
    </div>
  );
}

/* ── 메인 페이지 ────────────────────────────────────────── */
export default function DellServerPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        :root{--dell:#007DB8;--d2:#0097C4;--d3:rgba(0,125,184,.09);--db:rgba(0,125,184,.28);--teal:#00C9B1;--amber:#fbbf24;--green:#4ade80;--purple:#a78bfa;--cyan:#38D9F5;--s1:#0a1628;--s2:#0e1e35;--br:rgba(31,74,117,.5);--w:#e8f1ff;--t:rgba(200,220,255,.76);--mu:#5a7a9a}

        /* ── 기본(PC) ── */
        .section{padding:0 40px 80px;position:relative;z-index:1}
        .section-inner{max-width:1240px;margin:0 auto}
        .section-label{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.3em;color:var(--dell);margin-bottom:10px;text-transform:uppercase}
        .section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,4.5vw,56px);letter-spacing:.02em;line-height:1.05;margin-bottom:12px;color:var(--w)}
        .section-sub{font-size:13.5px;color:var(--mu);max-width:640px;font-weight:300;margin-bottom:24px;line-height:1.8}
        .reveal{opacity:0;transform:translateY(20px);transition:opacity .6s,transform .6s}
        .reveal.visible{opacity:1;transform:none}

        /* ── Hero ── */
        .hero-section{position:relative;padding:88px 40px 56px;border-bottom:1px solid var(--br);overflow:hidden;background:radial-gradient(ellipse 75% 65% at 20% 50%,rgba(0,125,184,.07) 0%,transparent 60%)}
        .hero-inner{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1fr 420px;gap:56px;align-items:start}
        .hero-badges{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:6px}
        .hero-badge{display:inline-flex;align-items:center;font-family:'Share Tech Mono',monospace;font-size:8.5px;letter-spacing:.15em;padding:5px 12px;border-radius:2px;line-height:1.4}
        .hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,7vw,80px);letter-spacing:.02em;line-height:.92;margin:18px 0 6px;background:linear-gradient(135deg,var(--dell),var(--d2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .hero-sub{font-size:clamp(18px,3.5vw,38px);color:var(--t);font-weight:300;margin-bottom:18px;line-height:1.2}
        .hero-desc{font-size:15px;color:var(--t);font-weight:300;line-height:1.85;max-width:520px;margin-bottom:28px}
        .hero-cta-row{display:flex;gap:9px;flex-wrap:wrap}

        /* ── 제품 그리드 ── */
        .product-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
        .product-card{border:1px solid;border-radius:2px;overflow:hidden;transition:border-color .2s;display:flex;flex-direction:column}
        .card-top{padding:22px 20px 16px;flex:1}
        .card-tier{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:.2em;margin-bottom:6px}
        .card-name{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:.03em;line-height:1;margin-bottom:4px}
        .card-sub{font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.1em;color:var(--mu);margin-bottom:10px}
        .card-desc{font-size:12.5px;color:var(--t);font-weight:300;line-height:1.75}
        .card-specs{padding:14px 20px;background:var(--s2);border-top:1px solid var(--br)}
        .spec-row{display:flex;justify-content:space-between;align-items:flex-start;padding:5px 0;border-bottom:1px solid rgba(31,74,117,.25);gap:8px}
        .spec-row:last-child{border-bottom:none}
        .spec-key{color:var(--mu);font-family:'Share Tech Mono',monospace;font-size:8.5px;letter-spacing:.08em;white-space:nowrap;flex-shrink:0}
        .spec-val{color:var(--t);text-align:right;font-size:11px;line-height:1.4}
        .card-tags{padding:10px 20px;display:flex;flex-wrap:wrap;gap:4px;border-top:1px solid var(--br)}
        .tag{font-family:'Share Tech Mono',monospace;font-size:8.5px;letter-spacing:.1em;padding:3px 9px;border-radius:2px;border:1px solid}

        /* ── 탭 ── */
        .tabs-row{display:flex;gap:2px;flex-wrap:wrap;margin-bottom:2px}
        .tab-btn{padding:10px 20px;background:var(--s1);border:1px solid var(--br);font-family:'Share Tech Mono',monospace;font-size:9.5px;letter-spacing:.12em;cursor:pointer;transition:all .2s;color:var(--mu);border-radius:2px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
        .tab-btn.active,.tab-btn:hover{background:var(--d3);border-color:var(--db);color:var(--dell)}

        /* ── Gen 구분선 ── */
        .gen-divider{max-width:1240px;margin:0 auto;padding:56px 20px 20px;display:flex;align-items:center;gap:16px}
        .gen-line{flex:1;height:1px;background:var(--br)}
        .gen-label{font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:.15em;padding:7px 18px;border:1px solid;border-radius:2px}

        /* ── 비교표 ── */
        .cmp-table{width:100%;border-collapse:collapse;font-size:12px;min-width:900px}
        .cmp-table th{background:var(--s2);padding:11px 14px;font-family:'Share Tech Mono',monospace;font-size:8.5px;letter-spacing:.12em;color:var(--dell);border:1px solid var(--br);text-align:left;white-space:nowrap}
        .cmp-table td{padding:9px 14px;border:1px solid var(--br);color:var(--t);font-weight:300;vertical-align:top;line-height:1.45}
        .cmp-table tr:nth-child(even) td{background:rgba(10,22,40,.5)}
        .cmp-table td:first-child{font-weight:500;white-space:nowrap}

        /* ── 스펙시트·WHY 그리드 ── */
        .sheet-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}
        .sheet-card{background:var(--s1);border:1px solid var(--br);border-radius:2px;padding:20px 18px;position:relative;overflow:hidden;transition:border-color .2s;display:flex;flex-direction:column}
        .sheet-card:hover{border-color:var(--db)}
        .why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:32px}
        .why-card{padding:24px 20px;background:var(--s1);border:1px solid var(--br);border-radius:2px;position:relative;overflow:hidden;transition:border-color .2s}
        .why-card:hover{border-color:var(--db)}

        /* ── 네이밍 가이드 ── */
        .naming-box{background:var(--s1);border:1px solid var(--br);border-radius:2px;padding:24px 32px;position:relative;overflow:hidden;display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start}
        .naming-chips{display:flex;gap:10px;flex-wrap:wrap;flex:1}
        .naming-chip{padding:10px 14px;background:var(--s2);border:1px solid var(--br);min-width:110px;border-radius:2px}

        /* ── 태블릿 (≤1100px) ── */
        @media(max-width:1100px){
          .product-grid{grid-template-columns:1fr 1fr}
          .sheet-grid{grid-template-columns:1fr 1fr}
          .why-grid{grid-template-columns:1fr 1fr}
          .hero-inner{grid-template-columns:1fr;gap:32px}
          .hero-stat-panel{max-width:480px}
        }

        /* ── 모바일 (≤768px) ── */
        @media(max-width:768px){
          .hero-section{padding:80px 16px 48px}
          .hero-inner{grid-template-columns:1fr;gap:24px}
          .hero-title{font-size:clamp(36px,10vw,56px);margin:12px 0 4px}
          .hero-sub{font-size:clamp(16px,5vw,24px);margin-bottom:12px}
          .hero-desc{font-size:13.5px;margin-bottom:20px}
          .hero-badge{font-size:8px;letter-spacing:.1em;padding:4px 10px}
          .hero-cta-row{flex-direction:column;gap:8px}
          .hero-cta-row a{text-align:center;justify-content:center;width:100%;box-sizing:border-box}

          .section{padding:0 16px 56px}
          .section-title{font-size:clamp(26px,7vw,40px)}
          .section-sub{font-size:13px;margin-bottom:18px}

          .product-grid{grid-template-columns:1fr}
          .sheet-grid{grid-template-columns:1fr 1fr}
          .why-grid{grid-template-columns:1fr 1fr}

          .card-top{padding:16px 14px 12px}
          .card-name{font-size:26px}
          .card-desc{font-size:12px}
          .card-specs{padding:10px 14px}
          .card-tags{padding:8px 14px}
          .spec-key{font-size:8px}
          .spec-val{font-size:10.5px}

          .tabs-row{gap:4px}
          .tab-btn{padding:11px 14px;font-size:9px;letter-spacing:.08em;flex:1;min-width:calc(50% - 4px);text-align:center}

          .gen-divider{padding:36px 0 16px;gap:10px}
          .gen-label{font-size:9px;letter-spacing:.1em;padding:6px 12px;text-align:center;line-height:1.5}

          .naming-box{padding:18px 16px;gap:16px;flex-direction:column}
          .naming-chips{gap:6px}
          .naming-chip{min-width:80px;padding:8px 10px}

          .why-grid{grid-template-columns:1fr 1fr}
          .why-card{padding:18px 14px}
        }

        /* ── 소형 모바일 (≤480px) ── */
        @media(max-width:480px){
          .hero-section{padding:76px 14px 40px}
          .hero-title{font-size:clamp(32px,11vw,48px)}
          .hero-sub{font-size:clamp(15px,5.5vw,22px)}
          .section{padding:0 14px 44px}
          .section-title{font-size:clamp(24px,8vw,36px)}

          .product-grid,.sheet-grid,.why-grid{grid-template-columns:1fr}
          .tab-btn{min-width:100%;flex:none}
          .naming-chips{flex-direction:column}
          .naming-chip{min-width:unset;width:100%}

          .gen-label{font-size:8.5px;letter-spacing:.06em}
          .cmp-table{font-size:11px}
          .cmp-table th{padding:8px 10px;font-size:7.5px}
          .cmp-table td{padding:7px 10px}
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-inner">
          <div>
            <div className="hero-badges">
              <span className="hero-badge" style={{ color: 'var(--dell)', background: 'var(--d3)', border: '1px solid var(--db)' }}>● Dell Technologies 공식 파트너</span>
              <span className="hero-badge" style={{ color: 'var(--teal)', background: 'rgba(0,201,177,.08)', border: '1px solid rgba(0,201,177,.2)' }}>● 15G · 16G 현행 제품만</span>
              <span className="hero-badge" style={{ color: 'var(--amber)', background: 'rgba(251,191,36,.07)', border: '1px solid rgba(251,191,36,.25)' }}>● Intel Xeon 4/5세대 · AMD EPYC 4/5세대</span>
            </div>
            <h1 className="hero-title">Dell PowerEdge</h1>
            <div className="hero-sub">15세대 · 16세대 서버 라인업</div>
            <p className="hero-desc">
              2021년 이후 출시된 현행 PowerEdge 제품군. 15G(iDRAC9) · 16G(iDRAC10) 기준
              Intel Xeon 4세대·5세대, AMD EPYC 4세대·5세대 전 제품군을 VWorks를 통해 공급·구축합니다.
            </p>
            <div className="hero-cta-row">
              <Link href="/ko/contact" style={{ display: 'inline-flex', alignItems: 'center', background: 'linear-gradient(135deg,var(--dell),var(--d2))', color: '#fff', fontSize: 14, fontWeight: 500, padding: '13px 28px', borderRadius: 2, textDecoration: 'none' }}>
                Dell 서버 견적 문의하기 →
              </Link>
            </div>
          </div>
          {/* STAT PANEL */}
          <div style={{ background: 'var(--s1)', border: '1px solid var(--db)', borderRadius: 3, padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,var(--dell),var(--d2))' }} />
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.2em', color: 'var(--dell)' }}>공급 제품 현황 (2025 기준)</div>
            <div style={{ display: 'grid', gridTemplateColumns: "repeat(2,1fr)", gap: 2, marginTop: 16 }}>
              {[
                { n: '16G', l: '최신 세대\n2023~현재', s: 'iDRAC10 · DDR5' },
                { n: '15G', l: '이전 현행\n2021~2023', s: 'iDRAC9 · DDR4/5' },
                { n: '20+', l: '공급 모델 수\n(Rack+Tower)', s: 'Intel · AMD 포함' },
                { n: 'PCIe5', l: '16G 기본 적용\nGen5 인터페이스', s: 'NVMe E3.S 지원' },
              ].map((s) => (
                <div key={s.n} style={{ padding: '14px 12px', background: 'var(--s2)', border: '1px solid var(--br)', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: 'var(--dell)', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: 'var(--t)', lineHeight: 1.4, margin: '5px 0 4px', whiteSpace: 'pre-line' }}>{s.l}</div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: 'var(--mu)', letterSpacing: '.08em' }}>{s.s}</div>
                </div>
              ))}
            </div>
            {/* 세대 구분 */}
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--br)' }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: 'var(--mu)', letterSpacing: '.12em', marginBottom: 8 }}>세대 구분 (모델명 기준)</div>
              {[
                { gen: '16G', c: 'var(--dell)', bg: 'var(--d3)', bd: 'var(--db)', desc: 'R×6×× / R×7×× / R860 / R960 / T160 / T360 / T560' },
                { gen: '15G', c: 'var(--teal)', bg: 'rgba(0,201,177,.07)', bd: 'rgba(0,201,177,.2)', desc: 'R×5×× / R×4×× / R350 / R250 / T550 / T350' },
              ].map((g) => (
                <div key={g.gen} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', background: g.bg, border: `1px solid ${g.bd}`, borderRadius: 2, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, color: g.c, letterSpacing: '.08em' }}>{g.gen}</span>
                  <span style={{ fontSize: 11, color: 'var(--t)', fontWeight: 300 }}>{g.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 네이밍 가이드 ── */}
      <section className="section reveal" style={{ paddingTop: 44, paddingBottom: 44 }}>
        <div className="section-inner">
          <div className="naming-box">
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,var(--dell),var(--d2))' }} />
            <div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.2em', color: 'var(--dell)', marginBottom: 10 }}>제품명 읽는 법 · PowerEdge R7625</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 44, letterSpacing: '.1em', lineHeight: 1 }}>
                <span style={{ color: 'var(--dell)' }}>R</span>
                <span style={{ color: '#0097C4' }}>7</span>
                <span style={{ color: 'var(--teal)' }}>6</span>
                <span style={{ color: 'var(--amber)' }}>2</span>
                <span style={{ color: 'var(--green)' }}>5</span>
              </div>
            </div>
            <div className="naming-chips">
              {[
                { c: 'var(--dell)', k: 'R', label: '폼팩터', v: 'R=Rack\nT=Tower' },
                { c: '#0097C4', k: '7', label: '클래스', v: '6~9: 미드·하이\n1~5: 엔트리' },
                { c: 'var(--teal)', k: '6', label: '세대', v: '5=15Gen\n6=16Gen' },
                { c: 'var(--amber)', k: '2', label: '소켓 수', v: '1=1소켓\n2=2소켓' },
                { c: 'var(--green)', k: '5', label: 'CPU 제조사', v: '0=Intel\n5=AMD' },
              ].map((item) => (
                <div key={item.k} className="naming-chip">
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: item.c }}>{item.k}</div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, letterSpacing: '.1em', color: 'var(--mu)' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--t)', marginTop: 4, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{item.v}</div>
                </div>
              ))}
              <div style={{ padding: '10px 14px', background: 'rgba(0,201,177,.07)', border: '1px solid rgba(0,201,177,.2)', flex: 1, minWidth: 180, borderRadius: 2 }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, letterSpacing: '.1em', color: 'var(--teal)', marginBottom: 6 }}>R7625 = ?</div>
                <div style={{ fontSize: 12.5, color: 'var(--t)', fontWeight: 300, lineHeight: 1.7 }}>
                  Rack · 하이엔드 · <strong style={{ color: 'var(--teal)' }}>16세대</strong> · 2소켓 · <strong style={{ color: 'var(--amber)' }}>AMD</strong><br />
                  → AMD EPYC Genoa 2소켓 랙서버
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 16G 디바이더 ── */}
      <div className="gen-divider">
        <div className="gen-line" />
        <div className="gen-label" style={{ color: 'var(--dell)', background: 'var(--d3)', borderColor: 'var(--db)' }}>
          🔵 16세대 (16G) — 2023~현재 · iDRAC10 · DDR5 · PCIe Gen5
        </div>
        <div className="gen-line" />
      </div>

      {/* ── 16G 제품 탭 ── */}
      <section className="section reveal">
        <div className="section-inner">
          <div className="section-label">16세대 제품 라인업</div>
          <h2 className="section-title">PowerEdge 16G</h2>
          <p className="section-sub">DDR5, PCIe Gen5, E3.S NVMe, iDRAC10 기반. Intel Xeon Scalable 4세대 · AMD EPYC 4세대(Genoa) · AMD EPYC 5세대(Turin). 2023년 상반기 글로벌 출시.</p>
          <TabSection
            tabs={['Rack 서버 (Intel)', 'Rack 서버 (AMD)', 'Tower 서버', '고성능 4소켓']}
            panels={[
              <div className="product-grid" key="16i">{G16_INTEL.map((p) => <ProductCard key={p.name} p={p} />)}</div>,
              <div key="16a">
                <div style={{ background: 'rgba(251,191,36,.05)', border: '1px solid rgba(251,191,36,.2)', borderRadius: 2, padding: '10px 16px', marginBottom: 10, fontSize: 13, color: 'var(--t)', fontWeight: 300, lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--amber)' }}>AMD 제품 라인업:</strong> 모델명 끝 <strong style={{ color: 'var(--amber)' }}>5</strong> = AMD EPYC. 16G AMD는 EPYC 4세대(Genoa) 기반. 2024.11 출시 R6725·R7725는 5세대(Turin) 기반.
                </div>
                <div className="product-grid">{G16_AMD.map((p) => <ProductCard key={p.name} p={p} />)}</div>
              </div>,
              <div className="product-grid" key="16t">{G16_TOWER.map((p) => <ProductCard key={p.name} p={p} />)}</div>,
              <div className="product-grid" key="16s">{G16_4S.map((p) => <ProductCard key={p.name} p={p} />)}</div>,
            ]}
          />
        </div>
      </section>

      {/* ── 15G 디바이더 ── */}
      <div className="gen-divider">
        <div className="gen-line" />
        <div className="gen-label" style={{ color: 'var(--teal)', background: 'rgba(0,201,177,.07)', borderColor: 'rgba(0,201,177,.25)' }}>
          🟢 15세대 (15G) — 2021~2023 · iDRAC9 · DDR4/DDR5 · PCIe Gen4
        </div>
        <div className="gen-line" />
      </div>

      {/* ── 15G 제품 탭 ── */}
      <section className="section reveal">
        <div className="section-inner">
          <div className="section-label" style={{ color: 'var(--teal)' }}>15세대 제품 라인업</div>
          <h2 className="section-title">PowerEdge 15G</h2>
          <div style={{ background: 'rgba(0,201,177,.05)', border: '1px solid rgba(0,201,177,.18)', borderRadius: 2, padding: '10px 16px', marginBottom: 20, fontSize: 12.5, color: 'var(--t)', fontWeight: 300 }}>
            💡 <strong style={{ color: 'var(--teal)' }}>15G 선택 가이드:</strong> 예산 효율 우선, 기존 15G 환경 확장, 또는 신규 중소 규모 구축 시 권장. 대규모 신규 구축은 16G 권장.
          </div>
          <TabSection
            tabs={['Rack 서버 (Intel)', 'Rack 서버 (AMD)']}
            panels={[
              <div className="product-grid" key="15i">{G15_INTEL.map((p) => <ProductCard key={p.name} p={p} />)}</div>,
              <div className="product-grid" key="15a">{G15_AMD.map((p) => <ProductCard key={p.name} p={p} />)}</div>,
            ]}
          />
        </div>
      </section>

      {/* ── 비교 테이블 ── */}
      <section className="section reveal" style={{ background: 'linear-gradient(180deg,transparent,rgba(0,125,184,.03),transparent)' }}>
        <div className="section-inner">
          <div className="section-label">비교</div>
          <h2 className="section-title">주요 모델 스펙 비교표</h2>
          <div style={{ overflowX: 'auto', marginTop: 24 }}>
            <table className="cmp-table">
              <thead>
                <tr>
                  {['모델', '세대', '폼팩터', 'CPU', '소켓', '메모리', '스토리지 최대', 'PCIe', '주요 사용처'].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CMP.map((r) => (
                  <tr key={r.model}>
                    <td style={{ color: r.isNew ? 'var(--dell)' : 'var(--teal)', fontWeight: 600 }}>{r.model}</td>
                    <td style={{ color: r.isNew ? 'var(--dell)' : 'var(--teal)' }}>{r.gen}</td>
                    <td>{r.ff}</td>
                    <td>{r.cpu}</td>
                    <td style={{ textAlign: 'center' }}>{r.sk}</td>
                    <td>{r.mem}</td>
                    <td>{r.stor}</td>
                    <td>{r.pcie}</td>
                    <td>{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 스펙시트 다운로드 ── */}
      <section className="section reveal">
        <div className="section-inner">
          <div className="section-label">스펙시트</div>
          <h2 className="section-title">15G · 16G 공식 스펙시트 & 퀵스펙</h2>
          <p className="section-sub">Dell Technologies 공식 제품 페이지로 연결됩니다. 상세 구성 옵션 확인 및 견적 요청에 활용하세요.</p>
          <div className="sheet-grid">
            {SHEETS.map((s) => (
              <div key={s.model} className="sheet-card" style={{ borderColor: `${s.color}33` }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${s.color},transparent)` }} />
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, letterSpacing: '.15em', color: s.color, marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: s.color, lineHeight: 1, marginBottom: 5 }}>{s.model}</div>
                <div style={{ fontSize: 11.5, color: 'var(--t)', fontWeight: 300, lineHeight: 1.6, flex: 1 }}>{s.desc}</div>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12, paddingTop: 12, color: s.color, fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.12em', textDecoration: 'none', borderTop: '1px solid var(--br)' }}
                >
                  스펙시트 →
                </a>
              </div>
            ))}
          </div>

          {/* 견적 배너 */}
          <div style={{ background: 'var(--d3)', border: '1px solid var(--db)', borderRadius: 2, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginTop: 8 }}>
            <div style={{ fontSize: 26 }}>📋</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.18em', color: 'var(--dell)', marginBottom: 5 }}>스펙시트 직접 요청 · 공식 견적서 발급</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: '.03em', marginBottom: 3 }}>특정 모델 스펙시트가 필요하신가요?</div>
              <div style={{ fontSize: 12.5, color: 'var(--t)', fontWeight: 300 }}>모델명 또는 워크로드를 알려주시면 VWorks 전문 엔지니어가 공식 스펙시트와 맞춤 견적을 제공드립니다.</div>
            </div>
            <Link href="/ko/contact" style={{ display: 'inline-flex', alignItems: 'center', background: 'linear-gradient(135deg,var(--dell),var(--d2))', color: '#fff', fontSize: 13, fontWeight: 500, padding: '11px 22px', borderRadius: 2, textDecoration: 'none' }}>
              견적·스펙시트 요청 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY VWORKS ── */}
      <section className="section reveal">
        <div className="section-inner">
          <div className="section-label">왜 VWorks인가</div>
          <h2 className="section-title">Dell PowerEdge,<br />VWorks에서 구매해야 하는 이유</h2>
          <div className="why-grid">
            {WHY.map((w) => (
              <div key={w.n} className="why-card" style={{ borderTop: '2px solid var(--dell)' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, color: 'rgba(0,125,184,.1)', lineHeight: 1, marginBottom: 8 }}>{w.n}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: '.02em', marginBottom: 8, lineHeight: 1.2 }}>{w.title}</div>
                <div style={{ fontSize: 12, color: 'var(--mu)', fontWeight: 300, lineHeight: 1.8 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '72px clamp(16px,4vw,40px) 110px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Dell 서버 도입 문의</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(24px, 6vw, 72px)", letterSpacing: '.02em', lineHeight: 1, marginBottom: 14 }}>지금 바로<br />견적을 받아보세요</h2>
          <p style={{ fontSize: 15, color: 'var(--mu)', fontWeight: 300, marginBottom: 28, lineHeight: 1.7 }}>
            15G/16G 중 어떤 모델이 최적인지, VWorks 엔지니어가 워크로드 분석 후 추천드립니다.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", gap: 2, maxWidth: 360, margin: '0 auto 24px' }}>
            <div style={{ padding: 14, background: 'var(--s1)', border: '1px solid var(--br)' }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8.5, letterSpacing: '.15em', color: 'var(--dell)', marginBottom: 5 }}>PHONE</div>
              <div style={{ fontSize: 13, color: 'var(--t)', fontWeight: 300 }}>051-747-6428</div>
            </div>
            <div style={{ padding: 14, background: 'var(--s1)', border: '1px solid var(--br)' }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8.5, letterSpacing: '.15em', color: 'var(--dell)', marginBottom: 5 }}>EMAIL</div>
              <div style={{ fontSize: 13, color: 'var(--t)', fontWeight: 300 }}>aiden@vworks.tech</div>
            </div>
          </div>
          <Link href="/ko/contact" style={{ display: 'inline-flex', alignItems: 'center', background: 'linear-gradient(135deg,var(--dell),var(--d2))', color: '#fff', fontSize: 16, fontWeight: 500, padding: '15px 52px', borderRadius: 2, textDecoration: 'none' }}>
            Dell 서버 견적 문의하기 →
          </Link>
          <div style={{ marginTop: 14, fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: '.12em', color: 'var(--mu)' }}>
            문의 후 1~2 영업일 내 공식 견적서 발송
          </div>
        </div>
      </section>
    </>
  );
}
