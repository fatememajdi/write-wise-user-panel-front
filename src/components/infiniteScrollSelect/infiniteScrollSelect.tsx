import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

//---------------------------------------styles
import styles from './infiniteScrollSelect.module.css';

//---------------------------------------icons
import { TiArrowSortedDown } from 'react-icons/ti';

//---------------------------------------types
import { Country } from '../../../types/profile';

//---------------------------------------components
const Loading = dynamic(() => import("@/components/loading/loading"));

type _props = {
    title: string,
    GetData: any,
    moreData: boolean,
    data: Country[],
    changeFilter: any,
    selectItem: any
}

const InfiniteScrollSelect: React.FC<_props> = ({ title, GetData, moreData, data, changeFilter, selectItem }) => {
    const [selectedItem, setSelectedItem] = React.useState<Country>();
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    return <AnimatePresence>
        <div className={styles.select}>
            <input
                onClick={() => setShowMenu(true)}
                type="text"
                onChange={(e) => {
                    setSelectedItem(null);
                    changeFilter(e.target.value);
                    if (!showMenu) {
                        setShowMenu(true);
                    }
                }}
                value={selectedItem?.commonName}
                placeholder={selectedItem ? selectedItem.commonName : title}></input>
            <motion.div
                animate={showMenu ? { transform: 'rotate(180deg)' } : {}}
                transition={{ type: "spring", duration: 0.5 }}
            >
                <TiArrowSortedDown className={styles.arrowIcon} onClick={() => setShowMenu(!showMenu)} />
            </motion.div>
            <motion.div
                animate={{ height: showMenu ? 150 : 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className={styles.selectItemsCard}
            >
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => GetData()}
                    hasMore={moreData}
                    loader={<Loading style={{ height: 40, minHeight: 0, marginTop: 5 }} />}
                    useWindow={false}
                    key={0}
                >
                    {
                        data.map((item, index) => <div onClick={() => { selectItem(item); setSelectedItem(item); setShowMenu(false) }}
                            className={styles.menuItem} key={index}>
                            <Image
                                src={item.flag}
                                alt="country flag"
                                height='20'
                                width='40'
                                loading="eager"
                                priority
                                className={styles.flagImage}
                            />
                            {item.commonName}</div>)
                    }
                </InfiniteScroll>
            </motion.div>
        </div>

    </AnimatePresence>
};

export default InfiniteScrollSelect