import React from "react";
import Image from "next/image";

//-------------------------------------styles
import styles from '../../styles/dashboardBackground.module.css';

const DashboardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className={'col-12 ' + styles.dashboardBackground}>
    <Image
        className={styles.topLeftBackground}
        src="/dashboard/top-left.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />

    <Image
        className={styles.topLeft2Background}
        src="/dashboard/top-left.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />

    <Image
        className={styles.leftCenterBackground}
        src="/dashboard/left-center.svg"
        alt="background"
        width={377}
        height={377}
        priority
    />

    <Image
        className={styles.bottomCenterBack}
        src="/dashboard/bottom-center.svg"
        alt="background"
        width={462.14}
        height={401.95}
        priority
    />

    <Image
        className={styles.leftBottomBack}
        src="/dashboard/left-bottom.svg"
        alt="background"
        width={462.14}
        height={401.95}
        priority
    />

    <Image
        className={styles.bottomLeftBack}
        src="/dashboard/bottom-left.svg"
        alt="background"
        width={462.14}
        height={401.95}
        priority
    />

    <Image
        className={styles.rightCenterBack}
        src="/dashboard/right-center.svg"
        alt="background"
        width={462.14}
        height={401.95}
        priority
    />
    {children}
</div>;

export default DashboardBackground;