import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
})

instance.interceptors.request.use((config)=>{

    const lang = localStorage.getItem('lang') || 'am';
    const token = localStorage.getItem('token') || null;

    config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept-Language': lang,
        ...(config.headers || {})
    };

    return config;
}

)


export default instance