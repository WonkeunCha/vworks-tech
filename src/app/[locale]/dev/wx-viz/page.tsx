'use client';

export default function WxVizPage() {
  return (
    <iframe
      src="/dev/wx-viz/embed.html"
      style={{
        display: 'block',
        width: '100%',
        // Navbar 64px을 뺀 뷰포트 전체 높이
        // → iframe이 충분히 길어서 푸터가 스크롤 맨 아래로 밀림
        height: 'calc(100vh - 64px)',
        border: 'none',
      }}
      title="기상해양 수치모델 가시화 플랫폼"
    />
  );
}
