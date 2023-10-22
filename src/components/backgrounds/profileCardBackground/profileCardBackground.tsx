import React from 'react';
import Image from 'next/image';

//-----------------------------------styles
import styles from './profileCardBackground.module.css';
import '../../../styles/global.css';

const ProfileCardBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className={'col-12 ' + styles.profileCardBackground}>
    <Image
        className={'selectBack ' + styles.rightBackground}
        src="/profile/right.svg"
        alt="background"
        width={569.24}
        height={480.45}
        loading="eager"
        priority
    />
    <Image
        className={'selectBack ' + styles.centerBackground}
        src="/profile/center.svg"
        alt="background"
        width={427.75}
        height={357}
        loading="eager"
        priority
    />
    <Image
        className={'selectBack ' + styles.leftBackground}
        src="/profile/left.svg"
        alt="background"
        width={377}
        height={377}
        loading="eager"
        priority
    />
    <Image
        className={'selectBack ' + styles.left2Background}
        src="/profile/left2.svg"
        alt="background"
        width={427.75}
        height={357}
        loading="eager"
        priority
    />
    <Image
        className={'selectBack ' + styles.leftBackground}
        src="/profile/left.svg"
        alt="background"
        width={377}
        height={377}
        loading="eager"
        priority
    />
    <Image
        className={'selectBack ' + styles.left2Background}
        src="/profile/left2.svg"
        alt="background"
        width={427.75}
        height={357}
        loading="eager"
        priority
    />
    <Image
        className={'selectBack ' + styles.leftBackground}
        src="/profile/left.svg"
        alt="background"
        width={377}
        height={377}
        loading="eager"
        priority
    />
    <Image
        className={'selectBack ' + styles.left2Background}
        src="/profile/left2.svg"
        alt="background"
        width={427.75}
        height={357}
        loading="eager"
        priority
    />
    {children}
</div>;

export default ProfileCardBackground;