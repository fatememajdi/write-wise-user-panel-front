'use client';
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

//----------------------------------------------------styles
import styles from './tokenErrorCard.module.css';

//----------------------------------------------------components
const Modal = dynamic(() => import("@/components/modal/modal"));

type _props = {
    showImage: boolean,
    handleCancelImageModal: any
};

export default function TokenErrorCard({ showImage, handleCancelImageModal }: _props) {

    const router = useRouter();

    return <Modal isOpen={showImage} setIsOpen={handleCancelImageModal} key={0}>
        <div className={styles.WalletErrorCard}>
            <Image
                src='/dashboard/tokenError.svg'
                alt="no token error image"
                height='194'
                width='192'
                loading="eager"
                priority
            />
            <span>{'Sorry, you don\'t have enough tokens for this '}</span>
            <div className={styles.waaletErrorButtonsCard}>
                <button
                    type="button"
                    onClick={() => { router.push('/wallet') }}
                    aria-label="add token button"
                    className={styles.addTokenBtn}>Wallet</button>
                <button
                    type="button"
                    onClick={() => handleCancelImageModal()}
                    aria-label="close wallet modal button"
                    className={styles.okBtn}>Okay</button>
            </div>

        </div>
    </Modal>
}