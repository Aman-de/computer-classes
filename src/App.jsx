import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import RegistrationModal from './components/RegistrationModal';
import Dashboard from './components/Dashboard';

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [modalTab, setModalTab] = useState('register'); // 'register' | 'login'
  const [modalProgram, setModalProgram] = useState('Beginner Program');
  const [studentData, setStudentData] = useState(() => {
    try {
      const saved = localStorage.getItem('bcc_student_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleOpenRegister = (tab = 'register', program = 'Beginner Program') => {
    setModalTab(tab);
    setModalProgram(program);
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  const handleRegisterSuccess = (formData) => {
    setStudentData(formData);
    try {
      localStorage.setItem('bcc_student_data', JSON.stringify(formData));
    } catch (e) {
      console.error("Failed to save student session", e);
    }
    setIsRegisterOpen(false);
    // Scroll page back to top when landing on dashboard
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogOut = () => {
    setStudentData(null);
    try {
      localStorage.removeItem('bcc_student_data');
    } catch (e) {
      console.error("Failed to clear session", e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {!studentData ? (
        <LandingPage onOpenRegister={handleOpenRegister} />
      ) : (
        <Dashboard studentData={studentData} onLogOut={handleLogOut} />
      )}

      {isRegisterOpen && (
        <RegistrationModal 
          onClose={handleCloseRegister} 
          onRegisterSuccess={handleRegisterSuccess} 
          initialTab={modalTab}
          initialProgram={modalProgram}
        />
      )}
    </>
  );
}

export default App;
