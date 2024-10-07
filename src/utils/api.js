import axios from './axios.customize';

// Auth
const createUserApi = (name, email, password, description) => {
    const URL_API = '/v1/api/register';

    const data = {
        name,
        email,
        password,
        description,
    };

    return axios.post(URL_API, data);
};

const loginApi = (name, password) => {
    const URL_API = '/v1/api/login';

    const data = {
        name,
        password,
    };

    return axios.post(URL_API, data);
};

// Account
const getAccountInfoApi = () => {
    const URL_API = '/v1/api/account';
    return axios.get(URL_API);
};

const updateUserApi = async (formData) => {
    const URL_API = '/v1/api/update';

    try {
        const res = await axios.put(URL_API, formData);
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Tag
const createNewTagApi = async (name, color) => {
    const URL_API = '/v1/api/create-new-tag';

    const data = {
        name,
        color,
    };

    return axios.post(URL_API, data);
};

const getTagsInfoApi = async () => {
    const URL_API = '/v1/api/get-tags-info';

    return axios.get(URL_API);
};

const getTagsInfoByIdsApi = async (tagsIds) => {
    const URL_API = '/v1/api/get-tags-info-by-ids';

    const data = {
        tagsIds,
    };

    return axios.post(URL_API, data);
};

// Course

const createNewCourseApi = async (formData) => {
    const URL_API = '/v1/api/create-new-course';

    try {
        const res = await axios.post(URL_API, formData);
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getCourseInfoApi = async (courseId) => {
    const URL_API = '/v1/api/get-course-info';
    const data = {
        courseId,
    };

    return axios.post(URL_API, data);
};

const getCoursesInfoApi = async () => {
    const URL_API = '/v1/api/get-courses-info';

    return axios.get(URL_API);
};

const getCoursesInfoByIdsApi = async (coursesIds) => {
    const URL_API = '/v1/api/get-courses-info-by-ids';

    const data = {
        coursesIds,
    };

    return axios.post(URL_API, data);
};

// Term

const createNewTermApi = async (formData) => {
    const URL_API = '/v1/api/create-new-term';

    try {
        const res = await axios.post(URL_API, formData);
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getTermsInfoApi = async () => {
    const URL_API = '/v1/api/get-terms-info';

    return axios.get(URL_API);
};

const getTermInfoApi = async (termId) => {
    const URL_API = '/v1/api/get-term-info';

    const data = {
        termId,
    };

    return axios.post(URL_API, data);
};

export {
    createUserApi,
    loginApi,
    updateUserApi,
    getAccountInfoApi,
    createNewTagApi,
    getTagsInfoApi,
    getTagsInfoByIdsApi,
    createNewCourseApi,
    getCoursesInfoApi,
    getCourseInfoApi,
    getCoursesInfoByIdsApi,
    createNewTermApi,
    getTermsInfoApi,
    getTermInfoApi,
};
