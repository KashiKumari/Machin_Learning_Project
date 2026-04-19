import React from 'react';
import './About.css';

const About = () => {
  return (
    <main className="about page">
      <div className="container">
        <h1>About the Project</h1>

        <section className="section-block">
          <h2>Project Overview</h2>
          <p>
            The Machinery Defect Prediction System is a machine learning application that predicts equipment
            defects before production issues occur. It helps manufacturing teams identify risk and act
            proactively to avoid downtime.
          </p>
        </section>

        <section className="section-block">
          <h2>Objective</h2>
          <p>
            The goal is to predict defects early in the manufacturing process so teams can address issues
            before they affect production quality or lead to costly repairs.
          </p>
        </section>

        <section className="section-block tech-block">
          <h2>Technologies Used</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>React.js</h3>
              <p>Used for building the frontend experience and interactive dashboard.</p>
            </div>
            <div className="tech-card">
              <h3>Flask</h3>
              <p>Serves the prediction API and handles communication with the model.</p>
            </div>
            <div className="tech-card">
              <h3>Scikit-learn</h3>
              <p>Provides the machine learning model and preprocessing pipeline.</p>
            </div>
          </div>
        </section>

        <section className="section-block">
          <h2>How It Works</h2>
          <div className="workflow-list">
            <div className="workflow-item">
              <h3>1. Input Parameters</h3>
              <p>User enters values for production volume, quality score, defect rate, and more.</p>
            </div>
            <div className="workflow-item">
              <h3>2. Model Processing</h3>
              <p>The backend scales inputs and sends them into the trained prediction model.</p>
            </div>
            <div className="workflow-item">
              <h3>3. Prediction Output</h3>
              <p>The system returns whether the machine is likely defective and provides confidence.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;