/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import client from '@/config/applloClient';
import { useMediaQuery } from 'react-responsive';
import ReactLoading from 'react-loading';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------icons
import { BiSolidCheckCircle } from 'react-icons/bi';
import { TbCurrencyIranianRial } from 'react-icons/tb';
import { AiOutlineClose, AiFillCloseCircle } from 'react-icons/ai';

//------------------------------------------components
import { VALIDATION_PROMOTION_CODE } from "@/config/graphql";

//---------------------------------------------------types
import { Package } from "../../../types/package";

type _PackageCardProps = {
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

const PackageCard: React.FC<_PackageCardProps> = ({ handleCancel, pack, CreatePaymentLink }) => {

    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const [promotionCode, changePromotionCode] = React.useState<string>('');
    const [validpromotionCode, changeValidPromotionCode] = React.useState<boolean>(false);
    const [typing, changeTyping] = React.useState<boolean>(false);
    const [sendPromotionCode, changeSendPromotionCode] = React.useState<boolean>(false);
    const [promotion, changePromotion] = React.useState<Promotion>();
    const [loading, setLoading] = React.useState<boolean>(false);

    async function validationPromotionCode() {
        setLoading(true);
        await client.query({
            query: VALIDATION_PROMOTION_CODE,
            fetchPolicy: "no-cache",
            variables: {
                id: pack.id,
                adjustedQuantity: 1,
                promotionCode: promotionCode
            }
        }).then((res) => {
            changePromotion(res.data.validationPromotionCode);
            changeValidPromotionCode(true);
            changeSendPromotionCode(true);
            setLoading(false);
            changeTyping(false);
        }).catch(async (err) => {
            await changePromotion(null);
            changeValidPromotionCode(false);
            changeSendPromotionCode(true);
            changeTyping(false);
            setLoading(false);
        })
    };

    return <div className='col-12 bg-primaryColor filter-[drop-shadow(-18px 20px 66px rgba(0, 0, 0, 0.17))] w-full h-fit min-h-full rounded-none py-[34px] pr-[28px] pl-[40px] min-w-[1429px] sm:min-w-0 sm:py-[48px] sm:pr-[36px] sm:pl-[26px] sm:min-h-screen sm:h-full '>
        <AiOutlineClose
            onClick={() => handleCancel()}
            style={{ marginLeft: 'auto' }}
            className='text-[45px] text-grayColor cursor-pointer ml-auto sm:text-[30px] ' />
        <div className='col-12 flex lg:flex-row mac:flex-row sm:flex-col '>
            <div className='col-lg-5 col-md-5 col-12 flex items-center justify-center '>
                <div className={'flex flex-col items-center justify-center w-[298px] h-[336px] bg-[rgba(243, 243, 243, 0.03)] filter-[drop-shadow(-11px 4px 25px rgba(0, 0, 0, 0.20))] text-whiteText text-center text-[48px] font-bold leading-normal py-0 pr-[70px] pl-[40px] rounded-[4px] sm:w-[172px] sm:h-[149px] sm:text-[16px] sm:font-extrabold sm:text-center sm:mb-[39px] sm:py-0 sm:px-[10px] ' + styles.buyPackageLeftCardTitle}>
                    <div
                        style={pack.showingPrice.length > 9 ? { fontSize: isMobile ? 14 : 34 } : {}}
                        className='relative pr-[30px] sm:pr-0 '>
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
                    <span className=" text-[20px] font-normal leading-[26px] mt-[7px] "> Start your journey with us.</span>
                </div>
            </div>

            <div className={'col-lg-7 col-md-7 col-12 ' + styles.buyPackageRightCard}>
                <div className={'col-12 ' + styles.buyPackageRightCardTitle}>
                    Start your journey with us.
                    <span>{pack.showingPrice}</span>
                </div>
                {/* <div className={styles.countercontainer}>
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

                </div> */}
                <div className={'col-12 ' + styles.buyPackageRightCardSubTitle}>
                    Subtotal
                    <span>{pack.showingPrice}</span>
                </div>
                {
                    !pack.isPopup &&
                    <div className={styles.applyCodeContainer}>
                        <div className={styles.inputCard}>
                            <input
                                className={sendPromotionCode && !validpromotionCode ? styles.errorForm : ''}
                                type="text"
                                onChange={(e) => {
                                    changeTyping(true);
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
                    disabled={loading || promotionCode.length > 0 && typing}
                    onClick={() => {
                        handleCancel();
                        CreatePaymentLink(1, pack.id, promotionCode);
                    }}
                    className={styles.checkoutButton}>Checkout</button>
            </div>

        </div>
    </div>
};

export default PackageCard;