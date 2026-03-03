import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="container-fluid p-0" style={{ backgroundColor: '#b6fffa' }}>
      {/* About Us Section */}
      <div className="row g-0 align-items-center">
        <div className="col-md-6">
          <img 
            src="/images/aboutus1.png" 
            alt="About Us" 
            className="img-fluid"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6 p-5">
          <div className="p-4 rounded" style={{ backgroundColor: 'aquamarine' }}>
            <h3 className="mb-4" style={{ fontFamily: 'Anton, sans-serif', fontSize: '2.5rem', color: '#363062' }}>ABOUT US</h3>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1.1rem', lineHeight: '1.8' }}>
              At MediConnect, we are on a mission to revolutionize healthcare in the digital age. Our project is driven by the belief that access to quality healthcare should be simple, convenient, and empowering. With technology as our ally, we're dedicated to making healthcare easy and accessible for everyone. In an era where technology has transformed nearly every aspect of our lives, healthcare should be no exception. We believe that the journey to optimal health should be marked by ease, convenience, and empowerment at every turn. We are committed to leveraging the latest technological advancements to redefine the way individuals access and experience healthcare. Our mission is to break down the barriers that have historically made healthcare a complex and daunting endeavor. We envision a future where seeking medical assistance, preventive care, and wellness management is as straightforward as the tap of a screen or the click of a button. With technology as the cornerstone of our approach, we aim to put the power of healthcare back into your hands. Join us in our pursuit to simplify, enhance, and democratize healthcare for one and all.
            </p>
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="row g-0 align-items-center">
        <div className="col-md-6 p-5 order-md-2">
          <img 
            src="/images/ourvision-removebg-preview.png" 
            alt="Our Vision" 
            className="img-fluid"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6 p-5 order-md-1">
          <div className="p-4 rounded" style={{ backgroundColor: '#8E8FFA' }}>
            <h3 className="mb-4" style={{ fontFamily: 'Anton, sans-serif', fontSize: '2.5rem', color: '#363062' }}>OUR VISION</h3>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1.1rem', lineHeight: '1.8' }}>
              Our vision is to create a healthcare ecosystem where individuals have the tools and resources to take charge of their well-being. We want to provide a platform that not only helps you find the right healthcare solutions but also assists you in managing your health proactively. In this ever-evolving digital age, the healthcare landscape is undergoing a profound transformation. We understand that access to quality healthcare should not be a complex and daunting process. It should be an empowering and seamless experience that puts you in control of your health journey. At MediConnect, we envision a world where individuals are no longer passive recipients of healthcare services but active participants in their own well-being. We aim to empower you with the knowledge, tools, and support you need to make informed decisions about your health. We believe that every person has the right to be the captain of their health ship, steering it toward a healthier and happier life. Our platform is not just about finding doctors or treatments when you're already unwell; it's about guiding you in preventing illnesses, maintaining a healthy lifestyle, and making the right choices every step of the way. We are committed to offering a comprehensive set of services and resources that promote wellness, prevention, and early intervention.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="row g-0 align-items-center">
        <div className="col-md-6">
          <img 
            src="/images/contactus.png" 
            alt="Contact Us" 
            className="img-fluid"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6 p-5">
          <div className="p-4 rounded" style={{ backgroundColor: '#FDCEDF' }}>
            <h3 className="mb-4" style={{ fontFamily: 'Anton, sans-serif', fontSize: '2.5rem', color: '#363062' }}>CONTACT US</h3>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1.1rem', lineHeight: '1.8' }}>
              If you have any questions, suggestions, or inquiries, we are here to assist you. Your feedback is valuable to us, and we are committed to providing you with the best support and information. Please don't hesitate to reach out to us via email at{' '}
              <a href="mailto:mediconnect@gmail.com" className="text-decoration-none fw-bold">mediconnect@gmail.com</a>. We will make every effort to respond promptly and address your needs. Your input helps us improve our services and better serve your healthcare needs. Thank you for considering MediConnect as your trusted healthcare partner. We look forward to hearing from you.
            </p>
            <p className="mt-4 fw-bold">Best regards,<br />The MediConnect Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;