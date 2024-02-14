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
    const isTablet = useMediaQuery({ query: "(max-width: 1399px)" });
    const isminiTablet = useMediaQuery({ query: "(max-width: 821px)" });
    const isTabletPro = useMediaQuery({ maxWidth: 1399, minHeight: 1200 });

    return <div className=" w-[300px] tablet-pro:w-[246px] tablet-pro:h-[374px] mini-tablet:mx-[10px] tablet-pro:mx-[15px] mini-tablet:w-[184px] mini-tablet:mt-[24px] tablet-pro:mt-[33px] mini-tablet:h-[280px] tablet:w-[184px] tablet:h-[280px] mac:w-[237px] mac:h-[360px] h-[456px] bg-grayColor rounded-[12px] mini-tablet:rounded-[7px] mac:rounded-[9px] tablet:rounded-[7px] border-solid border-[1px] border-grayColor shadow-[0px 2px 2px 0px rgba(0, 82, 147, 0.18)] py-[27px] mini-tablet:py-[16px] mini-tablet:px-[12px] mac:py-[21px] px-[20px] tablet:py-[16px] tablet-pro:py-[22px] tablet-pro:px-[16px] tablet:px-[12px] mac:px-[15px] relative sm:w-[228px] sm:h-[360px] sm:py-[20px] sm:px-[15px] sm:mr-auto sm:ml-auto "
        style={{ ...style, backgroundColor: pack.isPopup && '#F3F3F3' }}>
        {
            pack.discountPercent > 0 ?
                <div
                    className="bg-background tablet-pro:text-[13px] tablet-pro:leading-[22px] tablet-pro:top-[12px] tablet-pro:right-[11px] pb-[7px] mini-tablet:top-[6px] mini-tablet:text-[9px] mini-tablet:leading-[15px] mini-tablet:right-[7px] h-[78px] w-[78px] tablet:h-[48px] tablet:w-[48px]
                     tablet-pro:h-[64px] tablet-pro:w-[64px] mini-tablet:h-[48px] mini-tablet:w-[48px] mac:h-[61px] mac:w-[61px] tablet:text-[9px] tablet:leading-[15px] tablet:top-[8px] tablet:right-[7px] rounded-bl-full rounded-t-[8px] rounded-br-[8px] absolute z-2 right-[14px] top-[15px] mac:top-[11px] mac:right-[9px] text-red text-center text-[16px] mac:text-[12px] font-bold leading-normal mac:leading-[22px] flex flex-col items-end justify-center pr-[15px] mini-tablet:pr-[9px] tablet:pr-[10px] tablet-pro:pr-[14px] sm:h-[59px] sm:w-[59px] sm:right-[7px] sm:top-[12px] sm:text-[13.7px] sm:font-bold sm:pr-[14px] sm:leading-[18.6px] " >
                    <span>%{pack.discountPercent}</span>
                    <span>Off</span>
                </div>
                : pack.isPopup &&
                <div style={{ paddingRight: 5 }}
                    className="bg-background tablet-pro:text-[13px] tablet-pro:leading-[22px] tablet-pro:top-[12px] tablet-pro:right-[11px] pb-[7px] h-[78px] mini-tablet:text-[9px] mini-tablet:leading-[15px] mini-tablet:top-[6px] mini-tablet:right-[7px] tablet-pro:h-[64px] tablet-pro:w-[64px] mini-tablet:h-[48px] mini-tablet:w-[48px] tablet:h-[48px] tablet:w-[48px] w-[78px] mac:h-[61px] mac:w-[61px] tablet:text-[9px]  tablet:top-[8px] tablet:right-[7px] tablet:leading-[15px] rounded-bl-full rounded-t-[8px] rounded-br-[8px]  absolute z-2 right-[14px] top-[15px]
                     mac:top-[11px] mac:right-[9px] text-red text-center text-[16px] mac:text-[12px] font-bold leading-normal mac:leading-[22px] flex flex-col items-end justify-center pr-[8px] tablet:pr-[4px] tablet-pro:pr-[7px] sm:h-[59px] sm:w-[59px] sm:right-[7px] sm:top-[12px] sm:text-[10px] sm:font-bold sm:pr-[14px] sm:leading-[18.6px] " >
                    <span>Limited</span>
                    <span>Offer</span>
                </div>
        }
        {
            loading ?
                <ReactLoading className="flex m-auto sm:mt-[40px] sm:mb-[40px] " type={'bubbles'} color={'#172E4A'} height={50} width={50} />
                :
                <div style={pack.isPopup ? { backgroundColor: '#AB141D', paddingBottom: 27 } : {}}
                    className="bg-primaryColor w-full h-full flex flex-col pt-[37px] tablet-pro:pt-[27px] tablet-pro:pr-[27px] tablet:pt-[21px] mac:pt-[27px] tablet:rounded-[4px] mini-tablet:rounded-[4px] items-start pl-[37px] mini-tablet:pl-[24px] tablet-pro:pl-[32px] mini-tablet:pr-[0px] mini-tablet:pt-[21px] tablet:pl-[20px] mac:pl-[30px] pr-[20px] sm:py-[24px] sm:pl-[24px] sm:pr-0 ">
                    <div className="text-whiteText text-center text-[16px] tablet-pro:text-[13px] tablet-pro:leading-[16px] tablet:text-[9px] mini-tablet:text-[9px] mini-tablet:leading-[12px] tablet:leading-[12px] mac:text-[12px] mac:leading-[15px] mr-[20px] tablet:mr-0 font-normal leading-[20px] sm:text-[12.16px] sm:font-normal sm:leading-[16.9px]">{
                        pack.title}
                    </div>
                    <div
                        className={"text-whiteText text-center text-[34px] tablet-pro:text-[28px] tablet-pro:font-extrabold tablet-pro:leading-[29px] mini-tablet:text-[19px] mini-tablet:leading-[22px] mini-tablet:font-extrabold tablet:text-[19px] tablet:font-extrabold tablet:leading-[22px] mac:text-[25px] mac:font-extrabold mac:leading-[28px] font-bold leading-normal mt-0 mb-[19px] mac:mb-[7px] flex flex-col h-fit justify-end sm:text-[22.4px] sm:font-bold sm:leading-[37.5px] sm:mt-[11px] sm:mb-[16px] "
                            + (!pack.isPopup ? 'min-h-[80px] mac:min-h-[60px] mini-tablet:min-h-[47px] tablet-pro:min-h-[63px] tablet:min-h-[47px] ' : ' flex-1 ')}>
                        {
                            pack.discountPercent > 0 &&
                            <span className="line-through tablet-pro:pr-[22px] text-left text-[20px] tablet-pro:text-[20px] tablet-pro:leading-[29px] tablet:text-[12px] mini-tablet:text-[12px] tablet:leading-[22px] mini-tablet:leading-[22px] mac:text-[15px] font-normal leading-[36px] mac:leading-[28px] relative w-fit pr-[30px] sm:text-[15.6px] mini-tablet:pr-[15px] ">
                                {
                                    pack.currency === 'IRR' ?
                                        pack.showingPrice.slice(0, pack.showingPrice.length - 1)
                                        :
                                        pack.showingPrice
                                }
                                {
                                    pack.currency === 'IRR' &&
                                    <TbCurrencyIranianRial className="absolute right-0 top-0 tablet-pro:text-[20px] text-[24px] tablet:text-[15px] mini-tablet:text-[12px] " />
                                }
                            </span>
                        }

                        <div
                            style={pack.showingPriceWithDiscount.length > 10 ? { fontSize: isTabletPro ? 20 : isTablet || isminiTablet ? 15 : isMac ? 20 : 30, marginTop: pack.discountPercent > 0 ? isTabletPro ? 0 : isMac ? 0 : 5 : 0 } : { marginTop: pack.discountPercent <= 0 ? isTablet ? 10 : isMac ? 0 : 5 : 0 }}
                            className="relative pr-[30px] tablet:pr-[17px] mini-tablet:pr-[15px] tablet-pro:pr-[22px] ">
                            {
                                pack.currency === 'IRR' ?
                                    pack.showingPriceWithDiscount.slice(0, pack.showingPriceWithDiscount.length - 1)
                                    :
                                    pack.showingPriceWithDiscount
                            }
                            {
                                pack.currency === 'IRR' &&
                                <TbCurrencyIranianRial className="absolute right-0 top-0 text-[24px] tablet-pro:text-[20px] tablet:text-[15px] mini-tablet:text-[12px] " />
                            }
                        </div>

                    </div>
                    <OptionCard text="Scoring" />
                    <OptionCard text="Analysis" />
                    <OptionCard text="Insights" />
                    <OptionCard text="Recommendations" />
                    <div className="mt-[20px] mac:mt-[15px] tablet-pro:text-[13px] tablet-pro:mt-[16px] tablet-pro:leading-[29px] mini-tablet:mt-[11px] tablet:mt-[11px] mini-tablet:text-[9px] tablet:text-[9px] tablet:leading-[22px] mini-tablet:leading-[22px] text-whiteText text-[16px] mac:text-[12px] font-normal leading-[36px] mac:leading-[28px] sm:text-[13.2px] sm:font-bold sm:leading-[18.7px] sm:mt-[15px] ">{pack.description}</div>
                    <div className="text-whiteText tablet-pro:text-[13px] tablet-pro:leading-[29px] text-[16px] mini-tablet:text-[9px] tablet:text-[9px] tablet:leading-[22px] mini-tablet:leading-[22px] mac:text-[12px] font-normal leading-[32px] mac:leading-[28px] sm:mt-[6px] sm:text-[12.16px] sm:font-normal sm:leading-[18.7px] ">{pack.subDescription}</div>
                </div>
        }
    </div>
};


export function OptionCard({ text }: { text: string }) {
    return <div className="flex flex-row text-whiteText tablet-pro:text-[13px] tablet-pro:leading-[29px] text-[16px] tablet:text-[9px] mini-tablet:text-[9px] tablet:leading-[22px] mac:text-[12px] font-normal leading-[36px] mini-tablet:leading-[22px] mac:leading-[28px] items-center sm:text-[12.16px] sm:font-bold sm:leading-[17.78px] "><FiCheck style={{ marginRight: 11 }} />{text}</div>
};