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

const createCategory = async (data) => {
  try {
    const res = await axios.post(`${url}/create-category`, data);
    return res.data;
  } catch (error) {
    return error;
  }
}

const updateCategory = async (editId , data) =>{
  try {
    const res = await axios.post(`${url}/update-category?_id=${editId}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
}

const deleteCategory = async (deleteId) =>{
  try {
    const res = await axios.delete(`${url}/delete-category?_id=${deleteId}`);
    return res.data;
  } catch (error) {
    return error;
  }
}


export {
  getAllBCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
