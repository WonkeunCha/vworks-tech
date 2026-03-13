'use client';

import Link from 'next/link';

export default function WxVizPage() {
  return (
    <main className="min-h-screen bg-[#020818] text-white">

      {/* Hero */}
      <section className="relative min-h-[520px] flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#020818] to-[#020818]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,180,180,0.12) 0%, transparent 70%)',
        }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-medium mb-8">
            ✦ 기상·해양 데이터 시각화 전문 솔루션
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            기상·해양 데이터를<br />
            <span className="text-teal-400">실시간으로 가시화</span>
          </h1>
          <p className="text-[#8899bb] text-lg md:text-xl max-w-2xl mx-auto mb-10">
            위성·레이더·수치예보 데이터를 WebGL 기반 고성능 렌더링으로 처리.<br />
            국방·공공·연구기관 특화 기상해양 가시화 플랫폼입니다.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/ko/contact/" className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-[#000d1a] font-bold rounded-lg transition-colors">
              도입 상담 신청 →
            </Link>
            <Link href="/ko/solutions/" className="px-6 py-3 border border-[#1a2d4a] hover:border-teal-500/50 text-[#8899bb] hover:text-white rounded-lg transition-colors">
              관련 솔루션 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 핵심 지표 */}
      <section className="border-y border-[#1a2d4a] bg-[#0a0f28]/50">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 'Real-time', label: '실시간 데이터 처리' },
            { value: 'WebGL', label: '고성능 렌더링 엔진' },
            { value: '4K+', label: '고해상도 지원' },
            { value: '다기관', label: '국방·공공 납품 실적' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-extrabold text-teal-400 mb-1">{stat.value}</p>
              <p className="text-sm text-[#8899bb]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">핵심 기능</h2>
          <p className="text-[#8899bb] text-lg">기상·해양 데이터 처리부터 시각화까지 원스톱 솔루션</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🛰️',
              title: '위성 데이터 처리',
              desc: 'COMS, GK-2A 등 정지궤도 위성 데이터 실시간 수신 및 처리. 적외선·가시광선·수증기 채널 합성 표출.',
              color: 'teal',
            },
            {
              icon: '📡',
              title: '레이더 가시화',
              desc: 'AWS·ASOS 기상 레이더 데이터 실시간 렌더링. PPI, RHI, CAPPI 등 다양한 단면 표출 지원.',
              color: 'blue',
            },
            {
              icon: '🌊',
              title: '해양 데이터 표출',
              desc: '해수면 온도, 파고, 해류 벡터 등 해양 수치모델 출력값을 인터랙티브 지도 위에 오버레이.',
              color: 'cyan',
            },
            {
              icon: '🗺️',
              title: '3D 지형 렌더링',
              desc: 'WebGL 기반 3D 지형 위에 기상 데이터 오버레이. 고도별 기온·풍향·풍속 입체 표출.',
              color: 'teal',
            },
            {
              icon: '⚡',
              title: '고성능 스트리밍',
              desc: '대용량 NetCDF, GRIB2 포맷 실시간 스트리밍 처리. 초당 수백만 격자점 렌더링 성능.',
              color: 'blue',
            },
            {
              icon: '🔧',
              title: '커스텀 대시보드',
              desc: '기관 요구사항에 맞춘 맞춤형 모니터링 화면 구성. 다중 화면 분할 및 레이어 관리.',
              color: 'cyan',
            },
          ].map((feat) => {
            const colorMap: Record<string, string> = {
              teal: 'border-teal-500/20 hover:border-teal-500/50',
              blue: 'border-blue-500/20 hover:border-blue-500/50',
              cyan: 'border-cyan-500/20 hover:border-cyan-500/50',
            };
            const iconBg: Record<string, string> = {
              teal: 'bg-teal-500/10',
              blue: 'bg-blue-500/10',
              cyan: 'bg-cyan-500/10',
            };
            return (
              <div key={feat.title} className={`p-6 rounded-2xl border bg-[#0a0f28] transition-colors ${colorMap[feat.color]}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${iconBg[feat.color]}`}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-[#8899bb] leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 지원 데이터 포맷 */}
      <section className="bg-[#0a0f28]/50 border-y border-[#1a2d4a]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">지원 데이터 포맷 및 연동</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider">기상 데이터 포맷</h3>
              <ul className="space-y-3">
                {['NetCDF / NetCDF-4', 'GRIB / GRIB2', 'HDF5', 'GeoTIFF / TIFF', 'Binary RAW 포맷', 'WMS / WFS / WCS'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#8899bb]">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-blue-400 font-bold mb-4 text-sm uppercase tracking-wider">연동 기관 데이터</h3>
              <ul className="space-y-3">
                {['기상청 수치예보 모델 (GDAPS, RDAPS)', 'KMA 기상 레이더 (NEXRAD 호환)', '국가기상위성센터 (GK-2A)', '해양조사원 해양 관측 데이터', 'ECMWF / GFS 전지구모델', '국방 기상 데이터 전용 포맷'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#8899bb]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 적용 분야 */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">적용 분야</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🛡️', title: '국방·안보', desc: '작전 기상 지원, 해군 해양 예보, 공군 기상 모니터링 시스템' },
            { icon: '🏛️', title: '공공·정부기관', desc: '기상청·해양수산부·환경부 연계 실시간 기상 모니터링 포털' },
            { icon: '🔬', title: '연구기관', desc: '기상·해양·환경 연구를 위한 고해상도 데이터 분석 시각화 플랫폼' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl border border-[#1a2d4a] bg-[#0a0f28] text-center hover:border-teal-500/30 transition-colors">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-[#8899bb] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1a2d4a] bg-gradient-to-b from-[#0a0f28] to-[#020818]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            기상·해양 가시화 도입 문의
          </h2>
          <p className="text-[#8899bb] text-lg mb-10">
            기관 환경에 최적화된 커스텀 솔루션을 제공합니다.<br />
            기술 검토부터 구축·운영까지 VWorks가 함께합니다.
          </p>
          <Link href="/ko/contact/" className="inline-block px-8 py-4 bg-teal-500 hover:bg-teal-400 text-[#000d1a] font-bold rounded-lg transition-colors text-lg">
            도입 상담 신청 →
          </Link>
        </div>
      </section>
    </main>
  );
}
