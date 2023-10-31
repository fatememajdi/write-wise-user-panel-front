/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import ReactLoading from 'react-loading';

//---------------------------------------------------styles
import styles from './packageCard.module.css';
import '../../styles/section6Select.css';

//---------------------------------------------------icons
import { FiCheck } from 'react-icons/fi';

//---------------------------------------------------types
import { Package } from "../../../types/package";


type _props = {
    pack: Package,
    loading: boolean
}

const PackageCard: React.FC<_props> = ({ pack, loading }) => {
    return <div className={styles.packageContainer}>
        {
            pack.discountPercent > 0 &&
            <div className={styles.discountCard}>
                <span>%{pack.discountPercent}</span>
                <span>Off</span>
            </div>
        }
        {
            loading ?
                <ReactLoading className={styles.loading} type={'bubbles'} color={'#172E4A'} height={50} width={50} />
                :
                <div className={styles.packageCard}>
                    <div className={styles.packageCardTitle}>{pack.title}</div>
                    <div className={styles.packagePrice}>
                        {
                            pack.discountPercent > 0 &&
                            <span>{pack.amountWithDiscount}</span>
                        }
                        {pack.showingPrice}

                    </div>
                    <div className={styles.optionsCard}><FiCheck style={{ marginRight: 7 }} />Scoring</div>
                    <div className={styles.optionsCard}><FiCheck style={{ marginRight: 7 }} />Analysis</div>
                    <div className={styles.optionsCard}><FiCheck style={{ marginRight: 7 }} />Insights</div>
                    <div className={styles.optionsCard}><FiCheck style={{ marginRight: 7 }} />recommendations</div>
                    <div className={styles.taskNumberCard}>{pack.description}</div>
                    <div className={styles.subDescription}>{pack.subDescription}</div>
                </div>
        }
    </div>
};

export default PackageCard;