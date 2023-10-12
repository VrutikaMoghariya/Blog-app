import axios from "axios";

const url = "http://localhost:3001/user";

const userLogIn = async (data) => {

    const res = await axios.post(`${url}/login`, data);
    localStorage.setItem('User-token', res.data.token);
    return res;
}

const userSignUp = async (data) => {
    try {
        const res = await axios.post(`${url}/register`, data);
        return res.data;
    } catch (error) {
        return error;
    }
}

const getAllUser = async () => {
    try {
        const res = await axios.get(`${url}/get-user`);
        return res.data.data;
    } catch (error) {
        return error;
    }
}

export {
    userLogIn,
    userSignUp,
    getAllUser
}