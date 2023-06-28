import React from 'react';

//------------------------------------styles
import styles from './pagination.module.css';

interface _props {
    currentPage: number,
    lenght: number,
    color: string,
    className?: any
};

export function Pagination({ currentPage, lenght, color, className }: _props) {

    const circles = () => {
        let circles = [];
        for (let i = 1; i <= lenght; i++)
            if (currentPage === i)
                circles.push(<div style={{ backgroundColor: color }} className={styles.circle} key={i} />);
            else
                circles.push(<div style={{ backgroundColor: 'rgba(217, 217, 217, 1)' }} className={styles.circle} key={i} />);
        return circles
    }

    return <div className={styles.paginationCard + ' ' + className}>
        {circles()}
    </div>
};