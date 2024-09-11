import React from 'react';
import EHeader from '../../components/EHeader.jsx';
import Footer from '../../components/Footer.jsx';

const EmployerHome = () => {
  return <>
    <div>
      <EHeader />
      <h2>Employer Dashboard</h2>
      <p>Welcome, manage your job listings here!</p>
      <Footer />
    </div>
  </>
};

export default EmployerHome;