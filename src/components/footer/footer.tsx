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

    return <footer className='bg-footer-pattern bg-cover bg-no-repeat col-12 h-[345px] tablet-pro:h-[308px] mini-tablet:h-[250px] mini-tablet:max-h-fit mac:h-[272px] tablet:h-[231px] bg-seccondaryColor flex flex-col items-start py-0 pl-[134px] mini-tablet:pl-[70px] tablet:pl-[80px] mac:pl-[95px] pr-[67px] relative text-whiteText z-[501] '>

        <Image
            className="w-[339px] tablet-pro:w-[146px] tablet-pro:h-[49px] mac:w-[198px] mini-tablet:w-[140px] mini-tablet:h-[38px] mac:h-[45px] tablet:w-[140px] tablet:h-[38px] tablet:ml-[-5px] mini-tablet:ml-[-5px] mac:ml-[-8px] tablet:mt-[30px] tablet-pro:mt-[17px] mini-tablet:mt-[13px] mac:mt-[32px] h-[57px] mt-[48px] ml-[-55px] "
            src={"/logoIcon2.svg"}
            alt="Logo"
            width="0"
            height="0"
            sizes="100vw"
            loading="eager"
            priority
        />

        <div className="flex flex-row items-center justify-between w-full mt-[16px] mini-tablet:mt-[10px] mac:mt-[13px] ">
            <div className="flex w-fit lg:flex-row tablet-pro:flex-col mini-tablet:flex-col mini-tablet:items-start items-center tablet-pro:items-start text-[20px] tablet-pro:text-[17px] tablet-pro:leading-[16px] mini-tablet:text-[13px] mini-tablet:leading-[12px] tablet:text-[13px] tablet:leading-[12px] mac:text-[15px] mac:leading-[15px]  font-normal leading-[36px] underline ">
                {
                    FooterLinks.map((item, index) => <Link className="mr-[32px] mini-tablet:mb-[11px] tablet-pro:mb-[14px] mac:mr-[25px] tablet:mr-[18px] opacity-50 hover:opacity-100 "
                        key={index} href={item.route}>{item.title}</Link>)
                }
            </div>

            <div className="flex w-fit lg:flex-row tablet-pro:flex-col tablet-pro:text-[17px] tablet-pro:leading-[16px] mini-tablet:flex-col mini-tablet:items-start items-center tablet-pro:items-start text-[20px] tablet:text-[13px]  mini-tablet:text-[13px] mini-tablet:leading-[12px] tablet:leading-[12px] mac:text-[15px] mac:leading-[15px] font-normal leading-[36px] underline  ">
                {
                    LandingItems.map((item, index) => <Link className="opacity-50 tablet:ml-[18px] mini-tablet:mb-[11px] tablet-pro:mb-[14px] ml-[40px] mac:ml-[17px] sm:w-full hover:opacity-100 sm:mb-[0px] "
                        onClick={() => { if (pathname === '/') handleScroll; else router.push('/' + item.route); handleScroll }}
                        key={index} href={pathname === '/' ? item.route : '/' + item.route}>{item.title}</Link>)
                }
            </div>

        </div>


        <div className=" w-full mt-auto mb-[14px] flex flex-col items-center justify-center ">
            <div className=" w-fit flex flex-row">
                {
                    SocialMediaItems.map((item, index) => <a className="mx-[13px] mini-tablet:mx-[8px] tablet:mx-[8px] tablet-pro:mx-[11px] mac:mx-[12px] text-[43px] tablet-pro:text-[23px] mini-tablet:text-[18px] mac:text-[25px] tablet:text-[18px] opacity-50 hover:opacity-100 sm:text-[15px]" key={index} href={item.link}>{item.icon}</a>)
                }
            </div>
            <div className="mt-[24px] mini-tablet:mt-[7px] mac:mt-0 tablet:mt-[8px] tablet-pro:mt-[8px] text-[20px] mini-tablet:text-[13px] tablet:text-[13px] mac:text-[15px] tablet-pro:text-[17px] font-normal leading-[24px] mini-tablet:leading-[12px] mac:leading-[22px] tablet:leading-[12px] tablet-pro:leading-[16px] opacity-50 flex flex-row items-center sm:hidden">
                <span className="mr-[3px]">(C)</span> WriteWiseAI 2023</div>

            <div className=" w-[59%] mini-tablet:w-full mac:w-[85%] tablet:w-[95%] text-center mt-[7px] text-[12px] mini-tablet:text-[8px] mini-tablet:leading-[12px] mac:text-[11px] tablet:text-[10px] tablet-pro:text-[10px] font-normal leading-[20px] mac:leading-[15px] tablet-pro:leading-[15px] tablet:leading-[12px] ">
                The International English Language Testing System (IELTS) is a trademark of IELTS, jointly owned by the British Council, IDP: IELTS Australia, and Cambridge English Language Assessment.
                ‘WriteWiseAI’ is not affiliated with, endorsed by, or otherwise associated with IELTS or any of its owning entities.</div>

        </div>
    </footer>
};

export default Footer;