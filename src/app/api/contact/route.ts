import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !message) {
    return NextResponse.json({ error: "Chybí povinné údaje." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Peťanovi Projekty <onboarding@resend.dev>",
    to: "petr.trejbal14@seznam.cz",
    replyTo: email || undefined,
    subject: `Nová zpráva od ${name}`,
    html: `
      <div style="font-family:monospace;background:#0F2B47;color:#E3E3E3;padding:2rem;border:1px solid #1E3A5F;">
        <h2 style="color:#FBBF24;margin-bottom:1rem;">Nová zpráva z webu</h2>
        <p><strong style="color:#C2C2C2;">JMÉNO:</strong> ${name}</p>
        <p><strong style="color:#C2C2C2;">EMAIL:</strong> ${email || "neuvedeno"}</p>
        <hr style="border-color:#1E3A5F;margin:1rem 0;" />
        <p style="white-space:pre-wrap;">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Nepodařilo se odeslat." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
