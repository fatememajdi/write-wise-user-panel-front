import React, { lazy } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { loadStripe } from '@stripe/stripe-js';

//--------------------------------------styles
import styles from './essay.module.css';

//--------------------------------------components
const Slider = dynamic(() => import("@/components/slider/slider"));
const Input = lazy(() => import('@/components/input/input'));
const SelectComponents = lazy(() => import('@/components/customSelect/customSelect'));

//--------------------------------------icons
import { Reload } from "../../../../public";
import { MdEdit } from 'react-icons/md';
import { Lock } from '../../../../public/dashboard';

interface writingProps {
    changeTabBarLoc: any
    changeEndAnimation: any,
    endAnimation: boolean
}

//---------------------------------------------------------------validation
const WritingValidationSchema = Yup.object().shape({
    topic: Yup.string(),
    body: Yup
        .string()
        .required('body is required!'),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const GeneralTask1: React.FC<writingProps> = ({ changeTabBarLoc, changeEndAnimation, endAnimation }) => {

    const [generateWriting, changeGenerateWriting] = React.useState(false);

    return <Formik
        initialValues={{
            topic: '',
            body: ''
        }}
        // validationSchema={WritingValidationSchema}
        enableReinitialize
        onSubmit={async (values) => {
            // await handleEmailSignIn(values);
        }}>{({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            handleChange
        }) => (
            <form
                className={'col-12 ' + styles.writingContainer}
                onSubmit={handleSubmit}>

                <div className={styles.writingForm}>

                    <SelectComponents values={[
                        { title: 'Essay', active: false, lock: false },
                        { title: 'Score', active: false, lock: false },
                        { title: 'Analysis', active: false, lock: true },
                        { title: 'Recommendations', active: false, lock: true },
                        { title: 'WWAI Tutor', active: false, lock: true }
                    ]} selectedItem={0} className={styles.topSelect} />

                    <div className={styles.wriritngTitle}>Gen Task 1</div>

                    <div className={styles.writingSecondTitle}>
                        You should spend about 20 minutes on this task
                    </div>

                    <div className={styles.writingInputTitle}>Write about following topic :</div>

                    <div className={styles.topicInputContainer}>
                        <Input
                            style={{ width: '70%' }}
                            className={styles.topicInput}
                            onChange={handleChange}
                            placeHolder="Type your topic here..."
                            textarea
                            textarea_name='topic'
                            textarea_value={values.topic}
                            textarea_error={errors.topic && touched.topic && errors.topic}
                        />
                        <button
                            onClick={() => changeGenerateWriting(true)}
                            type="button" className={styles.generateButton}>
                            <Reload className={styles.reloadIconResponsive} />Generate
                        </button>

                        {
                            generateWriting &&
                            <button className={styles.editButton}>
                                <div><MdEdit className={styles.editIconResponsive} style={{ fontSize: 40 }} /></div>
                            </button>
                        }

                    </div>

                    <div className={styles.writingInputTitle}>Write at least 150 words.</div>

                    <div className={styles.bodyInputContainer}>
                        <Input
                            className={styles.topicInput}
                            onChange={handleChange}
                            placeHolder="Type here..."
                            textarea
                            textarea_name='body'
                            textarea_value={values.body}
                            textarea_error={errors.body && touched.body && errors.body}
                        />
                        <button
                            type="submit"
                            onClick={() => {
                                changeTabBarLoc(true);
                                setTimeout(() => {
                                    changeEndAnimation(true);
                                }, 1000);
                            }}
                            className={styles.scoreButton}>
                            <div>
                                Score
                            </div>
                        </button>
                    </div>
                </div>

                {endAnimation &&
                    <>
                        <WritingDataCard />
                        <WritingDataCard />
                        <WritingDataCard />
                    </>
                }
            </form>
        )}
    </Formik >;
};

const tabBarItems = [
    {
        title: 'Essay',
        active: true
    },
    {
        title: 'Score',
        active: true
    },
    {
        title: 'Analysis',
        active: false
    },
    {
        title: 'Recommendations',
        active: false
    },
    {
        title: 'WWAI Tutor',
        active: false
    },
]

const WritingDataCard: React.FC = () => {
    const [writingCardStep, changeWritingCardStep] = React.useState<number>(1);

    const handleClick = async (event: any) => {
        event.preventDefault();
        const { sessionId } = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ quantity: 1 })
        }).then(res => res.json())
        const stripe = await stripePromise;
        if (stripe) {
            const { error } = await stripe.redirectToCheckout({
                sessionId
            });
            console.log('stripe error : ', error);
        }
    }

    return <div className={styles.writingDataCard}>
        <div className={styles.writingDataTabBarCard}>
            {
                tabBarItems.map((item, index) =>
                    <div
                        onClick={() => {
                            changeWritingCardStep(index);
                        }}
                        style={!item.active ? { cursor: 'context-menu' } : {}}
                        className={writingCardStep === index ? styles.activeTopTabBarItemCard + ' ' + styles.topTabBarItemCard
                            : styles.topTabBarItemCard}
                        key={index} >
                        <span
                            style={!item.active ? { opacity: 0.5, cursor: 'context-menu' } : {}}>{item.title}</span>
                        {!item.active && <Lock className={styles.lockIcon} />}
                    </div>
                )
            }
        </div>

        <SelectComponents values={[
            { title: 'Essay', active: true, lock: false },
            { title: 'Score', active: true, lock: false },
            { title: 'Analysis', active: false, lock: true },
            { title: 'Recommendations', active: false, lock: true },
            { title: 'WWAI Tutor', active: false, lock: true }
        ]} 
        selectedItem={writingCardStep} className={styles.writingCardSelect} onChange={changeWritingCardStep} />

        {writingCardStep === 0 ?
            <div className={styles.writingEssayCard}>
                <div className={styles.writingScoreDate}>JAN 18</div>
                <div className={styles.writingEssayText}>
                    Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum <br />
                    est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin <br />
                    lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat <br />
                    lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos <br />
                    himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.<br />
                    Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel <br />
                    bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.<br />
                    Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a tempus aliquet.

                </div>
                <button
                    type="button"
                    aria-label="edit button"
                    className={styles.editWritingButton}>
                    <div className={styles.responsiveEditWritingButton}> <MdEdit className={styles.editWritingButtonIcon} /></div>
                </button>
            </div>
            :
            <div className={styles.writingScoreCard}>
                <div className={styles.writingScoreDate}>JAN 18</div>
                <div className={styles.writingScoresContainer}>
                    <div>
                        <div className={styles.writingScoreItemCard}>Task Achievement: 6</div>
                        <div className={styles.writingScoreItemCard}>Coherence & Cohesion: 5</div>
                        <div className={styles.writingScoreItemCard}>Lexical resource: 6</div>
                        <div className={styles.writingScoreItemCard}>Grammatical Range and accuracy: 7</div>
                    </div>

                    <div className={styles.sliderContainer}>
                        <Slider value={7} total={10} />
                    </div>
                </div>
                <div className={styles.writingScoreText}>
                    Good user<br />
                    Has operational command of the language, though with occasional inaccuracies, inappropriacies and misunderstandings in some situations. Generally handles complex language well and understands detailed reasoning.
                </div>
                <div className={styles.analusisButtonContainer}>
                    <button
                        type="button"
                        aria-label="anausis button"
                        onClick={(e) => handleClick(e)}
                        className={styles.analusisButton}>
                        Analysis
                    </button>
                </div>
            </div>
        }
    </div>
};

export default GeneralTask1;