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

    async function searchCountry(text: string) {
        if (text.length > 1) {
            GetCountries(text);
        }
        else if (text.length === 0) {
            await setCountries([]);
            setMoreCountries(true);
            GetCountries('');
        }
    }

    async function GetCountries(Filter?: string) {
        await client.query({
            query: SEARCH_COUNTRIES,
            fetchPolicy: "no-cache",
            variables: {
                page: 1,
                pageSize: 250,
                value: Filter ? Filter : ''
            }
        }).then((res) => {
            setCountries(res.data.searchCountry.countries);
            setMoreCountries(false);
        }).catch((err) => {
            toast.error(err.message);
        })
    };

    async function SelectCountry() {
        if (!selectedItem) {
            toast.error('Please select your country!');
        } else {
            setLoading(true);
            await client.mutate({
                mutation: SELECT_CURRENCY,
                fetchPolicy: "no-cache",
                variables: {
                    id: selectedItem.id
                }
            }).then((res) => {
                ChangeModalStep();
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false);
            })
        }
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
                <div className={styles.selectCountryTitle}>Please select your country for personalized pricing</div>
                <InfiniteScrollSelect title="Select country" data={countries} moreData={moreCountries} GetData={GetCountries} changeFilter={searchCountry} selectItem={setSelectedItem} />
                <button
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