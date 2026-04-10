'use client';
import { useState, useEffect } from 'react';

interface Section {
  heading: string;
  image?: string;
  paragraphs: string[];
}

interface Article {
  id: string;
  title: string;
  originalTitle: string;
  summary: string;
  keyPoints: string[];
  sections: Section[];
  source: string;
  sourceUrl: string;
  author: string;
  date: string;
  image: string;
  translatedAt: string;
}

const SOURCE_COLORS: Record<string, string> = {
  'VAST Data': '#00C9B1',
  'Dell': '#0076CE',
  'HPE': '#01A982',
};

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  const color = SOURCE_COLORS[article.source] || '#00C9B1';

  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        background: 'rgba(10, 22, 40, 0.6)',
        border: '1px solid rgba(31, 74, 117, 0.4)',
        borderRadius: 12,
        padding: 0,
        cursor: 'pointer',
        transition: 'all 0.2s',
        overflow: 'hidden',
      }}
      onMouseOver={e => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 32px ${color}22`;
      }}
      onMouseOut={e => {
        e.currentTarget.style.borderColor = 'rgba(31, 74, 117, 0.4)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {article.image && (
        <div style={{ width: '100%', height: 200, overflow: 'hidden', background: '#0a1628' }}>
          <img
            src={article.image}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
        </div>
      )}
      <div style={{ padding: '20px 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'monospace',
            padding: '2px 8px',
            borderRadius: 4,
            background: `${color}22`,
            color: color,
            letterSpacing: 0.5,
          }}>
            {article.source}
          </span>
          <span style={{ fontSize: 12, color: '#5a7a9a' }}>{formatDate(article.date)}</span>
        </div>

        <h3 style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#e8f1ff',
          lineHeight: 1.5,
          marginBottom: 8,
        }}>
          {article.title}
        </h3>

        <p style={{
          fontSize: 13,
          color: 'rgba(200,220,255,0.6)',
          lineHeight: 1.7,
          marginBottom: 12,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }}>
          {article.summary}
        </p>

        {article.author && (
          <p style={{ fontSize: 12, color: '#5a7a9a' }}>✍️ {article.author}</p>
        )}
      </div>
    </button>
  );
}

function ArticleDetail({ article, onClose }: { article: Article; onClose: () => void }) {
  const color = SOURCE_COLORS[article.source] || '#00C9B1';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        padding: '40px 16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0a1628',
          border: '1px solid rgba(31,74,117,0.5)',
          borderRadius: 16,
          width: '100%',
          maxWidth: 800,
          padding: '40px 48px',
          position: 'relative',
          alignSelf: 'flex-start',
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: 0,
            float: 'right',
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid rgba(31,74,117,0.5)',
            background: 'rgba(10,22,40,0.9)',
            color: '#5a7a9a',
            fontSize: 18,
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* 메타 정보 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'monospace',
            padding: '2px 8px',
            borderRadius: 4,
            background: `${color}22`,
            color: color,
          }}>
            {article.source}
          </span>
          <span style={{ fontSize: 13, color: '#5a7a9a' }}>{formatDate(article.date)}</span>
          {article.author && (
            <span style={{ fontSize: 13, color: '#5a7a9a' }}>· {article.author}</span>
          )}
        </div>

        {/* 제목 */}
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          color: '#e8f1ff',
          lineHeight: 1.4,
          marginBottom: 8,
        }}>
          {article.title}
        </h1>
        <p style={{ fontSize: 13, color: '#5a7a9a', marginBottom: 24 }}>
          원문: {article.originalTitle}
        </p>

        {/* OG 이미지 */}
        {article.image && (
          <div style={{ marginBottom: 32, borderRadius: 8, overflow: 'hidden' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%' }} />
          </div>
        )}

        {/* 요약 박스 */}
        <div style={{
          background: `${color}0a`,
          border: `1px solid ${color}33`,
          borderRadius: 10,
          padding: '20px 24px',
          marginBottom: 32,
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: color, marginBottom: 10 }}>
            📋 요약
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(200,220,255,0.85)', lineHeight: 1.8 }}>
            {article.summary}
          </p>
        </div>

        {/* 핵심 포인트 */}
        {article.keyPoints && article.keyPoints.length > 0 && (
          <div style={{
            background: 'rgba(56, 217, 245, 0.05)',
            border: '1px solid rgba(56, 217, 245, 0.2)',
            borderRadius: 10,
            padding: '20px 24px',
            marginBottom: 32,
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#38D9F5', marginBottom: 12 }}>
              💡 핵심 포인트
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {article.keyPoints.map((point, i) => (
                <li key={i} style={{
                  fontSize: 14,
                  color: 'rgba(200,220,255,0.82)',
                  lineHeight: 1.8,
                  marginBottom: 6,
                }}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 본문 섹션 */}
        {article.sections && article.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            {section.heading && (
              <h2 style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#e8f1ff',
                marginBottom: 14,
                paddingBottom: 8,
                borderBottom: '1px solid rgba(31,74,117,0.3)',
              }}>
                {section.heading}
              </h2>
            )}
            {section.image && (
              <div style={{
                margin: '16px 0 24px',
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid rgba(31,74,117,0.3)',
              }}>
                <img
                  src={section.image}
                  alt={section.heading || ''}
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            )}
            {section.paragraphs.map((para, j) => (
              <p key={j} style={{
                fontSize: 15,
                color: 'rgba(200,220,255,0.82)',
                lineHeight: 1.9,
                marginBottom: 16,
                fontWeight: 300,
              }}>
                {para}
              </p>
            ))}
          </div>
        ))}

        {/* 원문 링크 */}
        <div style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: '1px solid rgba(31,74,117,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13,
              color: color,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            원문 보기 →
          </a>
          <span style={{ fontSize: 11, color: '#5a7a9a' }}>
            번역: {new Date(article.translatedAt).toLocaleDateString('ko-KR')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function InsightsClient({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<Article | null>(null);

  // 모달 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 80 }}>
      {/* 헤더 */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 20px' }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 800,
          color: '#e8f1ff',
          marginBottom: 8,
        }}>
          Tech Insights
        </h1>
        <p style={{ fontSize: 15, color: '#5a7a9a', marginBottom: 40 }}>
          엄선된 기술 블로그의 전문 번역 — AI 인프라, 스토리지, 데이터 플랫폼의 최신 동향
        </p>

        {articles.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 0',
            color: '#5a7a9a',
          }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>📚</p>
            <p style={{ fontSize: 16 }}>아직 등록된 인사이트가 없습니다</p>
            <p style={{ fontSize: 13, marginTop: 8 }}>곧 엄선된 기술 콘텐츠가 추가됩니다</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 24,
          }}>
            {articles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelected(article)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 상세 모달 */}
      {selected && (
        <ArticleDetail article={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
