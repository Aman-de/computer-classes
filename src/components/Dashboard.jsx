import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  CreditCard, 
  Award, 
  ShieldCheck, 
  Play, 
  BookOpen, 
  HelpCircle, 
  Download, 
  User, 
  Sparkles,
  Loader2,
  Video,
  FolderOpen,
  ArrowLeft,
  Volume2
} from 'lucide-react';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Dashboard({ studentData, onLogOut }) {
  const [openModule, setOpenModule] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('full'); // 'full' | 'half' | 'install' | 'trial'
  const [enrollmentState, setEnrollmentState] = useState('upgrade_options'); // 'upgrade_options' | 'upgrading_payment' | 'enrolled'
  const [selectedCourse, setSelectedCourse] = useState(null); // holds course object if playing
  const [activeLectureIdx, setActiveLectureIdx] = useState(0);
  const [showDemoAlert, setShowDemoAlert] = useState(false);

  // Curriculum data
  const syllabusData = {
    "Full Computer Course (Beginner)": [
      {
        title: "Module 1: MS Word & PowerPoint Slides (Weeks 1-4)",
        topics: [
          "Write official letters, reports, bills and resumes in MS Word",
          "Page setup, margins, headers, footers, and table printing",
          "Design slide master templates, presentations, and animations in PowerPoint",
          "Google Cloud docs: Drive backup, docs sharing, and remote cooperation"
        ]
      },
      {
        title: "Module 2: Advanced MS Excel Calculations (Weeks 5-8)",
        topics: [
          "Understanding columns, cell values, naming ranges, and basic Excel maths",
          "Excel Formulas: VLOOKUP, XLOOKUP, IF conditions, and calculations",
          "Pivot Tables & Pivot Charts: Summarize 1000+ data rows easily",
          "Excel Filters: Sort sheets, clean duplicate text, and lock sheets"
        ]
      },
      {
        title: "Module 3: Tally Prime GST Accounting (Weeks 9-12)",
        topics: [
          "Basic bookkeeping rules, ledger ledger logs, and voucher entries",
          "Inventory setting, sales/purchase bills, invoices, and stock sheets",
          "GST Audit: Calculate CGST, SGST, IGST taxes on products",
          "Generate final Profit & Loss sheets and balance sheets in Tally Prime"
        ]
      }
    ],
    "Full Computer Course (Advanced)": [
      {
        title: "Module 1: Python Coding Core & Logic (Weeks 1-4)",
        topics: [
          "Install Python compiler tools, configure VS Code editor, and run scripts",
          "Coding variables, if conditions, for/while loops, and methods",
          "Understanding lists, sets, tuples, dictionaries, and memory rules",
          "Object-Oriented Programming (OOP) classes and simple script file readings"
        ]
      },
      {
        title: "Module 2: Web Development (React & Node.js) (Weeks 5-8)",
        topics: [
          "Design web pages using HTML structure, CSS layouts, and mobile formats",
          "Interact with page elements using ES6 Javascript and React components",
          "Node.js server setups, Express routing engines, and REST endpoints",
          "SQL Database: Build relational tables, primary keys, and table joins"
        ]
      },
      {
        title: "Module 3: Data Analytics & AI Prompt Tools (Weeks 9-12)",
        topics: [
          "Clean Excel/CSV datasets using Python Pandas and NumPy math libraries",
          "Plot graphs, charts, and bar diagrams with Seaborn visual plots",
          "Structure smart AI chat prompts to generate code and data reports",
          "Host web programs on Vercel and version code logs with Git/GitHub"
        ]
      }
    ]
  };

  // Bundled library of courses unlocked after payment
  const programLibraries = {
    "Full Computer Course (Beginner)": [
      {
        id: "tally",
        title: "Tally Prime ERP & GST Accounting",
        lecturesCount: 18,
        duration: "25 Hours",
        description: "Learn GST bookkeeping, voucher logs, ledger systems, inventory trackers, and balance sheet calculations.",
        lectures: [
          "Lesson 1: Introduction to Bookkeeping & Double Entry",
          "Lesson 2: Installing Tally Prime & Creating Company Profile",
          "Lesson 3: Creating Ledgers & Group Accounts",
          "Lesson 4: Understanding Payment & Receipt Vouchers",
          "Lesson 5: Inventory Settings & Stock Items",
          "Lesson 6: Purchase & Sales Orders Configuration",
          "Lesson 7: Indian Taxation Structure (CGST, SGST, IGST)",
          "Lesson 8: Preparing Balance Sheets & GSTR-1 Reports"
        ]
      },
      {
        id: "excel",
        title: "Advanced Microsoft Excel",
        lecturesCount: 25,
        duration: "30 Hours",
        description: "Learn Excel shortcuts, lookup formulas, data validation, dynamic pivots, slicers, and macros.",
        lectures: [
          "Lesson 1: Workspace Grid Navigation & Keyboard Shortcuts",
          "Lesson 2: Absolute vs Relative Cell References",
          "Lesson 3: Math & Logical Formulas (SUM, AVERAGE, IF)",
          "Lesson 4: Lookup Masterclass (VLOOKUP, HLOOKUP, XLOOKUP)",
          "Lesson 5: Building Dynamic Pivot Tables",
          "Lesson 6: Custom Data Slicers & Timelines",
          "Lesson 7: Excel Data Validation & Flash Fill",
          "Lesson 8: Basic Macros & Sheet Protection"
        ]
      },
      {
        id: "word",
        title: "MS Word Corporate Publishing",
        lecturesCount: 10,
        duration: "12 Hours",
        description: "Create professional document formats, legal invoice layouts, automated indices, and mail merges.",
        lectures: [
          "Lesson 1: Typography Controls & Text Layouts",
          "Lesson 2: Styling Headers, Footers, and Footnotes",
          "Lesson 3: Automated Tables of Contents & References",
          "Lesson 4: Managing Complex Multi-column Grids",
          "Lesson 5: Dynamic Mail Merge Workflows",
          "Lesson 6: Building & Sharing Custom Doc Templates"
        ]
      },
      {
        id: "ppt",
        title: "MS PowerPoint Slide Master",
        lecturesCount: 12,
        duration: "15 Hours",
        description: "Design corporate slides, select color themes, align icons, and build dynamic morph animations.",
        lectures: [
          "Lesson 1: Presentation Physics & Visual Hierarchy",
          "Lesson 2: Configuring Custom Slide Masters",
          "Lesson 3: Working with Typography & Icon Sheets",
          "Lesson 4: High-end Custom Morph Transitions",
          "Lesson 5: Exporting Presentations to PDF & MP4 Videos"
        ]
      },
      {
        id: "google",
        title: "Google Workspace & Collaboration",
        lecturesCount: 8,
        duration: "10 Hours",
        description: "Learn cloud docs collaboration, Google Drive sharing rights, sheets linking, and team calendars.",
        lectures: [
          "Lesson 1: Cloud Storage Architecture on Google Drive",
          "Lesson 2: Sharing Permissions & Collaboration on Docs",
          "Lesson 3: Dynamic Real-time Sheets Collaborating",
          "Lesson 4: Setting Gmail Auto-responses & Calendar Slots"
        ]
      }
    ],
    "Full Computer Course (Advanced)": [
      {
        id: "python",
        title: "Python Coding Core & Logic",
        lecturesCount: 30,
        duration: "35 Hours",
        description: "Learn programming logic, arrays, list methods, OOP patterns, and write files reading scripts.",
        lectures: [
          "Lesson 1: Compiler Setup (VS Code, Jupyter, Anaconda)",
          "Lesson 2: Python Memory Models & Core Types",
          "Lesson 3: Loop Logic (For, While) and Complex Lists",
          "Lesson 4: Dict maps, Sets, and Tuples Operations",
          "Lesson 5: OOP: Classes, Methods, Inheritances",
          "Lesson 6: File System reading (JSON, CSV, PDFs)",
          "Lesson 7: Scripting Automated Workflows"
        ]
      },
      {
        id: "webdev",
        title: "Full-Stack Web Development",
        lecturesCount: 45,
        duration: "50 Hours",
        description: "Build interfaces using HTML, CSS, JavaScript, React components, and Node.js REST server engines.",
        lectures: [
          "Lesson 1: Responsive Grid Designs using Flexbox",
          "Lesson 2: ES6 Scripting: Async, Fetch, Promises",
          "Lesson 3: React Setup, Props, and State Management",
          "Lesson 4: React hooks: useState, useEffect",
          "Lesson 5: Express Routing & Node Environment Setup",
          "Lesson 6: REST API Design Guidelines",
          "Lesson 7: Hosting apps on Vercel and Render"
        ]
      },
      {
        id: "sql",
        title: "Relational Databases & SQL Queries",
        lecturesCount: 15,
        duration: "18 Hours",
        description: "Master SQL table creation, primary keys, relationships, aggregations, select filtering, and joins.",
        lectures: [
          "Lesson 1: Relational Schema vs Unstructured Data",
          "Lesson 2: Basic SELECT, WHERE, and LIKE filters",
          "Lesson 3: Joins Mastery (INNER, LEFT, RIGHT, OUTER)",
          "Lesson 4: Aggregate Queries (GROUP BY, HAVING)",
          "Lesson 5: Indexes & Query Speed Optimizations"
        ]
      },
      {
        id: "pandas",
        title: "Data Analytics with Pandas",
        lecturesCount: 20,
        duration: "25 Hours",
        description: "Read spreadsheets datasets, handle empty cells, group rows, and plot graphs using Pandas libraries.",
        lectures: [
          "Lesson 1: Multi-dimensional Math with NumPy arrays",
          "Lesson 2: Pandas DataFrames & Data Slicing",
          "Lesson 3: Handling Missing Values & Null Cleanups",
          "Lesson 4: Mapping Seaborn Line & Bar Graphs",
          "Lesson 5: Slicing Outliers in Jupyter Notebooks"
        ]
      },
      {
        id: "ai",
        title: "AI Prompt Engineering & LLM APIs",
        lecturesCount: 12,
        duration: "15 Hours",
        description: "Structure LLM query prompts, write OpenAI API scripts, and configure automation code helpers.",
        lectures: [
          "Lesson 1: LLM Parameters (Temperature, Top-P, Tokens)",
          "Lesson 2: Structuring Zero-shot & Few-shot Prompts",
          "Lesson 3: Python scripts connecting API endpoints",
          "Lesson 4: Building simple chat interface apps"
        ]
      }
    ]
  };

  const selectedSyllabus = syllabusData[studentData.course] || syllabusData["Full Computer Course (Beginner)"];
  const selectedLibrary = programLibraries[studentData.course] || programLibraries["Full Computer Course (Beginner)"];

  const planDetails = {
    full: {
      name: "Full Upfront Payment",
      tagline: "Best Value - Includes Online Pay Discount",
      offlinePrice: studentData.course === "Full Computer Course (Beginner)" ? 6000 : 15000,
      onlinePrice: studentData.course === "Full Computer Course (Beginner)" ? 3999 : 8999,
      discount: studentData.course === "Full Computer Course (Beginner)" ? 500 : 1000,
      finalPrice: studentData.course === "Full Computer Course (Beginner)" ? 3499 : 7999,
      terms: "Pay one time. No recurring bills.",
      benefits: ["Lifetime unlimited portal access", "Certified ISO 9001 Certificate", "Full Placement Assistance & Resume Prep", "Daily live doubt solving sessions"]
    },
    half: {
      name: "Half Payment (2 Parts)",
      tagline: "Balanced Plan - Pay over 30 days",
      offlinePrice: studentData.course === "Full Computer Course (Beginner)" ? 6000 : 15000,
      onlinePrice: studentData.course === "Full Computer Course (Beginner)" ? 4200 : 9000,
      discount: 0,
      finalPrice: studentData.course === "Full Computer Course (Beginner)" ? 2100 : 4500,
      terms: studentData.course === "Full Computer Course (Beginner)" ? "Pay ₹2,100 today, pay remaining ₹2,100 after 30 days." : "Pay ₹4,500 today, pay remaining ₹4,500 after 30 days.",
      benefits: ["Lifetime portal access", "Certified ISO 9001 Certificate", "Resume assistance", "Weekly group doubt solving support"]
    },
    install: {
      name: "3-Month Installment Plan",
      tagline: "Zero Credit Card EMI Alternative",
      offlinePrice: studentData.course === "Full Computer Course (Beginner)" ? 6000 : 15000,
      onlinePrice: studentData.course === "Full Computer Course (Beginner)" ? 4500 : 9600,
      discount: 0,
      finalPrice: studentData.course === "Full Computer Course (Beginner)" ? 1500 : 3200,
      terms: studentData.course === "Full Computer Course (Beginner)" ? "Pay ₹1,500 today, pay ₹1,500 in Month 2, and ₹1,500 in Month 3." : "Pay ₹3,200 today, pay ₹3,200 in Month 2, and ₹3,200 in Month 3.",
      benefits: ["Active billing portal access", "Certificate unlocked upon final payment", "General slack forum support", "Regular class lectures access"]
    },
    trial: {
      name: "1st Month Trial Pass",
      tagline: "Test the curriculum first",
      offlinePrice: studentData.course === "Full Computer Course (Beginner)" ? 2500 : 5000,
      onlinePrice: studentData.course === "Full Computer Course (Beginner)" ? 1499 : 2999,
      discount: 0,
      finalPrice: studentData.course === "Full Computer Course (Beginner)" ? 1499 : 2999,
      terms: "Unlocks Module 1 immediately. Upgrade to full package anytime.",
      benefits: ["Module 1 video and file resources access", "Basic platform access", "Forum participation rights"]
    }
  };

  const handleLaunchRazorpayUpgrade = async () => {
    setEnrollmentState('upgrading_payment');

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Failed to load Razorpay SDK. Please check your internet connection.');
      setEnrollmentState('upgrade_options');
      return;
    }

    const plan = planDetails[selectedPlan];
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SvrozOVRQoeUVa';

    const options = {
      key: razorpayKey,
      amount: plan.finalPrice * 100, // in paise
      currency: 'INR',
      name: 'Bharat Computer Classes',
      description: `Upgrade: ${plan.name} - ${studentData.course}`,
      prefill: {
        name: studentData.name,
        email: studentData.email,
        contact: `+91${studentData.phone}`
      },
      theme: {
        color: '#2563eb' // royal blue
      },
      handler: function (response) {
        setEnrollmentState('enrolled');
      },
      modal: {
        ondismiss: function () {
          setEnrollmentState('upgrade_options');
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        alert(resp.error.description || 'Payment failed.');
        setEnrollmentState('upgrade_options');
      });
      rzp.open();
    } catch (err) {
      alert('Could not initialize Razorpay gateway.');
      setEnrollmentState('upgrade_options');
    }
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: '80px' }}>
      {/* Header bar */}
      <header className="navbar">
        <div className="container navbar-container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); }}>
            <Monitor size={22} style={{ color: 'var(--primary)', strokeWidth: 3 }} />
            Bharat<span>Computer Classes</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '6px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600 }}>
              <User size={14} style={{ color: 'var(--primary)' }} />
              <span>{studentData.name}</span>
            </div>
            <button onClick={onLogOut} className="btn btn-secondary btn-sm">
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Section */}
      <main className="container" style={{ marginTop: '24px' }}>
        
        {/* Banner Callout for Registration Success */}
        <div className="glass-card dashboard-header">
          <div className="welcome-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-accent">Registration Verified</span>
              <span className="badge badge-secondary">₹500 Secured</span>
            </div>
            <h2>Welcome to your Learning Space!</h2>
            <p>Course Track: <strong>{studentData.course}</strong></p>
          </div>
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status: <strong>Active Portal Account</strong></span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: BCC-{(studentData.phone || '99').slice(-4)}</span>
          </div>
        </div>

        {/* Pre-purchase View: Syllabus details on left, Pricing cards on right */}
        {enrollmentState === 'upgrade_options' && !selectedCourse && (
          <div className="dashboard-grid">
            
            {/* Left: Accordion Syllabus */}
            <div className="glass-card syllabus-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', marginBottom: '16px' }}>
                <BookOpen size={20} style={{ color: 'var(--primary)' }} /> What you will learn
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px' }}>
                Click modules to view chapters outline:
              </p>

              <div className="syllabus-accordion">
                {selectedSyllabus.map((module, idx) => {
                  const isOpen = openModule === idx;
                  return (
                    <div key={idx} className="accordion-item">
                      <div className="accordion-header" onClick={() => setOpenModule(isOpen ? -1 : idx)}>
                        <div className="accordion-title">
                          <span className="accordion-number">0{idx + 1}</span>
                          <span className="accordion-name">{module.title}</span>
                        </div>
                        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                      {isOpen && (
                        <div className="accordion-body">
                          <ul className="syllabus-list">
                            {module.topics.map((topic, i) => (
                              <li key={i}>
                                <CheckCircle size={14} style={{ color: 'var(--accent)' }} />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '24px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px' }}>
                <Award size={36} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '4px', color: '#166534' }}>ISO 9001 Certificate Inclusion</h4>
                  <p style={{ fontSize: '0.8rem', color: '#14532d' }}>
                    Complete practice homework tasks and pass the program evaluations to print your certified diploma.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Payment Packages & Options */}
            <div className="glass-card upgrade-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', marginBottom: '8px' }}>
                <Sparkles size={20} style={{ color: 'var(--accent)' }} /> Unlock Full Program Library
              </h3>
              <p className="lead" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Choose your pricing setup to unlock all {selectedLibrary.length} subjects in your program library.
              </p>

              <div className="pricing-picker">
                {Object.keys(planDetails).map((planKey) => {
                  const plan = planDetails[planKey];
                  const isSelected = selectedPlan === planKey;
                  return (
                    <div 
                      key={planKey}
                      className={`pricing-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedPlan(planKey)}
                    >
                      {planKey === 'full' && (
                        <span className="option-badge">Best Online Value</span>
                      )}
                      
                      <div className="option-header">
                        <div className="option-meta">
                          <span className="option-title">{plan.name}</span>
                          <span className="option-desc">{plan.tagline}</span>
                        </div>
                        
                        <div className="option-pricing">
                          {plan.offlinePrice > 0 && (
                            <span className="option-strike">₹{plan.offlinePrice.toLocaleString('en-IN')}</span>
                          )}
                          <span className="option-amt">₹{plan.finalPrice.toLocaleString('en-IN')}</span>
                          <span className="option-period">
                            {planKey === 'full' ? 'One-time' : planKey === 'half' ? 'First Month' : planKey === 'install' ? 'per Month' : 'trial fee'}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="option-details">
                          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Terms: {plan.terms}</p>
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {plan.benefits.map((benefit, i) => (
                              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                <CheckCircle size={10} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '24px' }}>
                <button 
                  onClick={handleLaunchRazorpayUpgrade} 
                  className="btn btn-accent btn-full"
                >
                  Pay ₹{planDetails[selectedPlan].finalPrice.toLocaleString('en-IN')} via Razorpay <ArrowRight size={18} />
                </button>
              </div>

              {/* Dev Option */}
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <button 
                  onClick={() => setEnrollmentState('enrolled')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.72rem', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Skip Payment (Dev Walkthrough Option)
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} style={{ color: 'var(--accent)' }} /> Payments protected by Razorpay
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Post-Purchase: Unlocked library of courses */}
        {enrollmentState === 'enrolled' && !selectedCourse && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Your Academic Course Library</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Select any course card to open chapters and stream lectures.
                </p>
              </div>
              <span className="badge badge-accent" style={{ padding: '8px 16px', borderRadius: '8px' }}>
                Course Access Unlocked
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {selectedLibrary.map((course) => (
                <div key={course.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span className="badge badge-secondary" style={{ textTransform: 'none' }}>{course.duration}</span>
                    <span className="badge badge-accent">
                      {course.lecturesCount} Lectures
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{course.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', flexGrow: 1 }}>
                    {course.description}
                  </p>
                  
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      <span>Progress</span>
                      <span>0% Watched</span>
                    </div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: '0%', height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setSelectedCourse(course); setActiveLectureIdx(0); }} 
                    className="btn btn-primary btn-sm btn-full"
                    style={{ marginTop: 'auto' }}
                  >
                    Watch Lectures <Play size={12} style={{ fill: '#fff' }} />
                  </button>
                </div>
              ))}
            </div>

            <div className="glass-card" style={{ marginTop: '32px', background: '#f0fdf4', border: '1px dashed #16a34a', padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Award size={40} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#14532d', marginBottom: '4px' }}>ISO-9001 Certified Registration Connected</h4>
                <p style={{ fontSize: '0.8rem', color: '#166534' }}>
                  Your student record has been added on our registrar portal. Complete assignments inside the lecture console to download your diplomas.
                </p>
              </div>
              <button onClick={() => setShowDemoAlert(true)} className="btn btn-secondary btn-sm" style={{ borderColor: '#bbf7d0', color: '#166534' }}>
                Request Advisor Call
              </button>
            </div>
          </div>
        )}

        {/* Video Classroom Player Console (Optimized for Mobile) */}
        {selectedCourse && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="btn btn-secondary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <ArrowLeft size={16} /> Back to Library
              </button>
            </div>

            {/* Uses responsive flex alignment class that stacks on mobile */}
            <div className="video-layout" style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              
              {/* Left Column: Video player screen */}
              <div>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#0f172a', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1' }}>
                  <Video size={48} style={{ color: '#ffffff', opacity: 0.8 }} />
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '12px', textAlign: 'center', padding: '0 16px' }}>
                    Streaming: <strong>{selectedCourse.lectures[activeLectureIdx]}</strong>
                  </span>
                  
                  {/* Mock Video player controls */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Play size={14} style={{ fill: '#fff', color: '#fff', cursor: 'pointer' }} />
                      <span style={{ fontSize: '0.7rem', color: '#fff' }}>0:00 / 45:12</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Volume2 size={14} style={{ color: '#fff' }} />
                      <span style={{ fontSize: '0.7rem', color: '#fff', border: '1px solid #fff', padding: '2px 4px', borderRadius: '3px', cursor: 'pointer' }}>1.0x</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {selectedCourse.lectures[activeLectureIdx]}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    Active Subject: <strong>{selectedCourse.title}</strong> — {studentData.course}
                  </p>
                </div>
              </div>

              {/* Right Column: Lecture List sidebar */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '380px', overflowY: 'auto' }}>
                <h4 style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <FolderOpen size={16} style={{ color: 'var(--primary)' }} /> Course Chapters
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedCourse.lectures.map((lec, idx) => {
                    const isActive = activeLectureIdx === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveLectureIdx(idx)}
                        style={{ 
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 12px',
                          background: isActive ? '#eff6ff' : '#ffffff',
                          border: '1px solid',
                          borderColor: isActive ? 'var(--primary)' : '#e2e8f0',
                          borderRadius: '6px',
                          color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                          fontSize: '0.78rem',
                          fontWeight: isActive ? 700 : 400,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Play size={10} style={{ fill: isActive ? 'var(--primary)' : 'none', color: isActive ? 'var(--primary)' : 'var(--text-muted)', flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lec}</span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '16px' }}>
                  <button 
                    onClick={() => setShowDemoAlert(true)} 
                    className="btn btn-secondary btn-sm btn-full"
                    style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <Download size={12} /> Download Projects File (.zip)
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {showDemoAlert && (
          <div className="modal-overlay" style={{ zIndex: 1100 }} onClick={() => setShowDemoAlert(false)}>
            <div className="glass-card" style={{ maxWidth: '380px', width: '100%', padding: '20px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
              <HelpCircle size={36} style={{ color: 'var(--warning)', margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.1rem' }}>Demo Classroom Resource</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '6px 0 16px 0' }}>
                This is a mock presentation of the class workspace. Video files and download links would connect to storage buckets in the live production build.
              </p>
              <button onClick={() => setShowDemoAlert(false)} className="btn btn-primary btn-full btn-sm">
                Close Alert
              </button>
            </div>
          </div>
        )}
      </main>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.02); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
