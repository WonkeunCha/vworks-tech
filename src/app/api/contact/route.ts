import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, phone, subject, message } = await req.json();
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"VWorks 홈페이지" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      subject: `[문의] ${subject || '홈페이지 문의'} - ${name}`,
      html: `<p><b>이름:</b> ${name}</p><p><b>회사:</b> ${company}</p><p><b>이메일:</b> ${email}</p><p><b>연락처:</b> ${phone}</p><p><b>유형:</b> ${subject}</p><hr/><p>${message.replace(/\n/g,'<br/>')}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
