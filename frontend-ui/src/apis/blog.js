import axios from "axios";

const url = "http://localhost:3001";
const userToken = localStorage.getItem("User-token");


const getAllBlogs = async () => {

  try {
    const res = await axios.get(`${url}/get-blog`);
    return res.data.data;
  } catch (error) {
    return error;
  }
}

const getUserBlog = async () => {

  try {
    const userToken = localStorage.getItem("User-token");
    const res = await axios.get(`${url}/get-user-blog`, {
      headers: {
        'authorization': userToken,
      },
    });

    return res.data.data;

  } catch (error) {
    return error;
  }
}

const createBlog = async (formData) => {

  try {
    const res = await axios.post(`${url}/create-blog`, formData, {
      headers: {
        'authorization': userToken,
      },
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
}


const updateBlog = async (editId, formData) => {

  try {
    const res = await axios.post(`${url}/update-blog?_id=${editId}`, formData, {
      headers: {
        'authorization': userToken,
      },
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
}


const deleteBlog = async (deleteId) => {

  try {
    const res = await axios.delete(`${url}/delete-blog?_id=${deleteId}`, {
      headers: {
        'authorization': userToken,
      }
    });
    return res.data.data;
  } catch (error) {
    return error;
  }
}

export {
  getUserBlog,
  getAllBlogs,
  updateBlog,
  createBlog,
  deleteBlog
}