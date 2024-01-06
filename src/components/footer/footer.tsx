'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

//----------------------------------------------------------------icons
import { IoLogoFacebook, IoLogoLinkedin } from 'react-icons/io';
import { AiFillInstagram } from 'react-icons/ai';
import { FaRegCopyright } from 'react-icons/fa';

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
        };
    }, []);

    return <footer className='col-12 h-[267px] bg-seccondaryColor flex flex-row items-center justify-between py-0 px-[190px] relative text-whiteText sm:h-[184px] sm:px-[17px] sm:overflow-hidden sm:z-[501] '>

        <div className="flex flex-col items-start h-full pt-[26px] ">
            <Image
                className="w-[336px] h-[42px] mr-auto ml-[-80px] sm:w-[95px] sm:h-[18px] sm:ml-[-10px] "
                src={"/logoIcon2.svg"}
                alt="Logo"
                width="0"
                height="0"
                sizes="100vw"
                loading="eager"
                priority
            />

            <div className="flex lg:flex-row items-center text-[20px] font-normal leading-[24px] underline mt-[24px] sm:flex-col sm:mt-[8px] sm:text-[10px] sm:leading-[24px] sm:items-start sm:whitespace-nowrap  ">
                {
                    FooterLinks.map((item, index) => <Link className="mr-[32px] opacity-50 hover:opacity-100 "
                        key={index} href={item.route}>{item.title}</Link>)
                }
            </div>

            <div className="mt-[64px] text-[20px] font-normal leading-[24px] opacity-50 flex flex-row items-center sm:hidden ">
                <FaRegCopyright fontSize={25} style={{ marginRight: 7 }} className="sm:hidden" /> WriteWiseAI 2023</div>

        </div>

        <div className="flex items-start h-full flex-wrap max-w-[333px] min-w-[333px] pt-[58px] text-[20px] font-normal leading-[22.18px] underline pb-[70px] sm:relative sm:pt-[45px] sm:leading-[24px] sm:text-[10px] sm:mt-[8px] ">
            {
                LandingItems.map((item, index) => <Link className="opacity-50 lg:mb-[24px] min-w-[160px] sm:w-full hover:opacity-100 sm:mb-[0px] "
                    onClick={() => { if (pathname === '/') handleScroll; else router.push('/' + item.route); handleScroll }}
                    key={index} href={pathname === '/' ? item.route : '/' + item.route}>{item.title}</Link>)
            }
            <div className="w-[160px] flex flex-row mt-[11px] sm:absolute sm:right-[7px] sm:bottom-[40px] ">
                {
                    SocialMediaItems.map((item, index) => <a className="min-w-[50px] text-[30px] opacity-50 hover:opacity-100 sm:text-[15px] sm:min-w-[20px] " key={index} href={item.link}>{item.icon}</a>)
                }
            </div>
            <div className="hidden sm:flex flex-row items-center absolute right-[87px] bottom-[23px] opacity-50 leading-[24px] font-normal text-[10px] mt-[10px] ">
                <FaRegCopyright className="text-[25px] mr-[5px] sm:text-[12px] " /> WriteWiseAI 2023</div>
        </div>

    </footer>
};

export default Footer;