import axios from "axios";

const url = "http://localhost:3001/category";

const getAllBCategory = async () => {

    try {
      const res = await axios.get(`${url}/get-category`);
      return res.data.data;
  
    } catch (error) {
      return error;
    }
  }


  export {
    getAllBCategory
  }
 