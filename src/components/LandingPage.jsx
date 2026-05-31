import React, { useState } from 'react';
import { 
  Monitor, 
  Code, 
  Terminal, 
  Database, 
  CheckCircle, 
  ShieldCheck, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  TrendingUp,
  BookOpen,
  Calculator
} from 'lucide-react';

export default function LandingPage({ onOpenRegister }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const programs = [
    {
      id: "beginner",
      title: "Full Computer Course (Beginner)",
      subtitle: "Basic Computer Skills & Tally Prime GST",
      duration: "2 Months (80 Hours)",
      standardFee: "₹6,000 (Offline)",
      icon: <Calculator size={24} />,
      badge: "Best for Accounts & Office Jobs",
      desc: "Learn everyday office work, prepare calculations, and learn business bookkeeping that companies look for.",
      courses: [
        { name: "Tally Prime Accounting", details: "Learn bills, GST calculation, sales entry, ledger management, and profit logs." },
        { name: "Advanced MS Excel", details: "Learn Excel calculations, dynamic charts, student filters, and pivot math reports." },
        { name: "MS Word Documents", details: "Learn how to write formal letters, resumes, print formats, and corporate reports." },
        { name: "MS PowerPoint Slides", details: "Design presentation slides for company meetings, school projects, and pitches." },
        { name: "Google Cloud Tools", details: "Learn online documents sharing, Google Drive backup, and online Google Sheets." }
      ]
    },
    {
      id: "advanced",
      title: "Full Computer Course (Advanced)",
      subtitle: "Web Development, Python & Data Science",
      duration: "3 Months (120 Hours)",
      standardFee: "₹15,000 (Offline)",
      icon: <Code size={24} />,
      badge: "Best for Software & Tech Careers",
      desc: "Learn to build websites, write computer code scripts, analyze business data, and use AI prompts.",
      courses: [
        { name: "Web Development", details: "Build websites using HTML, CSS, JavaScript core, and interactive React libraries." },
        { name: "Python Coding Core", details: "Learn computer programming logic, loops, variable rules, and custom scripts." },
        { name: "Databases & SQL", details: "Learn tables, write queries to search data, and join database metrics." },
        { name: "Data Analytics", details: "Clean raw data spreadsheets and make Seaborn visual graphs using Pandas." },
        { name: "AI Prompt Engineering", details: "Connect GPT code scripts and use smart chat instructions to write code." }
      ]
    }
  ];

  const testimonials = [
    {
      name: "Ravi Kumar",
      role: "Office Assistant",
      location: "Patna",
      text: "I registered online for the Beginner Course. The lessons are very simple. After creating my portal account, I joined the online class and easily got an office data job.",
      initials: "RK"
    },
    {
      name: "Shruti Sen",
      role: "Junior Web Developer",
      location: "Indore",
      text: "Advanced computer classes here are excellent. The React and SQL sections explain everything. The monthly payments are very cheap and the ISO certificate helps a lot.",
      initials: "SS"
    },
    {
      name: "Pawan Verma",
      role: "Accountant Trainee",
      location: "Jaipur",
      text: "Offline centers in Jaipur charge ₹7,000 for just Tally. Here I registered online, liked the modules, and upgraded to the full course. Very simple language and practical classes.",
      initials: "PV"
    }
  ];

  const faqs = [
    {
      q: "What is included in the Full Computer Course?",
      a: "Each course plan bundles a complete library of related topics. The Beginner Course gives you Word, Excel, PowerPoint, Google Drive, and Tally Prime. The Advanced Course gives you Python coding, Web Development, SQL Database, Pandas Data, and AI Prompt tools. You can watch any lesson, anytime."
    },
    {
      q: "How does the portal registration work?",
      a: "Registering online creates your student workspace login and locks in your online discount rates. You get your active student credentials, access to the course previews, and an advisor call to guide you."
    },
    {
      q: "How can I pay for the full course?",
      a: "We offer simple payment options. You can pay the full course price at once for a bigger discount, pay in two halves, or pay a monthly installment plan. All payments go safely through Razorpay."
    },
    {
      q: "Will I get a verified computer certificate?",
      a: "Yes. Every course inside your plan library has simple online tests. Once you pass the quizzes with 50% marks, you can download your ISO 9001:2015 certified certificate to add to your resume."
    }
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="navbar">
        <div className="container navbar-container">
          <a href="#" className="logo">
            <Monitor size={22} style={{ color: 'var(--primary)', strokeWidth: 3 }} />
            Bharat<span>Computer Classes</span>
          </a>
          <ul className="nav-links">
            <li><a href="#courses" className="nav-link">Our Courses</a></li>
            <li><a href="#reviews" className="nav-link">Student Reviews</a></li>
            <li><a href="#faqs" className="nav-link">FAQs</a></li>
            <li>
              <button onClick={() => onOpenRegister('login')} className="btn btn-secondary btn-sm">
                Student Login
              </button>
            </li>
            <li>
              <button onClick={() => onOpenRegister('register')} className="btn btn-primary btn-sm">
                Register Now
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-tag">
          <span className="badge badge-secondary">
            <TrendingUp size={12} style={{ marginRight: '4px' }} /> ISO 9001:2015 Certified Center
          </span>
        </div>
        <h1>Learn Full Computer Courses & Coding Skills</h1>
        <p className="hero-desc">
          Job-ready practical classes for office work, accounting, and software development. Secure your portal registration today and start learning.
        </p>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => onOpenRegister('register')} className="btn btn-primary">
            Start Registration <ArrowRight size={18} />
          </button>
          <a href="#courses" className="btn btn-secondary">
            View Course Libraries
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-val">20K+</span>
            <span className="stat-lbl">Happy Students</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">4.9★</span>
            <span className="stat-lbl">Google Ratings</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">100%</span>
            <span className="stat-lbl">Practical Lab</span>
          </div>
        </div>
      </section>

      {/* Two Programs Cards */}
      <section id="courses" className="pricing-section container">
        <h2 className="section-title">Select Your Computer Program</h2>
        <p className="section-desc">
          Choose the class level that matches your career goal. Lock your slot online.
        </p>

        <div className="course-grid">
          {programs.map((prog) => (
            <div key={prog.id} className="glass-card course-card">
              <div className="course-header">
                <div className="course-icon-wrapper">
                  {prog.icon}
                </div>
                <span className="badge badge-accent">{prog.badge}</span>
              </div>
              
              <h3>{prog.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>
                {prog.subtitle}
              </p>
              <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>{prog.desc}</p>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <BookOpen size={14} style={{ color: 'var(--primary)' }} /> What you will learn ({prog.courses.length} Subject Bundle):
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {prog.courses.map((course, cIdx) => (
                    <div key={cIdx} style={{ display: 'flex', gap: '8px' }}>
                      <CheckCircle size={14} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{course.name}</strong>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{course.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Length: <strong>{prog.duration}</strong></span>
                <span>Offline Fee: {prog.standardFee}</span>
              </div>

              <button 
                onClick={() => onOpenRegister('register', prog.title)} 
                className="btn btn-primary btn-full"
                style={{ marginTop: 'auto' }}
              >
                Book Seat Online
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Student Reviews */}
      <section id="reviews" className="extra-section container">
        <h2 className="section-title">What Students Say</h2>
        <p className="section-desc">Real feedback from students who took our computer classes to improve their jobs.</p>
        
        <div className="testimonial-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card testimonial-card">
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-user">
                <div className="testimonial-avatar">
                  {t.initials}
                </div>
                <div className="user-details">
                  <h4>{t.name}</h4>
                  <p>{t.role} — {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faqs" className="extra-section container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-desc">Clear details about portal fees, offline compared to online, and certs.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="glass-card" style={{ padding: '14px 20px', cursor: 'pointer', transform: 'none' }} onClick={() => setActiveFaq(isOpen ? null : idx)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '0.95rem', margin: 0, fontWeight: 600 }}>{faq.q}</h3>
                  {isOpen ? <ChevronUp size={16} style={{ color: 'var(--primary)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />}
                </div>
                {isOpen && (
                  <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '10px', lineHeight: '1.5' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="extra-section" style={{ textAlign: 'center', background: '#ffffff', padding: '32px 0', borderTop: '1px solid var(--border-color)', marginTop: '48px' }}>
        <div className="container">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Bharat Computer Classes Pvt. Ltd. All rights reserved.
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            ISO 9001:2015 Registered Academy. Noida Hub, UP - 201301.
          </p>
        </div>
      </footer>
    </div>
  );
}
