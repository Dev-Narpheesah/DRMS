import React from 'react'
import styles from  './Footer.module.css'
import { Link } from 'react-router-dom'
const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <>
            <div className={styles.Footer}>
            <footer>
        <div className={styles.contain}>
            <div className={styles.footerContent}>
                <h3>Contact Us</h3>
                <p>Email:Info@example.com</p>
                <p>Phone:+121 56556 565556</p>
                <p>Address:Your Address 123 street</p>
            </div>
            <div className={styles.footerContent}>
                <h3>Quick Links</h3>
                 <ul className={styles.list}>
                    <li><a href="#">Home</a></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/service'>Services</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                 </ul>
            </div>
            <div className={styles.footerContent}>
                <h3>Follow Us</h3>
                <ul className={styles.socialIcons}>
                 <li><a href=""><i className="fab fa-facebook"></i></a></li>
                 <li><a href=""><i className="fab fa-twitter"></i></a></li>
                 <li><a href=""><i className="fab fa-instagram"></i></a></li>
                 <li><a href=""><i className="fab fa-linkedin"></i></a></li>
                </ul>
                </div>
        </div>
        <div className={styles.bottomBar}>
            <p>&copy; Copyright  @ {date}  All rights reserved</p>
        </div>
    </footer>
            </div>
        </>
    )
}

export default Footer