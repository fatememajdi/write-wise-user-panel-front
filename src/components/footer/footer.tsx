import React from "react";
import Image from "next/image";
import Link from "next/link";

//----------------------------------------styles 
import styles from './footer.module.css';

const socialMediaItems = [
    {
        icon: '/twitter.svg',
        link: 'https://twitter.com'
    },
    {
        icon: '/linkedin.svg',
        link: 'https://www.linkedin.com'
    },
    {
        icon: '/facebook.svg',
        link: 'https://www.facebook.com'
    },
    {
        icon: '/github.svg',
        link: 'https://github.com'
    },
    {
        icon: '/dribbble.svg',
        link: 'https://dribbble.com'
    },
]

const Footer: React.FC = () => <div className={'col-lg-12 ' + styles.footerContainer}>
    <div className={styles.leftContainer}>
        <Image
            className={styles.logo}
            src="/logo2.svg"
            alt="Logo"
            width={133}
            height={15}
            priority
        />
        <Link className={styles.link} href={'/'}>Terms of Service</Link>
        <div>
            <Link className={styles.link} href={'/'}>Privacy Policy</Link>
            <Link className={styles.link} href={'/'}>about us</Link>
        </div>
    </div>
    <div className={styles.rightContainer}>
        <div className={styles.socialMediaContainer}>
            {
                socialMediaItems.map((item, index) => <a key={index} href={item.link}>
                    <Image
                        className={styles.socialIcon}
                        src={item.icon}
                        alt="social media"
                        width={24}
                        height={24}
                        priority
                    />
                </a>)
            }
        </div>
    </div>
</div>;

export default Footer;