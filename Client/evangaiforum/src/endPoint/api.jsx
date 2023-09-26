let BaseURL="http://localhost:5000/api/v1";
import axios from 'axios'


const endPoint={
    LOGIN:`${BaseURL}/login`,
    SIGNUP:`${BaseURL}/signup`,
    ME:`${BaseURL}/me`,
    QUESTIONS:`${BaseURL}/questions`
};

let axiosInstance=axios.create({
   baseURL:BaseURL,
});

export {endPoint,axiosInstance}