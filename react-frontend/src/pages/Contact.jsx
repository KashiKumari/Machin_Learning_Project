import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main className="contact page">
      <div className="container contact-content">
        <section className="contact-panel">
          <h1>Contact</h1>
          <p>Have questions or want to learn more about the system? Send a quick message.</p>

          {submitted && <div className="success-message">Your message has been submitted successfully.</div>}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <button className="btn-submit" type="submit">Send Message</button>
          </form>
        </section>

        <section className="developer-details">
          <h2>Developer Info</h2>
          <div className="info-card">
            <p><strong>Name:</strong> Prahlad</p>
            <p><strong>Role:</strong> Full Stack Developer & ML Engineer</p>
            <p><strong>Project:</strong> Machinery Defect Prediction System</p>
            <p><strong>Description:</strong> A manufacturing defect prediction dashboard built with React and Flask.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;