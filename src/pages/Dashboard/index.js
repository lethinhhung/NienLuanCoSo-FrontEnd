import PageTitle from '~/components/PageTitle';
import DashboardLarge from './DashboardLarge';
import DashboardMedium from './DashboardMedium';
import DashboardSmall from './DashboardSmall';
import { useWindowDimensions } from '~/hooks';

function Dashboard() {
    const { width } = useWindowDimensions();

    if (width > 1150) {
        return (
            <div>
                <PageTitle title={'Dashboard'} />
                <DashboardLarge />
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
