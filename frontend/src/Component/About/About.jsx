import React from 'react';
import './About.css';

const About = () => {
  const handleJoinUsClick = () => {
    alert('Thank you for your interest! We will get in touch with you soon.');
  };

  return (
    <div className="about-us">
      <div className="us">
        <img src="about.jpeg" alt="About Us" />
      </div>
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          At Relief, we believe that disasters can strike at any moment, leaving communities devastated and in need of urgent support. That's why we created a platform that streamlines disaster response and connects volunteers and resources with those who need them most.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide a comprehensive framework for disaster relief efforts, enabling swift and effective response and recovery. We aim to harness the power of technology and collaboration to make a meaningful difference in the lives of individuals affected by disasters.
        </p>
        <h2>Our Vision</h2>
        <p>
          Our vision is to build a world where disaster response is swift, efficient, and compassionate. We envision a future where communities are resilient, and individuals are empowered to rebuild and thrive in the face of adversity.
        </p>
        <h2>How We Work</h2>
        <p>
          Our platform is designed to facilitate seamless coordination between disaster response teams, volunteers, and resource providers. By leveraging cutting-edge technology and a robust network of partners, we ensure that aid reaches those who need it most, quickly and efficiently.
        </p>
        <h2>Our Values</h2>
        <ul>
          <li><strong>Compassion:</strong> We care deeply about the well-being of individuals affected by disasters and are committed to providing support with empathy and kindness.</li>
          <li><strong>Collaboration:</strong> We believe that collective action is key to effective disaster response and recovery.</li>
          <li><strong>Innovation:</strong> We harness the power of technology to streamline disaster response and improve outcomes.</li>
          <li><strong>Resilience:</strong> We empower communities to rebuild and thrive in the face of adversity.</li>
        </ul>
        <h2>Join Us</h2>
        <p>
          If you share our passion for making a difference in the lives of others, join us in our mission to revolutionize disaster response and recovery. Together, we can build a more resilient world.
        </p>
        <button className="join-us-button" onClick={handleJoinUsClick}>Join Us</button>
      </div>
    </div>
  );
};

export default About;
