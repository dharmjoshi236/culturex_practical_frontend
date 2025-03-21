import axios from "axios"

const baseUrl = import.meta.env.VITE_API_URL;

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    validateStatus: (status)=> true
});

const postRequest = async (apiUrl, reqBody, isAuth, headers={}) => {
    try {
        let getAuthToken = localStorage.getItem('token');
        let response
        if (isAuth) {
            response = await AxiosInstance.post(apiUrl, reqBody, {
                headers: {
                    Authorization: `Bearer ${getAuthToken}`,
                    ...headers,
                }
            });
        } else {
            response = await AxiosInstance.post(apiUrl, reqBody);
        }

        return response;
    } catch (error) {
        console.log('error in axios ', error);
        return error;
    }
}

const getRequest = async (apiUrl, isAuth)=> {
    try {
        let response;
        if (isAuth) {
            let authtoken = localStorage.getItem("token");
            response = await AxiosInstance.get(apiUrl, {headers: {
                Authorization: `Bearer ${authtoken}`
            }})
        } else {
            response = await AxiosInstance.get(apiUrl);
        }

        return response;
    } catch (error) {
        console.log('error in axios ', error);
        return error;
    }
}

export {
    postRequest,
    getRequest
}