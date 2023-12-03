import dynamic from 'next/dynamic';
import React from "react";

//-------------------------------------------styles
import styles from './landingBackground.module.css';
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

    return <div className={'col-12 ' + styles.landingBackground}>
        <LandingHeader logedIn={logedIn} landing />
        {children}
    </div >
};

export default LandingBackground;