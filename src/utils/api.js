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

// Course

const createNewCourseApi = async (emoji, color, cover, name, description, tags, term, startDate, endDate) => {
    const data = {
        emoji,
        color,
        cover,
        name,
        description,
        tags,
        term,
        startDate,
        endDate,
    };
    const URL_API = '/v1/api/create-new-course';

    try {
        const res = await axios.post(URL_API, data);
        return res;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getCoursesInfoApi = async () => {
    const URL_API = '/v1/api/get-courses-info';

    return axios.get(URL_API);
};

export {
    createUserApi,
    loginApi,
    updateUserApi,
    getAccountInfoApi,
    createNewTagApi,
    getTagsInfoApi,
    createNewCourseApi,
    getCoursesInfoApi,
};
