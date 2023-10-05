/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { Divider } from 'antd';
import { useRouter } from 'next/navigation';

//------------------------------------------------styles
import styles from './landingSection6.module.css';

//------------------------------------------------icons
import { VscCircleFilled } from 'react-icons/vsc';

//---------------------------------------------------components
import { StartLoader } from "@/components/Untitled";

const Section6: React.FC = () => {
    const router = useRouter();

    return <>
        <div className={styles.mobileTabBar} />
        <section className={styles.pricigBackground} id='section-4'>
            <div className={styles.title}>Pricing</div>
            <div className={styles.description}>
                at WriteWiseAI, we offer a simple payment structure designed to cater to your specific IELTS writing needs and budget. Whether you're seeking a simple essay<br />
                rating, personalized feedback, or an interactive AI-powered writing tutor, we have you covered. Explore our services and pricing options below:
            </div>

            <div className={'col-12 ' + styles.pricingItemsContainer}>
                <div className={'col-lg-4 col-md-4 col-12 ' + styles.leftCard}>
                    <div className={styles.leftContent + ' ' + styles.itemCard}>
                        <div className={styles.tabBar} />

                        <div className={styles.content}>
                            <div className={styles.cardTitle} style={{ marginBottom: 20, marginTop: 40 }}>
                                Claim Your Free IELTS <br />Essay Rating
                            </div>
                            <div className={styles.leftdescriptionsContainer}>
                                <ItemDescriptionCard text="Receive an overall band score and 4 criteria-specific band scores for your first essay" />
                                <ItemDescriptionCard text="Receive criteria specific analysis" />
                            </div>
                        </div>

                        <button
                            aria-label="sign up button"
                            onClick={() => {
                                router.push('/signIn');
                                StartLoader();
                            }}
                            className={styles.signUpButton}>
                            Signup now
                        </button>
                    </div>
                </div>

                <div className={'col-lg-8 col-md-8 col-12 ' + styles.rightCard}>
                    <div className={styles.tabBar} />
                    <div className={styles.cardTitle} style={{ marginTop: 25, marginBottom: 25 }}>
                        Pay-As-You-Go
                    </div>
                    <div className={styles.content} style={{ borderColor: '#626E7E', borderTopWidth: 1 }}>
                        <div className={'col-12 ' + styles.rightdescriptionsContainer}>
                            <div className={styles.descriptionsContainer} >
                                <span style={{ marginTop: 12 }}>Buy a minimum of 10 tokens or more to:</span>
                                <ItemDescriptionCard text="Get detailed feedback and actionable recommendations for just $1 per essay" />
                                <ItemDescriptionCard text="Identify areas for improvement and receive practical guidance to boost your writing skills" />
                            </div>
                            <div className={styles.divider}>
                                <Divider type="vertical" style={{ height: 70 }} />
                                OR
                                <Divider type="vertical" style={{ height: 70 }} />
                            </div>
                            <Divider className={styles.mobileDivider} plain>or</Divider>
                            <div className={styles.descriptionsContainer}>
                                <ItemDescriptionCard text="Use our AI-Powered Writing Tutor support for just $3 per essay" />
                                <ItemDescriptionCard text="Flexibility to use the writing tutor only when needed" />
                                <ItemDescriptionCard text="Unlock the power of our interactive AI writing tutor for real-time guidance and suggestions" />
                                <ItemDescriptionCard text="Develop strong essay structures, enhance coherence and cohesion, and improve vocabulary and grammar" />
                                <ItemDescriptionCard text="Fine-tune your arguments to excel in your IELTS writing" />
                            </div>
                        </div>
                    </div>
                    <button
                        aria-label="sign up button"
                        onClick={() => {
                            router.push('/signIn');
                            StartLoader();
                        }}
                        className={styles.signUpButton}>
                        Signup now
                    </button>
                </div>
            </div>
        </section>
    </>
};

export default Section6;

const ItemDescriptionCard: React.FC<{ text: string }> = ({ text }) => <div className={styles.itemDescriptionCard}>
    <VscCircleFilled className={styles.circleIcon} />
    <span>{text}</span>
</div>;
