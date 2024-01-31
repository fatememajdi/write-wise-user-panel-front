/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

//----------------------------------------------------------------icons
import { IoLogoLinkedin } from 'react-icons/io';
import { AiFillInstagram } from 'react-icons/ai';
import { FaRegCopyright, FaFacebook } from 'react-icons/fa';

//----------------------------------------------------------------social media items
const SocialMediaItems = [
    {
        icon: <IoLogoLinkedin />,
        link: 'https://www.linkedin.com'
    },
    {
        icon: <FaFacebook />,
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

    return <footer className='col-12 h-[345px] bg-seccondaryColor flex flex-col items-start py-0 pl-[134px] pr-[67px] relative text-whiteText z-[501] '>

        <Image
            className="w-[339px] h-[57px] mt-[48px] ml-[-55px] "
            src={"/logoIcon2.svg"}
            alt="Logo"
            width="0"
            height="0"
            sizes="100vw"
            loading="eager"
            priority
        />

        <div className="flex flex-row items-center justify-between w-full mt-[16px] ">
            <div className="flex w-fit lg:flex-row  items-center text-[20px]  font-normal leading-[36px] underline ">
                {
                    FooterLinks.map((item, index) => <Link className="mr-[32px] tablet:mr-[20px] tablet:mb-[6px] opacity-50 hover:opacity-100 "
                        key={index} href={item.route}>{item.title}</Link>)
                }
            </div>

            <div className="flex w-fit lg:flex-row  items-center text-[20px] font-normal leading-[36px] underline  ">
                {
                    LandingItems.map((item, index) => <Link className="opacity-50 tablet:mb-[6px] ml-[40px] sm:w-full hover:opacity-100 sm:mb-[0px] "
                        onClick={() => { if (pathname === '/') handleScroll; else router.push('/' + item.route); handleScroll }}
                        key={index} href={pathname === '/' ? item.route : '/' + item.route}>{item.title}</Link>)
                }
            </div>

        </div>


        <div className=" w-full mt-auto mb-[14px] flex flex-col items-center justify-center ">
            <div className=" w-fit flex flex-row">
                {
                    SocialMediaItems.map((item, index) => <a className="mx-[13px] text-[43px] opacity-50 hover:opacity-100 sm:text-[15px]" key={index} href={item.link}>{item.icon}</a>)
                }
            </div>
            <div className="mt-[24px] text-[20px] font-normal leading-[24px] opacity-50 flex flex-row items-center sm:hidden tablet:hidden ">
                <FaRegCopyright fontSize={25} style={{ marginRight: 7 }} className="sm:hidden" /> WriteWiseAI 2023</div>

            <div className=" col-lg-7 text-center mt-[7px] text-[12px] font-normal leading-[20px] ">
                The International English Language Testing System (IELTS) is a trademark of IELTS, jointly owned by the British Council, IDP: IELTS Australia, and Cambridge English Language Assessment.
                ‘WriteWiseAI’ is not affiliated with, endorsed by, or otherwise associated with IELTS or any of its owning entities.</div>

        </div>
    </footer>
};

export default Footer;