import config from '~/config';

// Layouts
import { DefaultLayout1 } from '~/layouts';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import Courses from '~/pages/Courses';
import Profile from '~/pages/Profile';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout1 },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.courses, component: Courses },
    { path: config.routes.profile, component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
