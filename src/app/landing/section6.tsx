/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';

//---------------------------------------------------styles
import styles from './landingSection6.module.css';
import '../../styles/section6Select.css';

//---------------------------------------------------icons
import { FiCheck } from 'react-icons/fi';

const Section6: React.FC = () => {

    return <section className={styles.section6} id="pricing">
        <div className={styles.title}>No Monthly Commitments, Pure Flexibility</div>
        <div className={styles.description}>
            At WriteWiseAI, we have streamlined our pricing to ensure you get the<br />
            best value for your IELTS writing needs.
        </div>
        <Select
            renderValue={(selected) => {
                if (selected.length === 0) {
                    return <em>USD</em>;
                }

                return selected;
            }}
            defaultValue="USD"
            // value={'USD'}
            onChange={(e) => console.log(e)}
            displayEmpty
            inputProps={{ 'aria-label': 'gender select' }}
            className={styles.select}
        >

            <MenuItem className={styles.selectItem} value={'IRR'}>IRR</MenuItem>
            <MenuItem className={styles.selectItem} value={'AUD'}>AUD</MenuItem>
        </Select>

        <div className={'col-12 ' + styles.mainContainer}>
            <PackageCard />
            <PackageCard />
            <PackageCard off={10} />
            <PackageCard off={15} />
            <PackageCard off={20} />
        </div>
    </section>
};

export default Section6;

type _props = {
    off?: number
}

const PackageCard: React.FC<_props> = ({ off }) => {
    return <div className={styles.packageContainer}>
        {
            off &&
            <div className={styles.discountCard}>
                <span>%{off}</span>
                <span>Off</span>
            </div>
        }
        <div className={styles.packageCard}>
            <div className={styles.packageCardTitle}>Top up your wallet with:</div>
            <div className={styles.packagePrice}>$19</div>
            <div className={styles.optionsCard}><FiCheck style={{ marginRight: 7 }} />Scoring</div>
            <div className={styles.optionsCard}><FiCheck style={{ marginRight: 7 }} />Analysis</div>
            <div className={styles.optionsCard}><FiCheck style={{ marginRight: 7 }} />Insights</div>
            <div className={styles.optionsCard}><FiCheck style={{ marginRight: 7 }} />recommendations</div>
            <div className={styles.taskNumberCard}>for<span> 1 </span>IELTS writing task.</div>
            <div className={styles.subDescription}>Claimable unlimited times!</div>
        </div>
    </div>
};
