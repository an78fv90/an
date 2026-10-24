export default function F() {
  return (<main className="mx-auto max-w-md px-6 pb-20 pt-40"><h1 className="font-display text-5xl">Reset password</h1>
    <p className="mt-3">Enter your email and we'll send a reset link. Connect an email provider (Resend, SES) in <code>services/mail.ts</code> to enable sending.</p>
    <input type="email" aria-label="Email" className="mt-6 w-full rounded-xl border border-ink/20 p-3" /><button className="mt-4 w-full rounded-full bg-ink py-3 text-plaster">Send link</button></main>);
}
