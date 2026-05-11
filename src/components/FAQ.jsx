import { useState } from "react";

const faqs = [
  {
    q: "What services does Complete Healthcare provide?",
    a: "We offer a wide range of home healthcare services including doctor home visits, nursing care, physiotherapy, lab sample collection, IV therapy, wound care, and post-operative recovery support — all delivered by certified professionals to your doorstep.",
  },
  {
    q: "Are your healthcare professionals licensed?",
    a: "Yes. All our doctors, nurses, and therapists are fully licensed by the Dubai Health Authority (DHA) or the Ministry of Health and Prevention (MOHAP). You can request credentials at any time.",
  },
  {
    q: "How quickly can a doctor visit my home?",
    a: "In most cases we can arrange a same-day visit within 2–4 hours of booking. For urgent requests, our rapid-response team targets a 60-minute arrival window, subject to location and availability.",
  },
  {
    q: "Do you provide services during weekends and public holidays?",
    a: "Absolutely. Our team operates 7 days a week, 365 days a year — including all UAE public holidays. Healthcare needs don't follow a calendar, and neither do we.",
  },
  {
    q: "How can I book an appointment?",
    a: "You can book via our website, mobile app, WhatsApp, or by calling our 24/7 helpline. Once confirmed, you'll receive a notification with your professional's name, photo, and estimated arrival time.",
  },
  {
    q: "Do you accept health insurance?",
    a: "Yes, we work with most major insurance providers operating in the UAE. Please share your insurance card details at the time of booking and our team will verify your coverage before the visit.",
  },
];

const styles = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes headerIn {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .faq-wrap {
    padding: 2.5rem 1.5rem;
    max-width: 720px;
    margin: 0 auto;
    font-family: sans-serif;
  }
  .faq-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #1a7fc1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    animation: headerIn 0.4s ease forwards;
  }
  .faq-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a2340;
    text-align: center;
    margin: 0 0 0.6rem;
    animation: headerIn 0.4s 0.08s ease both;
  }
  .faq-sub {
    font-size: 14px;
    color: #6b7280;
    text-align: center;
    max-width: 420px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    animation: headerIn 0.4s 0.15s ease both;
  }
  .faq-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
  }
  .faq-item {
    border-bottom: 1px solid #e5e7eb;
    background: #fff;
    opacity: 0;
    animation: fadeSlideIn 0.45s cubic-bezier(.4,0,.2,1) forwards;
    transition: background 0.2s;
  }
  .faq-item:last-child { border-bottom: none; }
  .faq-item.open { background: #f9fafb; }

  .faq-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1rem 1.25rem;
    cursor: pointer;
    border: none;
    background: transparent;
    gap: 12px;
    text-align: left;
  }
  .faq-btn:hover { background: #f3f4f6; }

  .faq-q {
    font-size: 15px;
    font-weight: 600;
    color: #1a2340;
    transition: color 0.2s;
  }
  .faq-item.open .faq-q { color: #1a7fc1; }

  .faq-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
    font-weight: 400;
    color: #6b7280;
    transition: background 0.2s, border-color 0.2s, transform 0.35s cubic-bezier(.4,0,.2,1), color 0.2s;
    background: #fff;
    line-height: 1;
    user-select: none;
  }
  .faq-item.open .faq-icon {
    background: #1a7fc1;
    border-color: #1a7fc1;
    color: #fff;
    transform: rotate(45deg);
  }

  .faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(.4,0,.2,1);
  }
  .faq-item.open .faq-body { grid-template-rows: 1fr; }
  .faq-inner { overflow: hidden; }

  .faq-ans {
    margin: 0 1.25rem 1.1rem;
    padding: 0.5rem 0.75rem;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.7;
    border-left: 2.5px solid #1a7fc1;
    border-radius: 0 4px 4px 0;
  }

  .faq-footer {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 13px;
    color: #6b7280;
  }
  .faq-footer a {
    color: #1a7fc1;
    font-weight: 600;
    text-decoration: none;
  }
  .faq-footer a:hover { text-decoration: underline; }
`;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <style>{styles}</style>
      <div className="faq-wrap">
        <div className="faq-eyebrow">
          ⊙ Common Questions
        </div>
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-sub">
          Find answers to the most common questions about our home healthcare
          services in Dubai.
        </p>

        <div className="faq-list">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq-item${isOpen ? " open" : ""}`}
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                <button
                  className="faq-btn"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q">{faq.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-body">
                  <div className="faq-inner">
                    <div className="faq-ans">{faq.a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="faq-footer">
          Still have questions?{" "}
          <a href="#">Contact our support team</a>
        </p>
      </div>
    </>
  );
}
