/* eslint-disable react/jsx-key */
import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';

//--------------------------------------styles
import styles from './essay.module.css';

//--------------------------------------components
import { useMultiStepForm } from "@/components/multiStepForm/useMultiStepForm";
import Input from "@/components/input/input";

//--------------------------------------icons
import { Reload } from "../../../public";
import { MdEdit } from 'react-icons/md';


interface _props {
    changeTabBarLoc: any,
    tabBarLoc: boolean
}

const Essay: React.FC<_props> = ({ tabBarLoc, changeTabBarLoc }) => {

    const [type, setType] = React.useState('general_task_1');
    const { next, currentStepIndex, step } = useMultiStepForm([<ChooseType changeType={ChangeType} />, <Writing type={type} changeTabBarLoc={changeTabBarLoc} />])
    function ChangeType(type: string) {
        setType(type);
        next();
    }

    return <div className={'col-12 ' + styles.essayContainer}>
        {step}
    </div>;
};

export default Essay;

interface chooseTypeProps {
    changeType: any
}

const types = [
    {
        label: 'Gen Task 1',
        value: 'general_task_1'
    },
    {
        label: 'Ac Task 1',
        value: 'academic_task_1'
    },
    {
        label: 'Task 2',
        value: 'general_task_2'
    },
]

const ChooseType: React.FC<chooseTypeProps> = ({ changeType }) => {

    const [teste, testtt] = React.useState(false);

    return <div className={'col-12 ' + styles.chooseTypeContainer}>
        <div className={teste ? styles.diver : styles.chooseTypeTitle}>
            Choose your essay type:
        </div>
        <div className={styles.typesContainer}>
            {types.map((item, index) =>
                <div
                    onClick={() => changeType(item.value)}
                    // onClick={() => testtt(true)}
                    className={styles.typeCard}
                    key={index}>{item.label}</div>
            )}
        </div>
    </div>;
};

interface writingProps {
    type: string;
    changeTabBarLoc: any
}

const Writing: React.FC<writingProps> = ({ type, changeTabBarLoc }) => {

    const [generateWriting, changeGenerateWriting] = React.useState(false);

    return <Formik
        initialValues={{
            topic: '',
            body: ''
        }}
        // validationSchema={EmailValidationSchema}
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

                <div className={styles.wriritngTitle}>{types.find(item => item.value === type)?.label}</div>

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
                        <Reload />Generate
                    </button>

                    {
                        generateWriting &&
                        <button className={styles.editButton}>
                            <MdEdit style={{ fontSize: 45 }} />
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
                        onClick={() => changeTabBarLoc(true)}
                        className={styles.scoreButton}>
                        Score
                    </button>
                </div>

            </form>
        )}
    </Formik>;
};