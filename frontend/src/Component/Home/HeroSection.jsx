import React from "react";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className={styles.sectionHero}>
      <div className={styles.textHalf}>
        <h2>
          <span>Relief: </span>
          Coordinating Disaster Response
        </h2>
        <p>   Relief web-based application that enables disaster relief organizations to manage resources, volunteers, and affected individuals</p>
        <p>
          Relief is a disaster relief management system that streamlines
          response efforts through efficient coordination and resource
          management.
        </p>
      <button className={styles.view}><Link to='/service'>View all Services</Link></button>
      </div>
      <div className={styles.imageHalf}>
        <img src="relef.jpg" alt="Image Description" />
      </div>
    </div>
  );
}

export default HeroSection;
