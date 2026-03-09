import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="background:#050d1a;color:#e8f1ff;font-family:'Noto Sans KR',sans-serif;padding:40px;max-width:600px;margin:0 auto;">
  <div style="border:1px solid rgba(0,201,177,0.2);border-radius:4px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#0f2a4a,#1a3a5c);padding:24px;border-bottom:1px solid rgba(31,74,117,0.55);">
      <h1 style="font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:0.04em;color:#00C9B1;margin:0;">NEW INQUIRY</h1>
      <p style="font-family:monospace;font-size:11px;letter-spacing:0.15em;color:#5a7a9a;margin:4px 0 0;">VWorks Technologies — Contact Form</p>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ["성함", name],
          ["회사명", company || "—"],
          ["이메일", email],
          ["연락처", phone || "—"],
          ["문의 유형", type || "—"],
        ].map(([label, value]) => `
          <tr>
            <td style="font-family:monospace;font-size:10px;letter-spacing:0.15em;color:#5a7a9a;padding:10px 16px 10px 0;vertical-align:top;white-space:nowrap;">${label}</td>
            <td style="font-size:14px;color:#e8f1ff;padding:10px 0;font-weight:300;">${value}</td>
          </tr>
        `).join("")}
      </table>
      <div style="margin-top:24px;padding:20px;background:rgba(15,42,74,0.5);border:1px solid rgba(31,74,117,0.55);border-radius:2px;">
        <div style="font-family:monospace;font-size:10px;letter-spacing:0.15em;color:#00C9B1;margin-bottom:12px;">MESSAGE</div>
        <p style="font-size:14px;color:rgba(200,220,255,0.78);font-weight:300;line-height:1.8;white-space:pre-wrap;margin:0;">${message}</p>
      </div>
      <div style="margin-top:24px;">
        <a href="mailto:${email}" style="display:inline-block;padding:10px 24px;background:linear-gradient(135deg,#00C9B1,#38D9F5);color:#050d1a;font-size:13px;font-weight:500;text-decoration:none;border-radius:2px;">답장하기</a>
      </div>
    </div>
  </div>
</body>
</html>`;

    const autoReplyHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="background:#050d1a;color:#e8f1ff;font-family:'Noto Sans KR',sans-serif;padding:40px;max-width:600px;margin:0 auto;">
  <div style="border:1px solid rgba(0,201,177,0.2);border-radius:4px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#0f2a4a,#1a3a5c);padding:24px;border-bottom:1px solid rgba(31,74,117,0.55);">
      <h1 style="font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:0.04em;color:#00C9B1;margin:0;">문의가 접수되었습니다</h1>
      <p style="font-size:12px;color:#5a7a9a;margin:4px 0 0;">VWorks Technologies</p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:14px;color:rgba(200,220,255,0.78);font-weight:300;line-height:1.8;">${name}님, 문의해 주셔서 감사합니다.<br>담당자가 확인 후 <strong style="color:#00C9B1;">1~2 영업일 내</strong>로 연락드리겠습니다.</p>
      <div style="margin-top:24px;padding:20px;background:rgba(15,42,74,0.5);border:1px solid rgba(31,74,117,0.55);border-radius:2px;">
        <p style="font-family:monospace;font-size:10px;letter-spacing:0.15em;color:#5a7a9a;margin:0 0 8px;">CONTACT</p>
        <p style="font-size:13px;color:rgba(200,220,255,0.78);margin:0;font-weight:300;">📧 aiden@vworks.tech<br>📞 051-747-6428</p>
      </div>
    </div>
    <div style="padding:20px 32px;border-top:1px solid rgba(31,74,117,0.55);">
      <p style="font-family:monospace;font-size:10px;letter-spacing:0.1em;color:#5a7a9a;margin:0;">© 2025 VWorks Technologies | Beyond Boundaries, Built to Scale</p>
    </div>
  </div>
</body>
</html>`;

    // 관리자에게 발송
    await transporter.sendMail({
      from: `"VWorks 문의" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `[문의] ${type ? `[${type}] ` : ""}${name}님 — ${company || email}`,
      html: adminHtml,
    });

    // 발신자 자동회신
    await transporter.sendMail({
      from: `"VWorks Technologies" <${process.env.MAIL_FROM}>`,
      to: email,
      subject: "[VWorks Technologies] 문의가 접수되었습니다",
      html: autoReplyHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json({ error: "메일 전송 실패" }, { status: 500 });
  }
}
