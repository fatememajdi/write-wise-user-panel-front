'use client';
import React from "react";
import { Select } from 'antd';
import { Chart } from "chart.js";

//--------------------------------------------styles
import styles from '../../styles/dashboard.module.css';

//--------------------------------------------components
import HeaderWithTitle from "../../components/headerWithTitle/headerWithTitle";
import DashboardBackground from "../../components/dashboardBackground/dashboardBackground";

const Dashboard: React.FC = () => {

    const handleChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };
    const [history, setHistory] = React.useState<boolean>(true);

    React.useEffect(() => {
        var ctx = (document.getElementById('myChart') as HTMLFormElement).getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["JAN 18", "FEB18", "MAR18", "APR18", "MAY18", "JUN18", "JUL18", "AUG18"],
                datasets: [{
                    data: [1, 4, 5, 4, 3, 8.5, 5, 6],
                    label: '',
                    borderColor: "#2E4057",
                    backgroundColor: "#FFFFFF",
                    fill: false,
                    lineTension: 0
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            fontSize: 7,
                            stepSize: 1
                        },
                        gridLines: {
                            borderDash: [1, 9],
                            color: "rgba(0, 0, 0, 0)",
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 7
                        },
                        gridLines: {
                            // color: "rgba(0, 0, 0, 0)",
                            // display:false
                        }
                    }],

                },
                legend: {
                    display: false
                },

            }
        });
    }, [])

    return (
        <DashboardBackground>
            <HeaderWithTitle title="Dashboard" />
            <div className={'col-12 ' + styles.dashboardContainer}>
                <div className={'col-lg-8 ' + styles.startWritingCard}>
                    <h2>
                        Torem ipsum ,<br />
                        consectetur adipiscing <br />elit.
                    </h2>
                    <button>
                        Start Writing
                    </button>
                </div>

                <div className={'col-lg-4 ' + styles.paymentCard}>
                    <div className={'col-12 ' + styles.paymentCardContent}>
                        <Select
                            size={'large'}
                            defaultValue='Payments'
                            onChange={handleChange}
                            style={{ width: 180 }}
                            options={[{ value: 'Payments', label: 'Payments' }]}
                        />

                        <div className={styles.paymentCardNumber}>
                            {' $ 32'}
                        </div>

                    </div>
                </div>

                <div className={'col-lg-6 ' + styles.historyCard}>
                    <div className={'col-12 ' + styles.historyCardContent}>
                        <div className={styles.historyCardTitle}>
                            {'History'}
                        </div>
                        {
                            history ?
                                <div className={styles.lastEssaysContainer}>
                                    {'Last essays'}
                                    <div className={'col-12 ' + styles.lastEssaysCard}>
                                        <div>
                                            <div className={styles.lastEssaysCardTitle}>{'essay date'}</div>
                                            <div className={styles.lastEssaysCardContent}>{'essay time'}</div>
                                        </div>
                                        <div className={styles.dateCircle}>
                                            {'6'}
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                </div>
                        }

                    </div>
                </div>

                <div className={'col-lg-6 ' + styles.progressChartCard}>
                    <div className={'col-9 ' + styles.progressChart}>
                        {'progress chart'}
                        <canvas className={styles.chart} id='myChart'></canvas>
                    </div>
                    <div>
                    </div>
                </div>

            </div>

        </DashboardBackground>)
};

export default Dashboard;