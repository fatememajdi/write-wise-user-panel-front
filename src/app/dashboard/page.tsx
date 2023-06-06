import React from "react";
import { Select, Space } from 'antd';

//--------------------------------------------styles
import styles from '../../styles/dashboard.module.css';

//--------------------------------------------components
import HeaderWithTitle from "../../components/headerWithTitle/headerWithTitle";
import DashboardBackground from "../../components/dashboardBackground/dashboardBackground";
// const handleChange = (value: string) => {
//     console.log(`selected ${value}`);
// };

const Dashboard: React.FC = () =>
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
                    <Space wrap>
                        <Select
                            defaultValue="lucy"
                            style={{ width: 120 }}
                            // onChange={(value) => handleChange(value)}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                                { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </Space>
                </div>
            </div>

        </div>

    </DashboardBackground>;

export default Dashboard;