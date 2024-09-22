import config from '~/config';

// Layouts

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import Courses from '~/pages/Courses';
import Terms from '~/pages/Terms';
import Profile from '~/pages/Profile';
import NewCourse from '~/pages/NewCourse';
import NewTerm from '~/pages/NewTerm';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.courses, component: Courses },
    { path: config.routes.terms, component: Terms },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.newCourse, component: NewCourse, layout: null },
    { path: config.routes.newTerm, component: NewTerm, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
