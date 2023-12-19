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
    selectItem: any,
    lightTheme?: boolean
}

const InfiniteScrollSelect: React.FC<_props> = ({ title, GetData, moreData, data, changeFilter, selectItem, lightTheme }) => {
    const [selectedItem, setSelectedItem] = React.useState<Country>();
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const [showList, setShowList] = React.useState<boolean>(false);

    return <AnimatePresence>
        <div style={lightTheme ? { backgroundColor: '#FFF', height: 62, width: 350 } : {}} className={styles.select}>
            <input
                style={lightTheme ? { color: '#172E4A' } : {}}
                onClick={() => {
                    setShowList(true);
                    setShowMenu(true)
                }}
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
                <TiArrowSortedDown style={lightTheme ? { color: '#172E4A' } : {}} className={styles.arrowIcon} onClick={() => {
                    setShowMenu(!showMenu);
                    if (!showList) {
                        setShowList(true);
                    }
                }} />
            </motion.div>

            {
                showList &&
                <motion.div
                    animate={{ height: showMenu ? 150 : 0, opacity: showMenu ? 1 : 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    style={lightTheme ? { top: 60, backgroundColor: '#FFF', color: '#172E4A' } : {}}
                    className={styles.selectItemsCard}
                >
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => GetData()}
                        hasMore={moreData}
                        loader={<Loading style={{ height: 60, minHeight: 0, marginTop: 5 }} />}
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
            }
        </div>

    </AnimatePresence>
};

export default InfiniteScrollSelect