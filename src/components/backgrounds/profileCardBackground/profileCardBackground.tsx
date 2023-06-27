import React from 'react';
import Image from 'next/image';

//-----------------------------------styles
import styles from './profileCardBackground.module.css';

const ProfileCardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className={'col-12 ' + styles.profileCardBackground}>
    <Image
        className={styles.rightBackground}
        src="/profile/right.svg"
        alt="background"
        width={569.24}
        height={480.45}
        priority
    />
    <Image
        className={styles.centerBackground}
        src="/profile/center.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />
    <Image
        className={styles.leftBackground}
        src="/profile/left.svg"
        alt="background"
        width={377}
        height={377}
        priority
    />
    <Image
        className={styles.left2Background}
        src="/profile/left2.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />
    <Image
        className={styles.leftBackground}
        src="/profile/left.svg"
        alt="background"
        width={377}
        height={377}
        priority
    />
    <Image
        className={styles.left2Background}
        src="/profile/left2.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />
    <Image
        className={styles.leftBackground}
        src="/profile/left.svg"
        alt="background"
        width={377}
        height={377}
        priority
    />
    <Image
        className={styles.left2Background}
        src="/profile/left2.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />
    {children}
</div>;

export default ProfileCardBackground;