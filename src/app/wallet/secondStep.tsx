/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import client from '@/config/applloAuthorizedClient';
import { useMediaQuery } from 'react-responsive';
import ReactLoading from 'react-loading';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------icons
import { BiSolidRightArrow, BiSolidLeftArrow, BiSolidCheckCircle } from 'react-icons/bi';
import { TbCurrencyIranianRial } from 'react-icons/tb';
import { AiOutlineClose, AiFillCloseCircle } from 'react-icons/ai';

//------------------------------------------components
import { VALIDATION_PROMOTION_CODE } from "@/config/graphql";

//---------------------------------------------------types
import { Package } from "../../../types/package";

type _modalSecondStepProps = {
    handleCancel: any,
    pack: Package,
    CreatePaymentLink: any
};

type Promotion = {
    name: string,
    percentOff: number,
    amountAfterDiscount: string,
    discountAmount: string
};

const ModalSecondStep: React.FC<_modalSecondStepProps> = ({ handleCancel, pack, CreatePaymentLink }) => {

    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const [counter, changeCounter] = React.useState<number>(1);
    const [promotionCode, changePromotionCode] = React.useState<string>('');
    const [validpromotionCode, changeValidPromotionCode] = React.useState<boolean>(false);
    const [sendPromotionCode, changeSendPromotionCode] = React.useState<boolean>(false);
    const [promotion, changePromotion] = React.useState<Promotion>();
    const [loading, setLoading] = React.useState<boolean>(false);

    async function validationPromotionCode() {
        setLoading(true);
        console.log(promotionCode);
        await client.query({
            query: VALIDATION_PROMOTION_CODE,
            fetchPolicy: "no-cache",
            variables: {
                id: pack.id,
                currency: pack.currency.toLowerCase(),
                adjustedQuantity: pack.adjustableQuantity ? counter : 1,
                promotionCode: promotionCode
            }
        }).then((res) => {
            console.log(res.data.validationPromotionCode);
            changePromotion(res.data.validationPromotionCode);
            changeValidPromotionCode(true);
            changeSendPromotionCode(true);
            setLoading(false);
        }).catch(async (err) => {
            console.log('validation promotion code error : ', err);
            await changePromotion(null);
            changeValidPromotionCode(false);
            changeSendPromotionCode(true);
            setLoading(false);
        })
    }

    return <div className={'col-12 ' + styles.modalCard}>
        <AiOutlineClose
            onClick={() => handleCancel()}
            style={{ marginLeft: 'auto' }}
            className={styles.closeModalButton} />
        <div className={'col-12 ' + styles.buyPackageCard}>
            <div className={'col-lg-5 col-md-5 col-12 ' + styles.buyPackageLeftCard}>
                <div className={styles.buyPackageLeftCardTitle}>
                    <div
                        style={pack.showingPrice.length > 9 ? { fontSize: isMobile ? 14 : 34 } : {}}
                        className={styles.buyPackLeftCardTitleText}>
                        {
                            pack.currency === 'IRR' ?
                                pack.showingPrice.slice(0, pack.showingPrice.length - 1)
                                :
                                pack.showingPrice
                        }
                        {
                            pack.currency === 'IRR' &&
                            <TbCurrencyIranianRial className={styles.rialIcon} />
                        }
                    </div>
                    <span> Start your journey with us.</span>
                </div>
            </div>

            <div className={'col-lg-7 col-md-7 col-12 ' + styles.buyPackageRightCard}>
                <div className={'col-12 ' + styles.buyPackageRightCardTitle}>
                    Start your journey with us.
                    <span>{pack.showingPrice}</span>
                </div>
                <div className={styles.countercontainer}>
                    {
                        pack.adjustableQuantity &&
                        <button
                            disabled={!pack.adjustableQuantity || loading}
                            onClick={() => { if (counter > 1) changeCounter(counter - 1) }} >
                            <BiSolidLeftArrow
                                className={styles.arrowIcon} />
                        </button>
                    }
                    <div className={styles.countCard}>{counter}</div>

                    {
                        pack.adjustableQuantity &&
                        <button
                            disabled={!pack.adjustableQuantity || loading}
                            onClick={() => changeCounter(counter + 1)}>
                            <BiSolidRightArrow
                                className={styles.arrowIcon} />
                        </button>
                    }

                </div>
                <div className={'col-12 ' + styles.buyPackageRightCardSubTitle}>
                    Subtotal
                    <span>{pack.showingPrice}</span>
                </div>
                {
                    !pack.isPopup &&
                    <div className={styles.applyCodeContainer}>
                        <div className={styles.inputCard}>
                            <input
                                className={sendPromotionCode && !validpromotionCode && styles.errorForm}
                                type="text"
                                onChange={(e) => {
                                    changePromotionCode(e.target.value);
                                    changeSendPromotionCode(false);
                                }}
                                disabled={pack.discountName !== ""}
                                placeholder="Add promotion code"
                                value={pack.discountName ? pack.discountName : promotionCode}></input>

                            {sendPromotionCode ?
                                validpromotionCode ?
                                    <BiSolidCheckCircle className={styles.checkCodeIcon} />
                                    :
                                    <AiFillCloseCircle className={styles.checkCodeIcon} />
                                : <></>
                            }
                        </div>

                        {pack.discountName === '' &&
                            <button
                                disabled={pack.discountName !== '' || promotionCode.length === 0}
                                className={styles.applyCodeButton}
                                onClick={() => validationPromotionCode()}
                            >
                                {
                                    loading ?
                                        <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} />
                                        :
                                        'Apply code'
                                }
                            </button>
                        }

                        <span>{pack.discountPercent !== 0 ? '-' + pack.showingDiscountAmount
                            : promotion && '-' + promotion.discountAmount}</span>

                    </div>
                }
                {
                    sendPromotionCode && !validpromotionCode &&
                    <div className={styles.inputError}>The promo code you entered is invalid. Please try again,</div>
                }
                <div className={'col-12 ' + styles.buyPackageRightCardSubTitle + ' ' + styles.totalDueCard}>
                    Total due
                    <span>{promotion ? promotion.amountAfterDiscount : pack.showingPriceWithDiscount}</span>
                </div>
                <button
                    disabled={loading}
                    onClick={() => {
                        handleCancel();
                        CreatePaymentLink(pack.adjustableQuantity ? counter : 1, pack.id, pack.currency.toLowerCase(), pack.discountName !== '' ? pack.currencyName : promotionCode);
                    }}
                    className={styles.checkoutButton}>Checkout</button>
            </div>

        </div>
    </div>
};

export default ModalSecondStep;