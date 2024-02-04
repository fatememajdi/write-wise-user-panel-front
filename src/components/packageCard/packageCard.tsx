/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import ReactLoading from 'react-loading';
import { useMediaQuery } from 'react-responsive';

//---------------------------------------------------styles
import '../../styles/section6Select.css';

//---------------------------------------------------icons
import { FiCheck } from 'react-icons/fi';
import { TbCurrencyIranianRial } from 'react-icons/tb';

//---------------------------------------------------types
import { Package } from "../../../types/package";


type _props = {
    pack: Package,
    loading: boolean,
    style?: any
};

export default function PackageCard({ pack, loading, style }: _props) {
    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });

    return <div className=" w-[300px] mac:w-[237px] mac:h-[360px] h-[456px] bg-grayColor rounded-[12px] mac:rounded-[9px] border-solid border-[1px] border-grayColor shadow-[0px 2px 2px 0px rgba(0, 82, 147, 0.18)] py-[27px] mac:py-[21px] px-[20px] mac:px-[15px] relative sm:w-[228px] sm:h-[360px] sm:py-[20px] sm:px-[15px] sm:mr-auto sm:ml-auto "
        style={{ ...style, backgroundColor: pack.isPopup && '#F3F3F3' }}>
        {
            pack.discountPercent > 0 ?
                <div
                    className="bg-background pb-[7px] h-[78px] w-[78px] mac:h-[61px] mac:w-[61px] rounded-bl-full rounded-t-[8px] rounded-br-[8px] absolute z-2 right-[14px] top-[15px] mac:top-[11px] mac:right-[9px] text-red text-center text-[16px] mac:text-[12px] font-bold leading-normal mac:leading-[22px] flex flex-col items-end justify-center pr-[15px] sm:h-[59px] sm:w-[59px] sm:right-[7px] sm:top-[12px] sm:text-[13.7px] sm:font-bold sm:pr-[14px] sm:leading-[18.6px] " >
                    <span>%{pack.discountPercent}</span>
                    <span>Off</span>
                </div>
                : pack.isPopup &&
                <div style={{ paddingRight: 5 }} className="bg-background pb-[7px] h-[78px] w-[78px] mac:h-[61px] mac:w-[61px] rounded-bl-full rounded-t-[8px] rounded-br-[8px]  absolute z-2 right-[14px] top-[15px] mac:top-[11px] mac:right-[9px] text-red text-center text-[16px] mac:text-[12px] font-bold leading-normal mac:leading-[22px] flex flex-col items-end justify-center pr-[8px] sm:h-[59px] sm:w-[59px] sm:right-[7px] sm:top-[12px] sm:text-[10px] sm:font-bold sm:pr-[14px] sm:leading-[18.6px] " >
                    <span>Limited</span>
                    <span>Offer</span>
                </div>
        }
        {
            loading ?
                <ReactLoading className="flex m-auto sm:mt-[40px] sm:mb-[40px] " type={'bubbles'} color={'#172E4A'} height={50} width={50} />
                :
                <div style={pack.isPopup ? { backgroundColor: '#AB141D', paddingBottom: 27 } : {}}
                    className="bg-primaryColor w-full h-full flex flex-col pt-[37px] mac:pt-[27px] items-start pl-[37px] mac:pl-[30px] pr-[20px] sm:py-[24px] sm:pl-[24px] sm:pr-0 ">
                    <div className="text-whiteText text-center text-[16px] mac:text-[12px] mac:leading-[15px] mr-[20px] font-normal leading-[20px] sm:text-[12.16px] sm:font-normal sm:leading-[16.9px]">{
                        pack.title}
                    </div>
                    <div
                        className={"text-whiteText text-center text-[34px] mac:text-[25px] mac:font-extrabold mac:leading-[28px] font-bold leading-normal mt-0 mb-[19px] mac:mb-[7px] flex flex-col h-fit justify-end sm:text-[22.4px] sm:font-bold sm:leading-[37.5px] sm:mt-[11px] sm:mb-[16px] " + (!pack.isPopup ? 'min-h-[80px] mac:min-h-[60px] ' : ' flex-1 ')}>
                        {
                            pack.discountPercent > 0 &&
                            <span className="line-through text-left text-[20px] mac:text-[15px] font-normal leading-[36px] mac:leading-[28px] relative w-fit pr-[30px] sm:text-[15.6px] ">
                                {
                                    pack.currency === 'IRR' ?
                                        pack.showingPrice.slice(0, pack.showingPrice.length - 1)
                                        :
                                        pack.showingPrice
                                }
                                {
                                    pack.currency === 'IRR' &&
                                    <TbCurrencyIranianRial className="absolute right-0 top-0 text-[24px] " />
                                }
                            </span>
                        }

                        <div
                            style={pack.showingPriceWithDiscount.length > 10 ? { fontSize: isMac ? 20 : 30, marginTop: pack.discountPercent > 0 ? isMac ? 0 : 5 : 0 } : { marginTop: pack.discountPercent <= 0 ? isMac ? 0 : 5 : 0 }}
                            className="relative pr-[30px] ">
                            {
                                pack.currency === 'IRR' ?
                                    pack.showingPriceWithDiscount.slice(0, pack.showingPriceWithDiscount.length - 1)
                                    :
                                    pack.showingPriceWithDiscount
                            }
                            {
                                pack.currency === 'IRR' &&
                                <TbCurrencyIranianRial className="absolute right-0 top-0 text-[24px] " />
                            }
                        </div>

                    </div>
                    <OptionCard text="Scoring" />
                    <OptionCard text="Analysis" />
                    <OptionCard text="Insights" />
                    <OptionCard text="Recommendations" />
                    <div className="mt-[20px] mac:mt-[15px] text-whiteText text-[16px] mac:text-[12px] font-normal leading-[36px] mac:leading-[28px] sm:text-[13.2px] sm:font-bold sm:leading-[18.7px] sm:mt-[15px] ">{pack.description}</div>
                    <div className="text-whiteText text-[16px] mac:text-[12px] font-normal leading-[32px] mac:leading-[28px] sm:mt-[6px] sm:text-[12.16px] sm:font-normal sm:leading-[18.7px] ">{pack.subDescription}</div>
                </div>
        }
    </div>
};


export function OptionCard({ text }: { text: string }) {
    return <div className="flex flex-row text-whiteText text-[16px] mac:text-[12px] font-normal leading-[36px] mac:leading-[28px] items-center sm:text-[12.16px] sm:font-bold sm:leading-[17.78px] "><FiCheck style={{ marginRight: 11 }} />{text}</div>
};