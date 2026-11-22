import Image from "next/image";
import SiteHeader from "./components/SiteHeader";
import ContactForm from "./components/ContactForm";
import Motion from "./components/Motion";
import SplitWords from "./components/SplitWords";
import ServiceVisual from "./components/ServiceVisual";
import { ArrowIcon, reasonIcons } from "./components/Icons";
import { contact, industries, reasons, services, steps } from "./content";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <Motion />

      <main id="main">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-a" aria-hidden="true" />
          <div className="hero-glow hero-glow-b" aria-hidden="true" />

          <div className="wrap hero-inner">
            <p className="hero-status">
              <span className="ping" /> Now booking free strategy calls
            </p>

            <h1 className="hero-title" id="hero-title">
              <span className="step">
                <SplitWords text="More enquiries." />
              </span>
              <span className="step">
                <SplitWords text="Faster replies." />
              </span>
              <span className="step">
                <SplitWords text="Fuller calendar." />
              </span>
            </h1>

            <div className="hero-copy">
              <p className="hero-lede">
                Media Fuel Solutions helps local and service-based businesses get more qualified enquiries
                from Google and Meta ads, then follows up automatically so those enquiries turn into
                booked appointments.
              </p>
              <div className="hero-actions">
                <a className="btn btn-icon-right" href="#contact">
                  Book a free 30-minute call
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                </a>
                <a className="link-light" href="#services">
                  See how it works
                </a>
              </div>
            </div>

            {/* Illustrative example of an automated follow-up */}
            <figure
              className="lead-demo"
              data-float="-0.4"
              aria-label="Example: a new enquiry gets an instant reply and books an appointment"
            >
              <figcaption className="lead-demo-head">
                <span className="ping" /> Example: one enquiry, handled automatically
              </figcaption>
              <ol className="lead-feed">
                <li className="lead-event">
                  <span className="lead-time">9:41</span>
                  <p className="lead-title">New enquiry from your Google ad</p>
                  <p className="lead-body">Riya S. wants a quote for a deep clean, 3-bedroom home.</p>
                </li>
                <li className="lead-event">
                  <span className="lead-time">9:41</span>
                  <p className="lead-title">Reply sent on WhatsApp</p>
                  <p className="lead-body">
                    “Hi Riya, thanks for getting in touch! Pick a time for a quick call:{" "}
                    <span className="lead-link">book.link/clean</span>”
                  </p>
                </li>
                <li className="lead-event lead-event-done">
                  <span className="lead-time">9:47</span>
                  <p className="lead-title">Appointment booked</p>
                  <p className="lead-body">Thursday, 3:00 pm. Added to your calendar.</p>
                </li>
              </ol>
            </figure>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section services" id="services" aria-labelledby="services-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="services-title" data-split>
                <SplitWords text="Everything between a click and a booking" />
              </h2>
              <p data-reveal>
                Most agencies stop once the ad gets a click. We look after the whole path: getting the
                enquiry, capturing it, and following up until it becomes an appointment.
              </p>
            </div>

            <ol className="svc-grid" data-stagger>
              {services.map((s, i) => (
                <li key={s.title} className={`svc-card${s.featured ? " svc-feature" : ""}`}>
                  <div className="svc-top">
                    <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="svc-role">{s.role}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p className="svc-desc">{s.description}</p>
                  <ul className="svc-tags" aria-label={`${s.title} includes`}>
                    {s.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <ServiceVisual kind={s.visual} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="section who" id="who" aria-labelledby="who-title">
          <div className="wrap who-head">
            <h2 id="who-title" data-split>
              <SplitWords text="Built for businesses that run on appointments" />
            </h2>
            <p data-reveal>If your customers call, book or ask for a quote before they buy, this is for you.</p>
          </div>

          <div className="marquee" data-reveal>
            <ul className="marquee-track">
              {industries.map((i) => (
                <li key={i}>{i}</li>
              ))}
              {industries.map((i) => (
                <li key={`dup-${i}`} aria-hidden="true">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="marquee marquee-reverse" aria-hidden="true" data-reveal>
            <ul className="marquee-track">
              {[...industries, ...industries].reverse().map((i, n) => (
                <li key={`rev-${n}`}>{i}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* WHY US */}
        <section className="section why" id="why-us" aria-labelledby="why-title">
          <div className="wrap why-inner">
            <div className="why-intro">
              <h2 id="why-title" data-split>
                <SplitWords text="We're new. Here's why that's good for you." />
              </h2>
              <p data-reveal>
                We don&apos;t have a long client list yet, and we won&apos;t pretend otherwise. What we do
                have is time, attention and every reason to get your results right.
              </p>
            </div>
            <ul className="why-list" data-stagger>
              {reasons.map((r) => {
                const Icon = reasonIcons[r.icon];
                return (
                  <li key={r.title} className="why-card">
                    <span className="why-icon">
                      <Icon />
                    </span>
                    <h3>{r.title}</h3>
                    <p>{r.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section process" id="process" aria-labelledby="process-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="process-title" data-split>
                <SplitWords text="How we work" />
              </h2>
              <p data-reveal>From first call to first leads in four steps.</p>
            </div>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="step-line" aria-hidden="true">
                      <span className="step-line-fill" />
                    </span>
                  )}
                  <h3 data-reveal>{s.title}</h3>
                  <p data-reveal>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact-inner">
            <div className="contact-info">
              <h2 id="contact-title" data-split>
                <SplitWords text="Let's get you more appointments" />
              </h2>
              <p data-reveal>
                Tell us a little about your business. We&apos;ll reply within one working day to set up
                your free call.
              </p>
              <ul className="contact-methods" data-stagger>
                <li>
                  <span className="contact-label">Email</span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>
                  <span className="contact-label">Phone</span>
                  <a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a>
                </li>
                <li>
                  <span className="contact-label">WhatsApp</span>
                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    Message us on WhatsApp
                  </a>
                </li>
                <li>
                  <span className="contact-label">Hours</span>
                  <span>{contact.hours}</span>
                </li>
              </ul>
            </div>
            <div data-reveal>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <a className="brand" href="#top" aria-label="Media Fuel Solutions, back to top">
            <Image src="/media-fuel-logo.png" alt="Media Fuel Solutions" width={813} height={240} className="brand-logo" />
          </a>
          <p>&copy; 2026 Media Fuel Solutions. Lead generation for local and service businesses.</p>
        </div>
      </footer>
    </>
  );
}
