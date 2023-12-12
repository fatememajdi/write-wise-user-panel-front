/* eslint-disable padded-blocks */
import React, { useMemo } from 'react'
import { RE_DIGIT } from '../../constants'

// --------------------------------------style
import styles from './otpIput.module.css';

export interface Props {
    value: string,
    valueLength: number,
    onChange: (value: string) => void,
    className?: string,
    style?: any,
    input_name?: string,
    input_error?: any,
    disable?: boolean
}

export default function OtpInput({ value, valueLength, onChange, input_name, input_error, disable }: Props) {

    const valueItems = useMemo(() => {
        const valueArray = value.split('')
        const items: string[] = []
        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i]
            if (RE_DIGIT.test(char)) {
                items.push(char)
            } else {
                items.push('')
            }
        }
        return items
    }, [value, valueLength])

    const focusToNextInput = (target: HTMLElement) => {
        const nextElementSibling =
            target.nextElementSibling as HTMLInputElement | null
        if (nextElementSibling) {
            nextElementSibling.focus()
        }
    }

    const focusToPrevInput = (target: HTMLElement) => {
        const previousElementSibling =
            target.previousElementSibling as HTMLInputElement | null
        if (previousElementSibling) {
            previousElementSibling.focus()
        }
    }

    const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const target = e.target
        let targetValue = target.value.trim()
        const isTargetValueDigit = RE_DIGIT.test(targetValue)
        if (!isTargetValueDigit && targetValue !== '') {
            return
        }
        const nextInputEl = target.nextElementSibling as HTMLInputElement | null
        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
            return
        }
        targetValue = isTargetValueDigit ? targetValue : ' '
        const targetValueLength = targetValue.length
        if (targetValueLength === 1) {
            const newValue =
                value.substring(0, idx) + targetValue + value.substring(idx + 1)
            onChange(newValue)
            if (!isTargetValueDigit) {
                return
            }
            const nextElementSibling =
                target.nextElementSibling as HTMLInputElement | null
            if (nextElementSibling) {
                nextElementSibling.focus()
            }
            focusToNextInput(target)
        } else if (targetValueLength === valueLength) {
            onChange(targetValue)
            target.blur()
        }
    }

    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e
        const target = e.target as HTMLInputElement
        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault()
            focusToNextInput(target)
            return
        }
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault()
            focusToPrevInput(target)
            return
        }
        const targetValue = target.value
        target.setSelectionRange(0, targetValue.length)
        if (e.key !== 'Backspace' || target.value !== '') {
            return
        }
        const previousElementSibling =
            target.previousElementSibling as HTMLInputElement | null

        if (previousElementSibling) {
            previousElementSibling.focus()
        }
        if (e.key !== 'Backspace' || targetValue !== '') {
            return
        }
        focusToPrevInput(target)
    }

    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e
        const prevInputEl =
            target.previousElementSibling as HTMLInputElement | null
        if (prevInputEl && prevInputEl.value === '') {
            prevInputEl.focus()
            return
        }
        target.setSelectionRange(0, target.value.length)
    }

    return (
        <div>
            <div className={input_error ? styles.formSectionInputError + ' ' + styles.otpGroup : styles.otpGroup}>
                {valueItems.map((digit, idx) => (
                    <input
                        disabled={disable}
                        onChange={(e) => { inputOnChange(e, idx) }}
                        key={idx}
                        type='text'
                        inputMode='numeric'
                        autoComplete='one-time-code'
                        pattern='\d{1}'
                        maxLength={valueLength}
                        className={styles.otpInput}
                        value={digit}
                        onKeyDown={inputOnKeyDown}
                        onFocus={inputOnFocus}
                        name={input_name}
                    />
                ))}
            </div>

            {input_error &&
                <div className={styles.errorForm}>{input_error}</div>
            }

        </div>
    )
}