var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');




/*______________  Export All Controller  ______________ */

const categoryController = require('../controller/category');
const blogController = require('../controller/blog');
const userController = require('../controller/users');
const adminController = require('../controller/admin');




/*_______________________________  User Authentication ___________________________________ */

/******  User Register ******/

router.post('/register', userController.createUser);


/****** User Login  ******/

router.post('/login', userController.loginUser);


/******  Get  ******/

router.get('/get-user' , userController.getUser);


/******  Update ******/

router.post('/update-user', userController.updateUser);


/******  Delete ******/

router.delete('/delete-user', userController.deleteUser);




/*_______________________________  Admin Authentication_______________________________________ */

/******  Admin Register ******/

router.post('/admin-register', adminController.createAdmin);


/******  Admin Login  ******/

router.post('/admin-login', adminController.loginAdmin);

 


/*_____________________________  CRUD OF CATEGORY _____________________________________ */

/******  Create ******/

router.post('/create-category', categoryController.createCategory);


/******  Get ******/

router.get('/get-category', categoryController.getCategory);


/******  Update ******/

router.post('/update-category', categoryController.updateCategory);


/******  Delete ******/

router.delete('/delete-category', categoryController.deleteCategory);




/*_______________________________  CRUD OF BLOG _______________________________________ */

/******  Create ******/

router.post('/create-blog', upload.single('img') , blogController.createBlog);


/******  Get ******/

router.get('/get-blog' , blogController.getBlog);


/******  Get by User ******/
router.get('/get-blog-user', blogController.getuserBlog);


/******  Update ******/

router.post('/update-blog', blogController.updateBlog);


/******  Delete ******/

router.delete('/delete-blog', blogController.deleteBlog);


module.exports = router;
