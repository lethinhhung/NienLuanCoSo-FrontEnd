import { Flex, Card, Row, Col } from 'antd';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import DashboardLarge from './DashboardLarge';
import DashboardSmall from './DashboardSmall';
import { useWindowDimensions } from '~/hooks';

function Dashboard() {
    const cx = classNames.bind(styles);

    const { width } = useWindowDimensions();

    if (width > 700) {
        return <DashboardLarge />;
    } else {
        return <DashboardSmall />;
    }
}

export default Dashboard;
