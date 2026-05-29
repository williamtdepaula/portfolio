import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [state, handleSubmit] = useForm('xpqnnydv');

  return (
    <section className="contact-section scroll-container">
      <div className="contact-container">
        <h2 className="section-title">Get In <span className="highlight">Touch</span></h2>
        <p className="contact-description">
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        {state.succeeded ? (
          <div className="success-message">
            <h3>Thanks for reaching out!</h3>
            <p>I will get back to you as soon as possible.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {state.errors && state.errors.length > 0 && (
              <div className="form-error-alert">
                Something went wrong submitting the form. Please try again.
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                type="email" 
                name="email" 
                placeholder="your@email.com"
                required 
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="error-message" />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message"
                name="message" 
                rows="4"
                placeholder="How can I help you?"
                required 
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="error-message" />
            </div>

            <button type="submit" className="btn btn-primary submit-btn" disabled={state.submitting}>
              {state.submitting ? 'Sending...' : 'Send Message'}
            </button>

            <div className="linkedin-fallback">
              <p>Prefer to connect on LinkedIn?</p>
              <a href="https://www.linkedin.com/in/williamtristaodepaula/" target="_blank" rel="noreferrer" className="linkedin-link">
                <FaLinkedin size={20} /> Let's connect
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
