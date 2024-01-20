/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import ReactLoading from 'react-loading';

//------------------------------------------icons
import { AiOutlineClose } from 'react-icons/ai';

//------------------------------------------components
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"), {
    ssr: false,
    loading: () => <div className="text-center min-h-[450px] items-center justify-center flex w-fit ">
        <ReactLoading type='bubbles' color={'#929391'} height={50} width={50} /></div>
});
//---------------------------------------------------types
import { Package } from "../../../types/package";

type _PackagesListProps = {
    handleCancel: any,
    loading: boolean,
    packages: Package[],
    changeModalStep: any
};

export default function PackagesList({ handleCancel, loading, packages, changeModalStep }: _PackagesListProps) {

    // const isMac = typeof window !== 'undefined' ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false;
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    return <div className='col-12 bg-primaryColor filter-[drop-shadow(-18px 20px 66px rgba(0, 0, 0, 0.17))] w-full h-fit min-h-full rounded-none py-[34px] pr-[28px] pl-[40px] min-w-[1429px] sm:min-w-0 sm:py-[48px] sm:pr-[36px] sm:pl-[26px] sm:min-h-screen sm:h-full '>
        <div className='col-12 flex flex-row items-center justify-between ' >
            <AiOutlineClose
                onClick={() => handleCancel()}
                className='text-[45px] text-grayColor cursor-pointer ml-auto sm:text-[30px] ' />
        </div>
        <div className='col-12 flex lg:flex-row mac:flex-row mt-[50px] items-center justify-around sm:flex-col '>

            {
                loading && packages.length === 0 ?
                    <ReactLoading className='m-auto' type={'spin'} color={'#FFF'} height={50} width={50} />
                    :
                    <>
                        {packages.map((item: Package, index: number) => <div
                            key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={() => changeModalStep(item)}>
                            <PackageCard loading={loading} pack={item} key={index} style={isMobile ? { width: 298, marginBottom: 13 } : { marginRight: 10, marginLeft: 10 }} />
                        </div>)}
                    </>
            }
        </div>
    </div>
};
