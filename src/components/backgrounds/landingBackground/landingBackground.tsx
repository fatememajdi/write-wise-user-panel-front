import React from "react";

//-------------------------------------------styles
import styles from './landingBackground.module.css';
import LandingHeader from "../../landingHeader/landingHeader";
import '../../../styles/global.css';

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
    </div>
};

export default LandingBackground;