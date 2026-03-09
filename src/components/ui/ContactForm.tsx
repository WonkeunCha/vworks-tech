"use client";

import { useState } from "react";

const TYPES = ["VAST Data 스토리지", "HPC 인프라", "AI 컴퓨팅", "Dell 서버 공급", "보안 아키텍처", "기술지원/유지보수", "기타 문의"];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [selectedType, setSelectedType] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: selectedType }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "", message: "" });
      setSelectedType("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "80px 32px", background: "var(--surface)", border: "1px solid var(--border-t)", borderRadius: 2 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "var(--teal)", marginBottom: 12 }}>SUBMITTED</div>
        <p style={{ fontSize: 14, color: "var(--text)", fontWeight: 300 }}>문의가 접수되었습니다. 1~2 영업일 내로 연락드리겠습니다.</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 2,
    padding: "12px 16px", color: "var(--white)", fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: 14, fontWeight: 300, outline: "none", transition: "border-color 0.2s",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>성함 *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="홍길동"
            onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
        </div>
        <div>
          <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>회사명</label>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>이메일 *</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
        </div>
        <div>
          <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>연락처</label>
          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 12 }}>문의 유형</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TYPES.map((type) => (
            <button key={type} type="button" onClick={() => setSelectedType(type === selectedType ? "" : type)}
              style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, fontWeight: 400, padding: "7px 14px",
                border: selectedType === type ? "1px solid var(--teal)" : "1px solid var(--border)", borderRadius: 2,
                background: selectedType === type ? "var(--teal-dim)" : "transparent",
                color: selectedType === type ? "var(--teal)" : "var(--muted)", cursor: "pointer" }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>문의 내용 *</label>
        <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={6}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} />
      </div>

      {status === "error" && (
        <div style={{ padding: "12px 16px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 2, fontSize: 13, color: "var(--red)" }}>
          전송에 실패했습니다. 직접 이메일로 연락해 주세요: aiden@vworks.tech
        </div>
      )}

      <button type="submit" disabled={status === "sending"}
        style={{ padding: "14px 32px", background: status === "sending" ? "var(--navy-mid)" : "linear-gradient(135deg, var(--teal), var(--cyan))",
          border: "none", borderRadius: 2, color: "var(--bg)", fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 15, fontWeight: 500, cursor: status === "sending" ? "not-allowed" : "pointer", alignSelf: "flex-start" }}>
        {status === "sending" ? "전송 중..." : "문의 전송"}
      </button>
    </form>
  );
}
