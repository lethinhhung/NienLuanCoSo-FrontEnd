import DashboardLarge from './DashboardLarge';
import DashboardSmall from './DashboardSmall';
import { useWindowDimensions } from '~/hooks';

function Dashboard() {
    const { width } = useWindowDimensions();

    if (width > 700) {
        return <DashboardLarge />;
    } else {
        return <DashboardSmall />;
    }
}

export default Dashboard;
