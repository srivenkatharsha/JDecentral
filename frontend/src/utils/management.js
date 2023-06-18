import axios from "axios";

export const storeSession = (userName, isJournalist, password) => {
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('isJournalist', isJournalist);
}

export const checkUser = async () => {
    let userName = sessionStorage.getItem('userName');
    let baseUrl = "http://localhost:3000/validate"
    let obj = {"userName" : userName};
    const res = await axios.post(baseUrl,obj);
    const data = await res.data;
    return data['isSuccess'];
}

export const checkJournalist = async() => {
    let userName = sessionStorage.getItem('userName');
    let isJournalist = sessionStorage.getItem('isJournalist');
    let baseUrl = "http://localhost:3000/journalistStatus";
    let obj = {"userName" : userName, "isJournalist" : isJournalist};
    const res = await axios.post(baseUrl, obj);
    const data = await res.data;
    return data['type'];
}

export const clearSession = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('isJournalist');
}

