export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#e8f1ff', marginBottom: 8 }}>
          개인정보처리방침
        </h1>
        <p style={{ fontSize: 13, color: '#5a7a9a', marginBottom: 40 }}>
          시행일: 2025년 1월 1일 &nbsp;|&nbsp; 최종 수정: 2026년 4월 11일
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          <Section title="1. 개인정보의 처리 목적">
            <p>브이웍스테크놀로지스 주식회사(이하 &ldquo;회사&rdquo;)는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            <ul>
              <li>홈페이지 문의 접수 및 회신</li>
              <li>제품·솔루션 상담 및 견적 제공</li>
              <li>기술 지원 및 유지보수 서비스 제공</li>
            </ul>
          </Section>

          <Section title="2. 개인정보의 처리 및 보유기간">
            <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
            <ul>
              <li>홈페이지 문의: 문의 처리 완료 후 <strong>1년</strong> 보관 후 파기</li>
              <li>계약 관련 기록: 관련 법령에 따라 <strong>5년</strong> 보관</li>
            </ul>
          </Section>

          <Section title="3. 처리하는 개인정보의 항목">
            <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
            <ul>
              <li><strong>필수항목:</strong> 이름, 이메일 주소, 문의 내용</li>
              <li><strong>선택항목:</strong> 회사명, 연락처, 직책</li>
              <li><strong>자동수집항목:</strong> 접속 IP, 브라우저 종류, 접속 일시</li>
            </ul>
          </Section>

          <Section title="4. 개인정보의 제3자 제공">
            <p>회사는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
          </Section>

          <Section title="5. 개인정보의 파기절차 및 방법">
            <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</p>
            <ul>
              <li><strong>전자적 파일:</strong> 복구할 수 없는 방법으로 영구 삭제</li>
              <li><strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각</li>
            </ul>
          </Section>

          <Section title="6. 정보주체의 권리·의무 및 행사방법">
            <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
            <ul>
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리 정지 요구</li>
            </ul>
            <p>위 권리 행사는 이메일(<a href="mailto:aiden@vworks.tech" style={{ color: 'var(--teal)' }}>aiden@vworks.tech</a>)을 통하여 하실 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
          </Section>

          <Section title="7. 개인정보의 안전성 확보조치">
            <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul>
              <li>개인정보 접근 제한 및 접근 권한 관리</li>
              <li>개인정보의 암호화 (전송 시 TLS/SSL 적용)</li>
              <li>해킹 등에 대비한 보안 시스템 운영</li>
              <li>개인정보 취급 직원의 최소화 및 교육</li>
            </ul>
          </Section>

          <Section title="8. 웹사이트 자동 수집 및 AI 학습 금지">
            <p>회사는 본 웹사이트의 콘텐츠가 무단 스크래핑, 크롤링, 또는 AI 모델 학습에 사용되는 것을 금지합니다.</p>
            <ul>
              <li>robots.txt를 통해 AI 학습용 크롤러(GPTBot, CCBot, ClaudeBot 등)의 접근을 차단합니다</li>
              <li>웹사이트의 콘텐츠를 무단으로 수집·복제·배포하는 행위는 저작권법에 의해 금지됩니다</li>
              <li>자동화된 수단(봇, 스크립트 등)을 이용한 대량 접근을 제한합니다</li>
            </ul>
          </Section>

          <Section title="9. 개인정보 보호책임자">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <Row label="성명" value="차원근" />
                <Row label="직책" value="대표이사" />
                <Row label="이메일" value="aiden@vworks.tech" isEmail />
                <Row label="전화" value="051-747-6428" />
              </tbody>
            </table>
          </Section>

          <Section title="10. 개인정보 처리방침 변경">
            <p>이 개인정보처리방침은 2025년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={{
        fontSize: 18,
        fontWeight: 700,
        color: '#e8f1ff',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottom: '1px solid rgba(31,74,117,0.3)',
      }}>
        {title}
      </h2>
      <div style={{
        fontSize: 14,
        color: 'rgba(200,220,255,0.78)',
        lineHeight: 1.9,
      }}>
        {children}
        <style>{`
          section ul { padding-left: 20px; margin: 8px 0 }
          section li { margin-bottom: 4px }
          section p { margin-bottom: 8px }
        `}</style>
      </div>
    </section>
  );
}

function Row({ label, value, isEmail }: { label: string; value: string; isEmail?: boolean }) {
  return (
    <tr>
      <td style={{
        padding: '8px 16px 8px 0',
        fontSize: 13,
        color: '#5a7a9a',
        fontWeight: 600,
        borderBottom: '1px solid rgba(31,74,117,0.2)',
        width: 80,
      }}>
        {label}
      </td>
      <td style={{
        padding: '8px 0',
        fontSize: 14,
        color: 'rgba(200,220,255,0.82)',
        borderBottom: '1px solid rgba(31,74,117,0.2)',
      }}>
        {isEmail ? (
          <a href={`mailto:${value}`} style={{ color: 'var(--teal)', textDecoration: 'none' }}>{value}</a>
        ) : value}
      </td>
    </tr>
  );
}
