'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

//----------------------------------------------------------------styles 
import styles from './footer.module.css';

//----------------------------------------------------------------icons
import { IoLogoFacebook, IoLogoLinkedin } from 'react-icons/io';
import { AiFillInstagram } from 'react-icons/ai';

//----------------------------------------------------------------social media items
const SocialMediaItems = [
    {
        icon: <IoLogoLinkedin />,
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

const FooterLinks = [
    {
        title: 'Terms of Service',
        route: '/termsOfService'
    },
    {
        title: 'Privacy Policy ',
        route: '/privacyPolicy'
    },
    {
        title: 'Cookie Policy',
        route: '/cookies'
    },
    {
        title: 'Disclaimers',
        route: '/disclaimers'
    }
];

const LandingItems = [
    {
        title: 'Home',
        route: '#hero-section'
    },
    {
        title: 'Features',
        route: '#features'
    },
    {
        title: 'How it works',
        route: '#how-it-works'
    },
    {
        title: 'Pricing',
        route: '#pricing'
    },
    {
        title: 'Signup',
        route: '/singIn'
    }
];

const Footer: React.FC = () => {

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = e.currentTarget.href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const pathname = usePathname();
    const router = useRouter();


    React.useEffect(() => {
        if (typeof document != 'undefined') {
            if (window.location.hash) {
                let hash = window.location.hash;
                if (hash.length) {
                    router.push(hash);
                }
            }
        }
    }, []);

    return <footer className={'col-12 ' + styles.footer}>

        <div className={styles.leftCard}>
            <div className={styles.logoContainer}>
                <div className={styles.logoCard}>
                    <Image
                        className={styles.logo}
                        src={"/logoIcon.svg"}
                        alt="Logo"
                        width="0"
                        height="0"
                        sizes="100vw"
                        loading="eager"
                        priority
                    />
                </div>
                <span>WriteWiseAI</span>
            </div>

            <div className={styles.linksContainer}>
                {
                    FooterLinks.map((item, index) => <Link key={index} href={item.route}>{item.title}</Link>)
                }
            </div>

            <div className={styles.name}>(C) WriteWiseAI 2023</div>

        </div>

        <div className={styles.rightCard}>
            {
                LandingItems.map((item, index) => <Link onClick={() => { if (pathname === '/') handleScroll; else router.push('/' + item.route); handleScroll }}
                    key={index} href={pathname === '/' ? item.route : '/' + item.route}>{item.title}</Link>)
            }
            <div className={styles.socialMediaContainer}>
                {
                    SocialMediaItems.map((item, index) => <a key={index} href={item.link}>{item.icon}</a>)
                }
            </div>
        </div>

    </footer>
};

export default Footer;