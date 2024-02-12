/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import client from '@/config/applloClient';
import dynamic from 'next/dynamic';
import ReactLoading from 'react-loading';
import { Carousel } from 'react-responsive-carousel';
import toast from "react-hot-toast";

//---------------------------------------------------styles
import '../../styles/section6Select.css';
import '../../styles/customMuiStyles.css';
import '../../styles/global.css';

//---------------------------------------------------types
import { Package } from "../../../types/package";

//---------------------------------------------------components
import { GET_PACKAGES } from "@/config/graphql";
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"), {
    ssr: false,
    loading: () => <div className="text-center min-h-[150px] items-center justify-center flex w-fit "><ReactLoading type='bubbles' color={'#929391'} height={50} width={50} /></div>
});

//---------------------------------------------------icons
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';


export default function Section6() {

    const [packages, setPackages] = React.useState<Package[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    async function GetPackage(code: string) {
        setLoading(true);
        await client.query({
            query: GET_PACKAGES,
            fetchPolicy: "no-cache",
            variables: {
                currency: code.toLowerCase(),
                userToken: ''
            }
        }).then((res) => {
            setPackages(res.data.getPackages);
            setLoading(false);
        }).catch((err) => {
            toast.error(err.message);
        })
    };

    React.useEffect(() => {
        GetPackage('');
    }, []);

    return <section className='bg-section2-gradiant pt-[50px] mini-tablet:pt-[55px] mac:pt-[48px] sm:pt-[77px] pr-[140px] mac:pr-[72px] sm:pr-[10px] pb-[84px] mac:pb-[110px] sm:pb-[39px] pl-[130px] mini-tablet:pr-[82px] tablet:px-[25px] tablet:pb-[95px] mac:pl-[72px] mini-tablet:pl-[73px] sm:pl-[10px] flex flex-col sm:min-h-fit '
        id="pricing">
        <h2 className='text-whiteText lg:ml-[59px] tablet:ml-[66px] leading-[60px] mini-tablet:leading-[36px] tablet:leading-[36px] mac:leading-[47px] mac:ml-[100px] sm:ml-[43px] sm:leading-[24.3px] sm:mr-[60px] '>No Monthly Commitments, Pure Flexibility</h2>
        <h6 className="text-whiteText lg:ml-[59px] tablet:ml-[66px] leading-[32px] mini-tablet:leading-[22px] tablet:leading-[22px] tablet:mt-[21px] mini-tablet:mt-[21px] mac:leading-[19px] mt-[36px] mac:ml-[100px] mac:mt-[19px] mac:max-w-full max-w-[850px] tablet:max-w-[640px] sm:text-[13px] sm:font-normal sm:leading-[16.9px] sm:ml-[43px] sm:mt-[27px] sm:max-w-full ">
            At WriteWiseAI, we have streamlined our pricing to ensure you get the
            best value for your IELTS writing needs.
        </h6>


        <div className="text-whiteText text-center text-[24px] mini-tablet:text-[15px] tablet:text-[15px] tablet:leading-[22px] mini-tablet:leading-[22px] tablet:mt-[77px] mac:text-[19px] font-normal leading-[36px] mb-[56px] tablet:mb-[33px] mac:mb-[45px] mt-[56px] mini-tablet:mt-[54px] mini-tablet:mb-[29px] mac:mt-[66px] flex flex-row items-center justify-center sm:text-[13px] ">
            Use of a VPN might change your regional currency!
            {/* {
                packages.length > 0 && packages[0].flagUrl &&
                <Image
                    src={packages[0].flagUrl}
                    alt="country flag"
                    width="0"
                    height="0"
                    sizes="100vw"
                    loading="eager"
                    priority
                    className="h-[20px] w-[20px] ml-[5px] sm:w-[30px] sm:h-[15px] "
                />
            } */}
        </div>

        <Carousel
            showThumbs={false}
            renderArrowPrev={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasPrev: any) => {
                return (
                    <div
                        className={`${hasPrev ? "absolute" : "hidden"
                            } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 `}
                        onClick={clickHandler}
                    >
                        <div
                            style={{ paddingRight: 5 }}
                            className="h-[30px] w-[30px] pt-0 rounded-full bg-arrow-icon flex justify-center items-center ">
                            <IoIosArrowBack className="flex text-[30px] text-primaryColor " />
                        </div>
                    </div>
                );
            }}
            renderArrowNext={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasNext: any) => {
                return (
                    <div
                        className={`${hasNext ? "absolute" : "hidden"
                            } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 `}
                        onClick={clickHandler}
                    >
                        <div
                            style={{ paddingLeft: 5 }}
                            className="h-[30px] w-[30px] pt-0 rounded-full bg-arrow-icon blur-none flex justify-center items-center ">
                            <IoIosArrowForward className="flex text-[30px] text-primaryColor " />
                        </div>

                    </div>
                );
            }}
            showStatus={false}
            showIndicators={false}
            thumbWidth={100}
            className='col-12 self-center ml-auto mr-auto hidden sm:block '>
            {packages.map(
                (item: Package, index: number) => <PackageCard loading={loading} pack={item} key={index} />)}

        </Carousel>

        {
            loading ?
                <ReactLoading className="m-auto" type={'spin'} color={'#FFF'} height={50} width={50} />
                :
                <div className='col-12 flex flex-row mini-tablet:flex-wrap mini-tablet:px-[12px] justify-between sm:hidden '>
                    {packages.map(
                        (item: Package, index: number) => <PackageCard loading={loading} pack={item} key={index} />)}
                </div>
        }
    </section>
};