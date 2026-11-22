import type { Service } from "../content";
import { ChatIcon, SearchIcon } from "./Icons";

// Small illustrations of each service in action. Decorative, so hidden from screen readers.
export default function ServiceVisual({ kind }: { kind: Service["visual"] }) {
  return (
    <div className={`svc-visual svc-visual-${kind}`} aria-hidden="true">
      {kind === "ads" && <AdsVisual />}
      {kind === "landing" && <LandingVisual />}
      {kind === "crm" && <CrmVisual />}
      {kind === "followup" && <FollowupVisual />}
    </div>
  );
}

function AdsVisual() {
  return (
    <div className="mock-search">
      <div className="mock-searchbar">
        <SearchIcon className="mock-icon" />
        deep cleaning near me
      </div>
      <div className="mock-result is-ad">
        <span className="mock-meta">
          <b>Sponsored</b> yourbusiness.com
        </span>
        <span className="mock-title">Deep Cleaning, Booked Today | Free Quote</span>
        <span className="mock-line" />
        <span className="mock-line short" />
      </div>
      <div className="mock-result is-faded">
        <span className="mock-line mid" />
        <span className="mock-line short" />
      </div>
      <span className="mock-chip" data-float="0.6">
        <span className="ping" /> New lead
      </span>
    </div>
  );
}

function LandingVisual() {
  return (
    <div className="mock-phone-wrap">
      <div className="mock-phone">
        <span className="phone-bar wide" />
        <span className="phone-bar" />
        <span className="phone-field">Your name</span>
        <span className="phone-field">Phone number</span>
        <span className="phone-btn">Get my free quote</span>
        <span className="phone-bar thin" />
        <span className="phone-bar thin short" />
      </div>
      <span className="phone-wa" data-float="-0.5">
        <ChatIcon />
      </span>
      <span className="mock-chip mock-chip-left" data-float="0.4">
        Built for phones
      </span>
    </div>
  );
}

function CrmVisual() {
  return (
    <div className="mock-board">
      {[
        { name: "New", count: 3, leads: ["Arjun M.", "Sara K."] },
        { name: "Contacted", count: 2, leads: ["Leo P."] },
        { name: "Booked", count: 4, leads: ["Mia D.", "Omar T."] },
      ].map((col) => (
        <div className="mock-col" key={col.name}>
          <span className="mock-col-head">
            {col.name} <b>{col.count}</b>
          </span>
          <span className="mock-lead-slot" />
          {col.leads.map((l) => (
            <span className="mock-lead" key={l}>
              {l}
            </span>
          ))}
        </div>
      ))}
      <span className="mock-lead is-moving">Riya S.</span>
    </div>
  );
}

function FollowupVisual() {
  return (
    <div className="mock-chat">
      <span className="bubble bubble-in" data-chat>
        Hi, do you have any slots this week?
      </span>
      <span className="bubble bubble-out" data-chat>
        Hi Arjun! Yes, pick any time that suits you here: book.link/visit
        <small>Sent automatically</small>
      </span>
      <span className="bubble bubble-in" data-chat>
        Done, booked for Friday 11 am.
      </span>
      <span className="typing" data-chat>
        <i />
        <i />
        <i />
      </span>
      <span className="mock-chip mock-chip-sky" data-float="0.5">
        Replied in 40 sec
      </span>
    </div>
  );
}
