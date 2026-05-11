import { useState } from "react";

const faqs = [
  {
    q: "What services does Corx Home Healthcare offer?",
    a: "Corx Home Healthcare provides a wide range of services including physiotherapy, nursing care, medical equipment rental, wound care, and medication management, among others.",
  },
  {
    q: "Who can benefit from Corx Home Healthcare Services?",
    a: "Our services cater to individuals of all ages who require healthcare assistance in the comfort of their own homes. This includes seniors, individuals recovering from surgery, those with chronic illnesses, and anyone in need of rehabilitation.",
  },
  {
    q: "How can I request services from Corx Home Healthcare?",
    a: "You can request our services by contacting us via phone at +971547033311 or by filling out the contact form on our website. Our team will promptly assess your needs and schedule a visit.",
  },
  {
    q: "Are your caregivers trained and certified?",
    a: "Yes, all our caregivers are highly trained, certified professionals with experience in their respective fields. We ensure that they undergo rigorous training and background checks to provide the highest quality care.",
  },
  {
    q: "What are your service hours?",
    a: "Corx Home Healthcare operates 24 hours a day, 7 days a week, including holidays. We understand that healthcare needs can arise at any time, and our team is dedicated to being there for you whenever you need us.",
  },
  {
    q: "How do I pay for Corx Home Healthcare services?",
    a: "We accept various payment methods including cash, credit/debit cards, and bank transfers. We also work with insurance providers for direct billing whenever possible. Our team will provide you with detailed payment options and assist you with any billing inquiries.",
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

  .faq-section {
    background: #f8fafc;
    padding: 60px 0;
    position: relative;
    overflow: hidden;
  }
  .faq-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 0% 0%, rgba(8, 112, 157, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(94, 182, 59, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  .faq-wrap {
    padding: 0 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
    position: relative;
    z-index: 1;
  }
  .faq-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: #08709d;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    animation: headerIn 0.4s ease forwards;
  }
  .faq-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a2340;
    text-align: center;
    margin: 0 0 0.5rem;
    animation: headerIn 0.4s 0.08s ease both;
    letter-spacing: -0.02em;
  }
  .faq-sub {
    font-size: 18px;
    color: #4b5563;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
    animation: headerIn 0.4s 0.15s ease both;
  }
  .faq-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
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
    padding: 1.5rem 2rem;
    cursor: pointer;
    border: none;
    background: transparent;
    gap: 16px;
    text-align: left;
  }
  .faq-btn:hover { background: #f9fafb; }

  .faq-q {
    font-size: 18px;
    font-weight: 700;
    color: #1a2340;
    transition: color 0.2s;
    line-height: 1.4;
  }
  .faq-item.open .faq-q { color: #08709d; }

  .faq-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 24px;
    font-weight: 300;
    color: #6b7280;
    transition: all 0.35s cubic-bezier(.4,0,.2,1);
    background: #fff;
    line-height: 1;
    user-select: none;
  }
  .faq-item.open .faq-icon {
    background: #08709d;
    border-color: #08709d;
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
    margin: 0 2rem 1.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    color: #4b5563;
    line-height: 1.8;
    border-left: 4px solid #5eb63b;
    border-radius: 0 4px 4px 0;
    background: #f3fdf5;
  }

  .faq-footer {
    text-align: center;
    margin-top: 2.5rem;
    font-size: 16px;
    color: #4b5563;
    font-weight: 500;
  }
  .faq-footer a {
    color: #08709d;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s;
  }
  .faq-footer a:hover { border-bottom-color: #08709d; }
`;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
    <section className="faq-section">
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
          <a href="/contact">Contact our support team</a>
        </p>
      </div>
    </section>
    </>
  );
}
