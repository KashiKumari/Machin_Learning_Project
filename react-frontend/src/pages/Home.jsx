import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <main className="home page">
      <div className="container">
        <section className="hero">
          <div className="hero-copy">
            <h1>Machinery Defect Prediction System</h1>
            <p>
              Use machine learning to identify machinery defects before they impact
              manufacturing operations. Drive quality, reduce downtime, and improve
              production efficiency with intelligent predictions.
            </p>
            <Link className="btn-primary" to="/dashboard">
              Get Started
            </Link>
          </div>
        </section>

        <section className="features">
          <h2>Core Features</h2>
          <div className="features-grid">
            <article className="feature-card">
              <h3>Real-time prediction</h3>
              <p>Receive instant feedback on defect risk for every machine cycle.</p>
            </article>
            <article className="feature-card">
              <h3>Quality monitoring</h3>
              <p>Track key manufacturing metrics to keep production quality on target.</p>
            </article>
            <article className="feature-card">
              <h3>Predictive maintenance</h3>
              <p>Schedule maintenance before faults escalate into costly breakdowns.</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;