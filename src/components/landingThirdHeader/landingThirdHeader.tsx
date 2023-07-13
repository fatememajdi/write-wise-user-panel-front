import React from "react";
import Image from "next/image";
import Link from "next/link";

//-------------------------------------styles
import styles from './landingThirdHeader.module.css';
import SecondStyles from '../landingHeader/landingHeader.module.css';

const headerItems = [
    {
        title: 'Home',
        route: '/#section-1'
    },
    {
        title: 'Features',
        route: '/#section-3'
    },
    {
        title: 'Pricing',
        route: '/#section-4'
    },
    {
        title: 'Signup',
        route: '/'
    }
];


const LandingThirdHeader: React.FC = () => {
   
    return (<div className={styles.headerCard}>
        <div className={SecondStyles.headerItemsContainer}>
            <Image
                className={SecondStyles.headerLogo}
                src="/logo.svg"
                alt="Logo"
                width={133}
                height={15}
                priority
                loading="eager" 
            />
            {
                headerItems.map(
                    (item, index) => <Link href={item.route} key={index} className={SecondStyles.headerItem}>{item.title}</Link>)
            }
        </div>
    </div >)
};

export default LandingThirdHeader;