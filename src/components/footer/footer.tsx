'use client';
import React from "react";
import Link from "next/link";

//----------------------------------------------------------------styles 
import styles from './footer.module.css';

//----------------------------------------------------------------icons
import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { IoLogoFacebook } from 'react-icons/io';
import { AiFillInstagram } from 'react-icons/ai';

//----------------------------------------------------------------social media items
const socialMediaItems = [
    {
        icon: <BiLogoLinkedinSquare />,
        link: 'https://www.linkedin.com'
    },
    {
        icon: <IoLogoFacebook />,
        link: 'https://www.facebook.com'
    },
    {
        icon: <AiFillInstagram />,
        link: 'https://instagram.com'
    }
];

const Footer: React.FC = () => <div className={'col-lg-12 ' + styles.footerContainer}>
    <div className={styles.logo}>WriteWiseAI</div>
    <div className={styles.firstLineItems}>
        <Link className={styles.link} href={'/'}>Terms of Service</Link>
        <Link className={styles.link} href={'/'}>about us</Link>
    </div>

    <div className={styles.secondLineItems}>
        <Link className={styles.link} href={'/'}>Privacy Policy</Link>
        {
            socialMediaItems.map((item, index) => <a className={styles.socialIcon} href={item.link} key={index}>{item.icon}</a>)
        }
    </div>

</div>;

export default Footer;