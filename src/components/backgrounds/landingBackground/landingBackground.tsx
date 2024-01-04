import dynamic from 'next/dynamic';
import React from "react";

//-------------------------------------------styles
import '../../../styles/global.css';

//-------------------------------------------components
const LandingHeader = dynamic(() => import("@/components/landingHeader/landingHeader"));


const LandingBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [logedIn, changeLogedIn] = React.useState<boolean>(false);

    React.useEffect(() => {
        const item = localStorage.getItem('user');
        if (item)
            changeLogedIn(true);
        else
            changeLogedIn(false);
    }, [])

    return <div className='col-12 bg-hero-pattern bg-cover bg-no-repeat relative z-[501] overflow-hidden min-h-fit sm:bg-mobile-hero-pattern '>
        <header><LandingHeader logedIn={logedIn} landing /></header>
        {children}
    </div >
};

export default LandingBackground;