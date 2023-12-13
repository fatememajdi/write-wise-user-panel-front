import React from 'react';

//-------------------------------------------------------------styles
import styles from './input.module.css';


interface props {
    className?: string,
    style?: any,
    textarea?: boolean,
    title?: string,
    input?: boolean,
    placeHolder?: string,
    inputtype?: string,
    input_name?: string,
    onChange?: any,
    input_value?: string,
    input_error?: any,
    textarea_name?: string,
    textarea_value?: string,
    textarea_error?: any,
    secondError?: boolean,
    disable?: boolean,
    children?: React.ReactNode
};

const Input: React.FC<props> = ({ ...props }) => {

    function onPaste(event) {
        var brRegex = /\r?\n/g;
        let paste = (event.clipboardData || window.Clipboard).getData('text/plain');
        let divText = paste.split(brRegex)

        const selection = window.getSelection();
        if (!selection.rangeCount)
            return false;

        let div = document.createElement('textarea');
        divText.forEach(text => {
            div.appendChild(document.createTextNode(text));
            div.appendChild(document.createElement("br"));
        });

        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(div);

        event.preventDefault();
    }

    return <div
        className={styles.formSectionContainer + ' ' + props.className}
        style={{ ...props.style, alignItems: props.textarea ? 'flex-start' : 'center' }}
    >

        {/* ---------------------------------------------------------the title of input */}
        {props.title && <div className={styles.formSectionTitle}>{props.title + ' :'}</div>}



        {/* ---------------------------------------------------------input forms */}
        {props.input &&
            <>
                <div className={props.input_error ? styles.formSectionInput + ' ' + styles.formSectionInputError + ' ' + props.className
                    : styles.formSectionInput + ' ' + props.className}>
                    <input
                        disabled={props.disable}
                        placeholder={props.placeHolder}
                        type={props.inputtype ? props.inputtype : 'text'}
                        name={props.input_name}
                        onChange={props.onChange}
                        value={props.input_value}
                    />
                </div>

                {props.input_error &&
                    <div className={styles.errorForm}>{props.input_error}</div>
                }
            </>
        }

        {/* -----------------------------------------------------------textarea forms */}
        {
            props.textarea &&
            <div className={props.textarea_error ? styles.formSectionInput + ' ' + styles.formSectionInputError + ' ' + props.className
                : styles.formSectionInput + ' ' + props.className}>

                <textarea
                    // onPaste={(event) => onPaste(event)}
                    spellCheck={false}
                    disabled={props.disable}
                    placeholder={props.placeHolder}
                    name={props.textarea_name}
                    onChange={props.onChange}
                    value={props.textarea_value}
                />
                {props.children &&
                    props.children
                }
                {props.textarea_error &&
                    <div className={props.secondError ? styles.secondErrorForm : styles.errorForm}>{props.textarea_error}</div>
                }
            </div>
        }
    </div>
}
export default Input;