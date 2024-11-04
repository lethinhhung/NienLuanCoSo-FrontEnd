import PageTitle from '~/components/PageTitle';
import DashboardLarge from './DashboardLarge';
import DashboardMedium from './DashboardMedium';
import DashboardSmall from './DashboardSmall';
import { useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import { getAllTestsInfoApi } from '~/utils/api';
import moment from 'moment';
import { Badge } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

function Dashboard() {
    const { width } = useWindowDimensions();

    const [testsInfo, setTestsInfo] = useState([]);

    const fetchInfo = async () => {
        const testsData = await getAllTestsInfoApi();
        setTestsInfo(testsData);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const dateCellRender = (value) => {
        const date = value.format('YYYY-MM-DD');
        const testDates = testsInfo.map((test) => {
            return moment(test.date).format('YYYY-MM-DD');
        });

        return testDates.includes(date) ? <Badge dot={'success'} /> : null;
    };

    if (width > 1150) {
        return (
            <div>
                <PageTitle title={'Dashboard'} />
                <DashboardLarge dateCellRender={dateCellRender} testsInfo={testsInfo} />
            </div>
        );
    } else if (width <= 1150 && width > 850) {
        return (
            <div>
                <PageTitle title={'Dashboard'} />
                <DashboardMedium />
            </div>
        );
    } else {
        return (
            <div>
                <PageTitle title={'Dashboard'} />
                <DashboardSmall />
            </div>
        );
    }
}

export default Dashboard;
