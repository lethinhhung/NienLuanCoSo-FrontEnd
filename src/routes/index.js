import config from '~/config';

// Layouts
import { CourseLayout, CreateNewObjectLayout } from '~/layouts';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import Courses from '~/pages/Courses';
import Terms from '~/pages/Terms';
import Profile from '~/pages/Profile';
import NewCourse from '~/pages/NewCourse';
import NewTerm from '~/pages/NewTerm';
import Course from '~/pages/Course';
import Lesson from '~/pages/Lesson';
import Term from '~/pages/Term';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.courses, component: Courses },
    { path: config.routes.terms, component: Terms },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.newCourse, component: NewCourse, layout: CreateNewObjectLayout },
    { path: config.routes.newTerm, component: NewTerm, layout: CreateNewObjectLayout },
    { path: config.routes.course, component: Course, layout: CourseLayout },
    { path: config.routes.lesson, component: Lesson, layout: CourseLayout },
    { path: config.routes.term, component: Term },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
