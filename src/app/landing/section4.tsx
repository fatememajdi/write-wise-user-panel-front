/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { Divider } from 'antd';
import { useRouter } from 'next/navigation';

//------------------------------------------------styles
import styles from './landingSection4.module.css';

//------------------------------------------------icons
import { VscCircleFilled } from 'react-icons/vsc';

const Section4: React.FC = () => {
    const router = useRouter();

    return <section className={styles.pricigBackground} id='section-4'>
        <div className={styles.title}>Pricing</div>
        <div className={styles.description}>
            At WriteWiseAI, we offer a simple payment structure designed to cater to your specific IELTS writing needs and budget.
            Whether you're seeking a simple essay rating, personalized feedback, or an interactive AI-powered writing tutor, we have you covered.
            Explore our services and pricing options below:
        </div>

        <div className={'col-12 ' + styles.pricingItemsContainer}>
            <div className={'col-lg-3 ' + styles.leftCard}>
                <div className={styles.leftContent + ' ' + styles.itemCard}>
                    <div className={'col-12 ' + styles.itemCardTopCard} />
                    <div className={styles.cardTitle} style={{ marginBottom: 39, marginTop: 90 }}>
                        Free IELTS Essay Rating
                    </div>
                    <div className={styles.leftdescriptionsContainer}>
                        <ItemDescriptionCard text="Receive an overall band score and 4 criteria-specific band scores for your essay" />
                        <ItemDescriptionCard text="No cost, unlimited usage" />
                    </div>
                    <button onClick={() => router.push('/signIn')} className={styles.signUpButton}>
                        Signup now
                    </button>
                </div>
            </div>

            <div className={'col-lg-9 ' + styles.itemCard}>
                <div className={'col-12 ' + styles.itemCardTopCard} />
                <div className={styles.cardTitle} style={{ marginTop: 44 }}>
                    Pay-As-You-Go
                </div>
                <div className={'col-12 ' + styles.rightdescriptionsContainer}>
                    <div className={styles.descriptionsContainer}>
                        <span style={{ marginTop: 12 }}>Buy a minimum of 10 tokens or more to:</span>
                        <ItemDescriptionCard text="Get detailed feedback and actionable recommendations for just $1 per essay" />
                        <ItemDescriptionCard text="Identify areas for improvement and receive practical guidance to boost your writing skills" />
                    </div>
                    <div className={styles.divider}>
                        <Divider type="vertical" style={{ height: 110 }} />
                        OR
                        <Divider type="vertical" style={{ height: 110 }} />
                    </div>
                    <div className={styles.descriptionsContainer}>
                        <ItemDescriptionCard text="Use our AI-Powered Writing Tutor support for just $3 per essay" />
                        <ItemDescriptionCard text="Flexibility to use the writing tutor only when needed" />
                        <ItemDescriptionCard text="Unlock the power of our interactive AI writing tutor for real-time guidance and suggestions" />
                        <ItemDescriptionCard text="Develop strong essay structures, enhance coherence and cohesion, and improve vocabulary and grammar" />
                        <ItemDescriptionCard text="Fine-tune your arguments to excel in your IELTS writing" />
                    </div>
                </div>
                <button onClick={() => router.push('/signIn')} className={styles.signUpButton}>
                    Signup now
                </button>
            </div>
        </div>
    </section>
};

export default Section4;

const ItemDescriptionCard: React.FC<{ text: string }> = ({ text }) => <div className={styles.itemDescriptionCard}>
    <VscCircleFilled className={styles.circleIcon} />
    <span>{text}</span>
</div>;
