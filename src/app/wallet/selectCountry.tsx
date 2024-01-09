import React from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import ReactLoading from 'react-loading';

//------------------------------------------------types
import { Country, UserProfile } from "../../../types/profile";

//------------------------------------------------components
const InfiniteScrollSelect = dynamic(() => import("@/components/infiniteScrollSelect/infiniteScrollSelect"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-40">
        <ReactLoading className="mt-[24px]" type={'spin'} color={'#929391'} height={30} width={30} /></div>
});
import { GetCountries } from "@/hooks/fetchData";
import { SelectCurrency } from "@/hooks/actions";
const Loading = dynamic(() => import("@/components/loading/loading"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-40">
        <ReactLoading className="mt-[24px]" type={'spin'} color={'#929391'} height={50} width={50} /></div>
});

type _props = {
    ChangeModalStep: any,
    setprofile: any
};

const SelectCountry: React.FC<_props> = ({ ChangeModalStep, setprofile }) => {

    const [countries, setCountries] = React.useState<Country[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<Country>();
    const [moreCountries, setMoreCountries] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);

    async function searchCountry(text: string) {
        if (text.length > 1) {
            GetCountriesList(text);
        }
        else if (text.length === 0) {
            await setCountries([]);
            setMoreCountries(true);
            GetCountriesList('');
        }
    };

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
    };

    React.useEffect(() => {
        GetCountriesList();
    }, []);

    return loading ? <div className='col-12 bg-primaryColor filter-[drop-shadow(-18px 20px 66px rgba(0, 0, 0, 0.17))] w-[690px] h-fit min-h-full rounded-0 sm:w-[90%] sm:min-h-fit '>
        <div className='col-12 flex flex-col items-center min-h-[350px] py-[53px] px-[60px] sm:py-[35px] sm:px-[37px] sm:h-fit sm:min-h-[221px] '>
            <Loading style={{ height: 40, minHeight: 0, margin: 'auto' }} />
        </div>
    </div>
        : <div className='col-12 bg-primaryColor filter-[drop-shadow(-18px 20px 66px rgba(0, 0, 0, 0.17))] w-[690px] h-fit min-h-full rounded-0 sm:w-[90%] sm:min-h-fit '>
            <div className='col-12 flex flex-col items-center min-h-[350px] py-[53px] px-[60px] sm:py-[35px] sm:px-[37px] sm:h-fit sm:min-h-[221px] '>
                <div className=' text-whiteText text-[24.3px] font-semibold leading-normal mb-[58px] sm:text-[16px] sm:font-bold sm:text-center sm:mb-[24px] '>
                    Please select your country for personalized pricing
                </div>
                <InfiniteScrollSelect title="Select country" data={countries} moreData={moreCountries} GetData={GetCountriesList} changeFilter={searchCountry} selectItem={setSelectedItem} />
                <button
                    onClick={() => SelectCountry()}
                    className='bg-background w-[228.9px] h-[48.7px] rounded-[10px] text-primaryColor text-[24.3px] font-bold mt-[58px] sm:w-[145.9px] sm:h-[31px] sm:text-[16px] sm:font-bold sm:mt-[25px] '
                    aria-label="select country button"
                >
                    Save & Continue
                </button>
            </div>
        </div>
};

export default SelectCountry;