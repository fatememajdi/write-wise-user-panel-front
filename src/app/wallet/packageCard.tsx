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

export default function PackageCard({ handleCancel, pack, CreatePaymentLink }: _PackageCardProps) {

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
                            <TbCurrencyIranianRial className=' absolute right-0 top-0 text-[24px] sm:top-[-10px] sm:right-[-25px] ' />
                        }
                    </div>
                    <span className=" text-[20px] font-normal leading-[26px] mt-[7px] "> Start your journey with us.</span>
                </div>
            </div>

            <div className='col-lg-7 col-md-7 col-12 flex flex-col pr-[133px] pb-[50px] sm:pr-0 sm:pb-[50px] '>
                <div className='col-12 flex flex-row items-center justify-between text-whiteText text-[24px] font-normal leading-[26px] pr-[45px] sm:pr-0 sm:text-[10px] '>
                    Start your journey with us.
                    <span className="sm:text-[12px] sm:font-bold ">{pack.showingPrice}</span>
                </div>
                <div className='col-12 flex flex-row items-center justify-between text-whiteText text-[24px] leading-[26px] pr-[45px] mt-[33px] border-t-[1px] border-t-grayColor font-light pt-[24px] sm:pr-0 sm:text-[10px] sm:font-normal sm:mt-[26px]  '>
                    Subtotal
                    <span className="sm:text-[12px] sm:font-bold ">{pack.showingPrice}</span>
                </div>
                {
                    !pack.isPopup &&
                    <div className='flex flex-row pr-[44px] mt-[40px] items-center sm:w-fit sm:self-center sm:pr-0 '>
                        <div className='relative'>
                            <input
                                className={' w-[269px] h-[42px] rounded-[6px] border-[1px] bg-grayColor text-whiteText text-left text-[20px] font-normal leading-[9.5px] pl-[3px] placeholder:text-whiteText placeholder:text-center placeholder:text-[20px] placeholder:font-normal placeholder:leading-[9.5px] sm:w-[148px] sm:h-[28px] sm:text-[10px] sm:font-normal sm:rounded-[3px] sm:leading-[7.19px] sm:placeholder:text-[10px] sm:placeholder:font-normal '
                                    + (sendPromotionCode && !validpromotionCode ? 'border-[1px] border-red ' : 'border-background')}
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
                                    <BiSolidCheckCircle className='text-[25px] text-whiteText absolute top-[9px] right-[4px] sm:text-[20px] sm:top-[4px] sm:right-[8px] ' />
                                    :
                                    <AiFillCloseCircle className='text-[25px] text-whiteText absolute top-[9px] right-[4px] sm:text-[20px] sm:top-[4px] sm:right-[8px] ' />
                                : <></>
                            }
                        </div>

                        {pack.discountName === '' &&
                            <button
                                disabled={pack.discountName !== '' || promotionCode.length === 0}
                                className='w-[129px] h-[42px] rounded-[6px] border-[1px] border-seccondaryColor bg-seccondaryColor text-whiteText text-center text-[20px] font-normal leading-normal ml-[24px] sm:w-[85.8px] sm:h-[27.9px] sm:text-[10px] sm:rounded-[3px] '
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
                        {
                            !isMobile &&
                            <span className=" text-whiteText text-center text-[24px] font-normal leading-normal ml-auto ">{pack.discountPercent !== 0 ? '-' + pack.showingDiscountAmount
                                : promotion && '-' + promotion.discountAmount}</span>
                        }
                    </div>
                }
                {
                    sendPromotionCode && !validpromotionCode &&
                    <div className='text-whiteText text-[20px] font-light leading-[27.3px] mt-[16px] '>The promo code you entered is invalid. Please try again,</div>
                }
                <div className='col-12 flex flex-row items-center justify-between text-whiteText text-[24px] leading-[26px] pr-[45px] mt-[33px] border-t-[1px] border-t-grayColor font-light pt-[24px] sm:pr-0 sm:text-[10px] sm:font-normal sm:mt-[26px]  '>
                    Total due
                    <span className="text-[32px] font-bold sm:text-[12px] " >{promotion ? promotion.amountAfterDiscount : pack.showingPriceWithDiscount}</span>
                </div>
                <button
                    disabled={loading || promotionCode.length > 0 && typing}
                    onClick={() => {
                        handleCancel();
                        CreatePaymentLink(1, pack.id, promotionCode);
                    }}
                    className='w-[172px] h-[48px] border-[1px] border-background bg-background text-blackText text-center text-[24px] font-semibold leading-normal mt-[50px] mr-auto sm:h-[24px] sm:w-[78px] sm:text-[10px] sm:font-semibold rounded-[3px] '>Checkout</button>
            </div>

        </div>
    </div>
};
