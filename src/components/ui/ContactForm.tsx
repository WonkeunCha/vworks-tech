"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactForm() {
  const t = useTranslations("contact");
  const types = t.raw("types") as string[];

  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", type: "", message: "",
  });
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
      setForm({ name: "", company: "", email: "", phone: "", type: "", message: "" });
      setSelectedType("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{
        textAlign: "center",
        padding: "80px 32px",
        background: "var(--surface)",
        border: "1px solid var(--border-t)",
        borderRadius: 2,
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 32,
          color: "var(--teal)",
          marginBottom: 12,
        }}>
          SUBMITTED
        </div>
        <p style={{ fontSize: 14, color: "var(--text)", fontWeight: 300 }}>{t("success")}</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: 2,
    padding: "12px 16px",
    color: "var(--white)",
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: 14,
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* NAME + COMPANY */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>
            {t("name")} *
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            placeholder={locale === "ko" ? "홍길동" : "John Doe"}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
        <div>
          <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>
            {t("company")}
          </label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </div>

      {/* EMAIL + PHONE */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>
            {t("email")} *
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
        <div>
          <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>
            {t("phone")}
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </div>

      {/* INQUIRY TYPE CHIPS */}
      <div>
        <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 12 }}>
          {t("type")}
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type === selectedType ? "" : type)}
              style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 12,
                fontWeight: 400,
                padding: "7px 14px",
                border: selectedType === type ? "1px solid var(--teal)" : "1px solid var(--border)",
                borderRadius: 2,
                background: selectedType === type ? "var(--teal-dim)" : "transparent",
                color: selectedType === type ? "var(--teal)" : "var(--muted)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* MESSAGE */}
      <div>
        <label style={{ display: "block", fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--teal)", marginBottom: 8 }}>
          {t("message")} *
        </label>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={6}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--border-t)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      {/* ERROR */}
      {status === "error" && (
        <div style={{
          padding: "12px 16px",
          background: "rgba(248,113,113,0.08)",
          border: "1px solid rgba(248,113,113,0.2)",
          borderRadius: 2,
          fontSize: 13,
          color: "var(--red)",
        }}>
          {t("error")}
        </div>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          padding: "14px 32px",
          background: status === "sending" ? "var(--navy-mid)" : "linear-gradient(135deg, var(--teal), var(--cyan))",
          border: "none",
          borderRadius: 2,
          color: "var(--bg)",
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 15,
          fontWeight: 500,
          cursor: status === "sending" ? "not-allowed" : "pointer",
          transition: "opacity 0.2s",
          alignSelf: "flex-start",
        }}
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>

      <style>{`
        @media (max-width: 640px) {
          form > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </form>
  );
}

// locale을 직접 넣기 위한 wrapper
const locale = typeof window !== "undefined"
  ? document.documentElement.lang
  : "ko";
