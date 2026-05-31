import React, { useState } from 'react';
import { X, ShieldCheck, Loader2, ArrowRight, LogIn } from 'lucide-react';

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

export default function RegistrationModal({ onClose, onRegisterSuccess, initialTab = 'register', initialProgram = 'Full Computer Course (Beginner)' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'register' | 'login'
  const [step, setStep] = useState('form'); // 'form' | 'processing'
  
  // Registration Form State
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    program: initialProgram
  });

  // Login Form State
  const [loginData, setLoginData] = useState({
    phone: '',
    program: 'Full Computer Course (Beginner)' // allows testing both program consoles easily
  });

  const [errors, setErrors] = useState({});
  const [paymentError, setPaymentError] = useState('');

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!registerData.name.trim()) newErrors.name = 'Full Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registerData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(registerData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!registerData.phone.trim()) {
      newErrors.phone = 'Mobile Number is required';
    } else if (!phoneRegex.test(registerData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!loginData.phone.trim()) {
      newErrors.phone = 'Mobile Number is required';
    } else if (!phoneRegex.test(loginData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setPaymentError('');
    setStep('processing');

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setPaymentError('Failed to load Razorpay SDK. Please check your internet connection.');
      setStep('form');
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SvrozOVRQoeUVa';

    const options = {
      key: razorpayKey,
      amount: 50000, // ₹500 in paise
      currency: 'INR',
      name: 'Bharat Computer Classes',
      description: `Register: ${registerData.program}`,
      prefill: {
        name: registerData.name,
        email: registerData.email,
        contact: `+91${registerData.phone}`
      },
      theme: {
        color: '#2563eb' // matches var(--primary)
      },
      handler: function (response) {
        onRegisterSuccess({
          name: registerData.name,
          email: registerData.email,
          phone: registerData.phone,
          course: registerData.program, 
          registrationPaymentId: response.razorpay_payment_id
        });
      },
      modal: {
        ondismiss: function () {
          setStep('form');
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        setPaymentError(resp.error.description || 'Payment failed.');
        setStep('form');
      });
      rzp.open();
    } catch (err) {
      setPaymentError('Could not initialize Razorpay gateway.');
      setStep('form');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    onRegisterSuccess({
      name: 'Registered Student',
      email: 'student@computerclasses.in',
      phone: loginData.phone,
      course: loginData.program,
      registrationPaymentId: 'MOCK-LOGIN-AUTH'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-content" style={{ padding: '24px 32px' }}>
        <button onClick={onClose} className="modal-close" aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Tab Headers */}
        {step === 'form' && (
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
            <button 
              type="button"
              style={{ 
                flex: 1, 
                padding: '12px', 
                background: 'none', 
                border: 'none', 
                borderBottom: activeTab === 'register' ? '2.5px solid var(--primary)' : 'none',
                color: activeTab === 'register' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onClick={() => { setActiveTab('register'); setErrors({}); setPaymentError(''); }}
            >
              New Registration
            </button>
            <button 
              type="button"
              style={{ 
                flex: 1, 
                padding: '12px', 
                background: 'none', 
                border: 'none', 
                borderBottom: activeTab === 'login' ? '2.5px solid var(--primary)' : 'none',
                color: activeTab === 'login' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onClick={() => { setActiveTab('login'); setErrors({}); setPaymentError(''); }}
            >
              Student Login
            </button>
          </div>
        )}

        {step === 'form' && activeTab === 'register' && (
          <div>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="form-input"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
                {errors.name && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                  className="form-input"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
                {errors.email && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Mobile Number</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '10px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>+91</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="9876543210"
                    style={{ paddingLeft: '50px' }}
                    className="form-input"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    maxLength="10"
                    required
                  />
                </div>
                {errors.phone && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.phone}</p>}
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label" htmlFor="program">Select Course Program</label>
                <select
                  id="program"
                  name="program"
                  className="form-input"
                  style={{ background: '#ffffff', color: 'var(--text-primary)' }}
                  value={registerData.program}
                  onChange={handleRegisterChange}
                >
                  <option value="Full Computer Course (Beginner)">Full Computer Course (Beginner) — Word, Excel, Tally</option>
                  <option value="Full Computer Course (Advanced)">Full Computer Course (Advanced) — Web Dev, Data, Python</option>
                </select>
              </div>

              {paymentError && (
                <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: 'var(--danger)', borderRadius: '8px', padding: '12px', marginBottom: '20px', fontSize: '0.85rem' }}>
                  {paymentError}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '20px' }}>
                <ShieldCheck size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>Slot registration requires ₹500 fee paid securely via Razorpay.</span>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Register & Pay ₹500 <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        {step === 'form' && activeTab === 'login' && (
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Sign back into your active classroom using your registered mobile number.
            </p>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="login-phone">Registered Mobile Number</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '10px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>+91</span>
                  <input
                    type="tel"
                    id="login-phone"
                    name="phone"
                    placeholder="9876543210"
                    style={{ paddingLeft: '50px' }}
                    className="form-input"
                    value={loginData.phone}
                    onChange={handleLoginChange}
                    maxLength="10"
                    required
                  />
                </div>
                {errors.phone && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.phone}</p>}
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label" htmlFor="login-program">Course Workspace</label>
                <select
                  id="login-program"
                  name="program"
                  className="form-input"
                  style={{ background: '#ffffff', color: 'var(--text-primary)' }}
                  value={loginData.program}
                  onChange={handleLoginChange}
                >
                  <option value="Full Computer Course (Beginner)">Full Computer Course (Beginner)</option>
                  <option value="Full Computer Course (Advanced)">Full Computer Course (Advanced)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-accent btn-full">
                Login to Course Portal <LogIn size={18} style={{ marginLeft: '4px' }} />
              </button>
            </form>
          </div>
        )}

        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Loader2 size={48} className="gradient-text" style={{ margin: '0 auto 24px auto', animation: 'spin 1.5s linear infinite' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Loading Razorpay Payment</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '300px', margin: '0 auto' }}>
              Opening the transaction window. Complete your payment to activate your account.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
