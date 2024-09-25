import DashboardLarge from './DashboardLarge';
import DashboardMedium from './DashboardMedium';
import DashboardSmall from './DashboardSmall';
import { useWindowDimensions } from '~/hooks';

function Dashboard() {
    const { width } = useWindowDimensions();

    if (width > 1150) {
        return <DashboardLarge />;
    } else if (width <= 1150 && width > 850) {
        return <DashboardMedium />;
    } else {
        return <DashboardSmall />;
    }
}

export default Dashboard;
