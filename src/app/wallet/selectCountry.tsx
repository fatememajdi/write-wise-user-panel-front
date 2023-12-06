import React from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

//------------------------------------------------styles
import styles from './wallet.module.css';

//------------------------------------------------types
import { Country } from "../../../types/profile";

//------------------------------------------------components
const InfiniteScrollSelect = dynamic(() => import("@/components/infiniteScrollSelect/infiniteScrollSelect"));
import client from "@/config/applloAuthorizedClient";
import { SEARCH_COUNTRIES, SELECT_CURRENCY } from "@/config/graphql";
const Loading = dynamic(() => import("@/components/loading/loading"));

type _props = {
    ChangeModalStep: any
};

const SelectCountry: React.FC<_props> = ({ ChangeModalStep }) => {

    const [countries, setCountries] = React.useState<Country[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<Country>();
    const [moreCountries, setMoreCountries] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [filter, setFilter] = React.useState<string>('');

    async function searchCountry(text: string) {
        setMoreCountries(true);
        await setCountries([]);
        setFilter(text);
        GetCountries(text);
    }

    async function GetCountries(Filter?: string) {
        await client.query({
            query: SEARCH_COUNTRIES,
            fetchPolicy: "no-cache",
            variables: {
                page: countries.length + 1,
                pageSize: 1,
                value: Filter ? Filter : filter
            }
        }).then((res) => {
            if (res.data.searchCountry.countries.length !== 0) {
                setCountries([...countries, res.data.searchCountry.countries]);
            } else {
                setMoreCountries(false)
            }
        }).catch((err) => {
            toast.error(err.message);
        })
    };

    async function SelectCountry() {
        setLoading(true);
        await client.mutate({
            mutation: SELECT_CURRENCY,
            fetchPolicy: "no-cache",
            variables: {
                id: selectedItem.id
            }
        }).then((res) => {
            ChangeModalStep();
            setLoading(false);
        }).catch((err) => {
            toast.error(err.message);
            setLoading(false);
        })
    }

    React.useEffect(() => {
        GetCountries();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return loading ? <div className={'col-12 ' + styles.selectCountryContainer}>
        <div className={'col-12 ' + styles.selectCountryCard}><Loading style={{ height: 40, minHeight: 0, margin: 'auto' }} /></div></div>
        : <div className={'col-12 ' + styles.selectCountryContainer}>
            <div className={'col-12 ' + styles.selectCountryCard}>
                <p>Please select your country for personalized pricing</p>
                <InfiniteScrollSelect title="Select country" data={countries} moreData={moreCountries} GetData={GetCountries} changeFilter={searchCountry} selectItem={setSelectedItem} />
                <button
                    disabled={!selectedItem}
                    onClick={() => SelectCountry()}
                    className={styles.selectCountryButton}
                    aria-label="select country button"
                >
                    Save & Continue
                </button>
            </div>
        </div>
};

export default SelectCountry;