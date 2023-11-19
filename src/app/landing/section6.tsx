/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import client from '@/config/applloAuthorizedClient';
import dynamic from 'next/dynamic';
import ReactLoading from 'react-loading';
import { Carousel } from 'react-responsive-carousel';

//---------------------------------------------------styles
import styles from './landingSection6.module.css';
import '../../styles/section6Select.css';
import '../../styles/customMuiStyles.css';

//---------------------------------------------------types
import { Package } from "../../../types/package";

//---------------------------------------------------components
import { GET_PACKAGES } from "@/config/graphql";
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"));

//---------------------------------------------------icons
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';


const Section6: React.FC = () => {

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
        })
    };

    React.useEffect(() => {
        GetPackage('');
    }, []);

    return <section className={styles.section6} id="pricing">
        <div className={styles.title}>No Monthly Commitments, Pure Flexibility</div>
        <div className={styles.description}>
            At WriteWiseAI, we have streamlined our pricing to ensure you get the
            best value for your IELTS writing needs.
        </div>

        <Carousel
            showThumbs={false}
            renderArrowPrev={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasPrev: any) => {
                return (
                    <div
                        className={`${hasPrev ? "absolute" : "hidden"
                            } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 ` + styles.arrowCard}
                        onClick={clickHandler}
                    >
                        <div
                            style={{ paddingRight: 5 }}
                            className={styles.arrowContainer}>
                            <IoIosArrowBack className={styles.mobileArrowIcon} />
                        </div>
                    </div>
                );
            }}
            renderArrowNext={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasNext: any) => {
                return (
                    <div
                        className={`${hasNext ? "absolute" : "hidden"
                            } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 ` + styles.arrowCard}
                        onClick={clickHandler}
                    >
                        <div
                            style={{ paddingLeft: 5 }}
                            className={styles.arrowContainer}>
                            <IoIosArrowForward className={styles.mobileArrowIcon} />
                        </div>

                    </div>
                );
            }}
            showStatus={false}
            showIndicators={false}
            thumbWidth={100}
            className={'col-12 ' + styles.mobileCarousel}>
            {packages.filter(item => !item.isPopup).map(
                (item: Package, index: number) => <PackageCard loading={loading} pack={item} key={index} />)}

        </Carousel>

        {
            loading ?
                <ReactLoading className={styles.loading} type={'spin'} color={'#FFF'} height={50} width={50} />
                :
                <div className={'col-12 ' + styles.mainContainer}>
                    {packages.filter(item => !item.isPopup).map(
                        (item: Package, index: number) => <PackageCard loading={loading} pack={item} key={index} />)}
                </div>
        }
    </section>
};

export default Section6;