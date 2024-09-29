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

const updateUser = (discription, avatarFile) => {
    const formData = new FormData();
    formData.append('discription', discription);
    formData.append('avatar', avatarFile);

    const URL_API = '/v1/api/update';

    try {
        const response = axios.put(URL_API, formData);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

export { createUserApi, loginApi, updateUser };
