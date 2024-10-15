const routes = {
    home: '/',
    login: '/login',
    dashboard: '/dashboard',
    courses: '/courses',
    terms: '/terms',
    profile: '/profile',
    newCourse: '/create-new-course',
    newTerm: '/create-new-term',
    course: '/course/:courseId',
    lesson: '/course/:courseId/:lessonId',
    term: '/term/:termId',
    statistics: '/course/:courseId/statistics/:statisticsId',
};

export default routes;
