import axios from "axios";

const url = "https://blog-app-iicz.onrender.com/admin";

const adminLogIn = async (data) => {
    const res = await axios.post(`${url}/admin-login`, data);
    return res;
}

const adminSignUp = async (data) => {
        const res = await axios.post(`${url}/admin-register`, data);
        return res;
}

const getAllAdmin = async () => {
    try {
        const res = await axios.get(`${url}/get-admin`);
        return res.data.data;
    } catch (error) {
        return error;
    }
}

export {
    adminLogIn,
    adminSignUp,
    getAllAdmin

}