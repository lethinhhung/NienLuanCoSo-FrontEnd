import axios from './axios.customize';

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

const createNewTagApi = async (name, color) => {
    const URL_API = '/v1/api/create-new-tag';

    const data = {
        name,
        color,
    };

    return axios.post(URL_API, data);
};

export { createUserApi, loginApi, updateUserApi, getAccountInfoApi, createNewTagApi };
