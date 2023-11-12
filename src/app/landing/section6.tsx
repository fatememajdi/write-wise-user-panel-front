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
import { Currency } from "../../../types/currency";
import { Package } from "../../../types/package";

//---------------------------------------------------components
import { GET_CURRENCIES, GET_PACKAGES } from "@/config/graphql";
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"));

//---------------------------------------------------icons
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';


const Section6: React.FC = () => {

    const [currencyCode, changeCurrencyCode] = React.useState<string>('');
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [currencies, setCurrencies] = React.useState<Currency[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const isMac = typeof window !== 'undefined' ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false;

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

    async function GetCurrencies() {
        setLoading(true);
        await client.query({
            query: GET_CURRENCIES,
            fetchPolicy: "no-cache",
        }).then((res) => {
            setCurrencies(res.data.getCurrencies);
            GetPackage(res.data.getCurrencies[0].code);
            setLoading(false);
        })
    };

    React.useEffect(() => {
        GetCurrencies();
    }, []);

    return <section className={styles.section6} id="pricing">
        <div className={styles.title}>No Monthly Commitments, Pure Flexibility</div>
        <div className={styles.description}>
            At WriteWiseAI, we have streamlined our pricing to ensure you get the<br />
            best value for your IELTS writing needs.
        </div>
        <Select
            renderValue={(selected) => {
                if (selected.length === 0) {
                    return <em>{currencies.length > 0 ? isMac ? currencies[0].icon + ' ' + currencies[0].name : currencies[0].name
                        : <ReactLoading className={styles.loading} type={'bubbles'} color={'#FFF'} height={30} width={30} />}</em>;
                }

                return currencies.find(item => item.code === selected).icon + ' ' + currencies.find(item => item.code === selected).name;
            }}
            defaultValue="select currency"
            value={currencyCode}
            onChange={(e) => {
                changeCurrencyCode(e.target.value);
                GetPackage(e.target.value);
            }}
            displayEmpty
            inputProps={{ 'aria-label': 'gender select' }}
            className={styles.select}
        >
            {
                currencies.map((item: Currency, index: number) =>
                    <MenuItem key={index} className={styles.selectItem} value={item.code}>{isMac ? item.icon + ' ' + item.name : item.name}</MenuItem>)
            }

        </Select>


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
            loading && currencies.length === 0 ?
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