"use client";

import { useState, type FormEvent } from "react";
import { contact, serviceOptions } from "../content";

type Errors = Partial<Record<"name" | "email" | "business", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// There's no server yet, so sending opens the visitor's email app with the
// message already written. Later, swap this for a form service (Formspree,
// Resend, etc.) or a Next.js Server Action to receive messages directly.
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ text: string; error?: boolean } | null>(null);

  function clearError(field: keyof Errors) {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const name = String(d.get("name") ?? "").trim();
    const email = String(d.get("email") ?? "").trim();
    const phone = String(d.get("phone") ?? "").trim();
    const business = String(d.get("business") ?? "").trim();
    const service = String(d.get("service") ?? "");
    const message = String(d.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!email) next.email = "Enter your email so we can reply.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter an email like name@example.com.";
    if (!business) next.business = "Tell us what kind of business you run.";
    setErrors(next);

    const firstInvalid = (["name", "email", "business"] as const).find((k) => next[k]);
    if (firstInvalid) {
      setStatus({ text: "Check the highlighted fields and try again.", error: true });
      (form.elements.namedItem(firstInvalid) as HTMLInputElement | null)?.focus();
      return;
    }

    const lines = [`Name: ${name}`, `Email: ${email}`];
    if (phone) lines.push(`Phone: ${phone}`);
    lines.push(`Business: ${business}`, `Looking for: ${service}`);
    if (message) lines.push("", message);
    const body = lines.join("\n");

    const subject = `Free call request from ${name}`;
    window.location.href =
      `mailto:${contact.email}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setStatus({
      text: `Your email app should open with the message ready to send. If it doesn't, email us at ${contact.email}.`,
    });
  }

  const fieldProps = (field: keyof Errors) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `f-${field}-error` : undefined,
    onChange: () => clearError(field),
  });

  const errorText = (field: keyof Errors) =>
    errors[field] ? (
      <p className="field-error" id={`f-${field}-error`}>
        {errors[field]}
      </p>
    ) : null;

  return (
    // action/method are a fallback if someone submits before the page's JS has loaded
    <form
      className="contact-form"
      noValidate
      onSubmit={onSubmit}
      action={`mailto:${contact.email}`}
      method="post"
      encType="text/plain"
    >
      <div className={`field${errors.name ? " has-error" : ""}`}>
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" type="text" autoComplete="name" required {...fieldProps("name")} />
        {errorText("name")}
      </div>

      <div className={`field${errors.email ? " has-error" : ""}`}>
        <label htmlFor="f-email">Email</label>
        <input id="f-email" name="email" type="email" autoComplete="email" required {...fieldProps("email")} />
        {errorText("email")}
      </div>

      <div className="field">
        <label htmlFor="f-phone">
          Phone <span className="optional">(optional)</span>
        </label>
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className={`field${errors.business ? " has-error" : ""}`}>
        <label htmlFor="f-business">What kind of business do you run?</label>
        <input
          id="f-business"
          name="business"
          type="text"
          autoComplete="organization"
          placeholder="e.g. Dental clinic"
          required
          {...fieldProps("business")}
        />
        {errorText("business")}
      </div>

      <div className="field">
        <label htmlFor="f-service">What do you need help with?</label>
        <select id="f-service" name="service" defaultValue={serviceOptions[0]}>
          {serviceOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-message">
          Anything else we should know? <span className="optional">(optional)</span>
        </label>
        <textarea id="f-message" name="message" rows={4} />
      </div>

      <button className="btn btn-dark" type="submit">
        Send message
      </button>

      <p className={`form-status${status?.error ? " is-error" : ""}`} role="status" aria-live="polite">
        {status?.text}
      </p>
    </form>
  );
}
