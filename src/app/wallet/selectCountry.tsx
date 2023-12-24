import React from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

//------------------------------------------------styles
import styles from './wallet.module.css';

//------------------------------------------------types
import { Country, UserProfile } from "../../../types/profile";

//------------------------------------------------components
const InfiniteScrollSelect = dynamic(() => import("@/components/infiniteScrollSelect/infiniteScrollSelect"));
import { GetCountries } from "@/hooks/fetchData";
import { SelectCurrency } from "@/hooks/actions";
const Loading = dynamic(() => import("@/components/loading/loading"));

type _props = {
    ChangeModalStep: any,
    setprofile: any
};

const SelectCountry: React.FC<_props> = ({ ChangeModalStep, setprofile }) => {

    const [countries, setCountries] = React.useState<Country[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<Country>();
    const [moreCountries, setMoreCountries] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(true);

    async function searchCountry(text: string) {
        if (text.length > 1) {
            GetCountriesList(text);
        }
        else if (text.length === 0) {
            await setCountries([]);
            setMoreCountries(true);
            GetCountriesList('');
        }
    }

    async function GetCountriesList(Filter?: string) {
        setCountries(await GetCountries(Filter ? Filter : ''));
        setMoreCountries(false);
    };

    async function SelectCountry() {
        if (!selectedItem) {
            toast.error('Please select your country!');
        } else {
            setLoading(true);
            let profile: UserProfile = await SelectCurrency(selectedItem.id);
            if (profile) {
                setprofile(profile);
                ChangeModalStep();
            } else {
                setLoading(false);
            }
        }
    }

    React.useEffect(() => {
        GetCountriesList();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return loading ? <div className={'col-12 ' + styles.selectCountryContainer}>
        <div className={'col-12 ' + styles.selectCountryCard}><Loading style={{ height: 40, minHeight: 0, margin: 'auto' }} /></div></div>
        : <div className={'col-12 ' + styles.selectCountryContainer}>
            <div className={'col-12 ' + styles.selectCountryCard}>
                <div className={styles.selectCountryTitle}>Please select your country for personalized pricing</div>
                <InfiniteScrollSelect title="Select country" data={countries} moreData={moreCountries} GetData={GetCountriesList} changeFilter={searchCountry} selectItem={setSelectedItem} />
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