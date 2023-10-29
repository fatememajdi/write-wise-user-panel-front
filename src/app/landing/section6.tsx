/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import client from '@/config/applloAuthorizedClient';
import dynamic from 'next/dynamic';

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


const Section6: React.FC = () => {

    const [currencyCode, changeCurrencyCode] = React.useState<string>('');
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [currencies, setCurrencies] = React.useState<Currency[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    async function GetPackage(code: string) {
        setLoading(true);
        await client.query({
            query: GET_PACKAGES,
            fetchPolicy: "no-cache",
            variables: {
                currency: code.toLowerCase()
            }
        }).then((res) => {
            setPackages(res.data.getPackages);
            setLoading(false);
        })
    };

    async function GetCurrencies() {
        await client.query({
            query: GET_CURRENCIES,
            fetchPolicy: "no-cache",
        }).then((res) => {
            setCurrencies(res.data.getCurrencies);
            GetPackage(res.data.getCurrencies[0].code);
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
                    return <em>{currencies.length > 0 && currencies[0].code}</em>;
                }

                return selected;
            }}
            defaultValue="USD"
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
                    <MenuItem key={index} className={styles.selectItem} value={item.code}>{item.code}</MenuItem>)
            }

        </Select>

        <div className={'col-12 ' + styles.mainContainer}>
            {packages.map((item: Package, index: number) => <PackageCard loading={loading} pack={item} key={index} />)}
        </div>
    </section>
};

export default Section6;