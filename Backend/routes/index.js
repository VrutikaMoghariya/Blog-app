var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');



/*______________  export all CONTROLLERS  ______________ */

const categoryController = require('../controller/category');
const blogController = require('../controller/blog');
const userController = require('../controller/users');
const adminController = require('../controller/admin');




/*_______________________________  USER Authentication_______________________________________ */


/******  user Register ******/

router.post('/register', userController.createUser);


/******  login  ******/

router.post('/login', userController.loginUser);


/******  get  ******/

router.get('/get-user' , userController.getUser);


/******  update ******/

// router.post('/update-user', userController.updateUser);


/******  delete ******/

// router.delete('/delete-user', userController.deleteUser);






/*_______________________________  Admin Authentication_______________________________________ */


/******  Admin Register ******/

router.post('/admin-register', adminController.createAdmin);


/******  Admin Login  ******/

router.post('/admin-login', adminController.loginAdmin);








/*_______________________________  CRUD OF CATEGORY ______________________________________ */

/******  Create ******/

router.post('/create-category', categoryController.createCategory);


/******  get ******/

router.get('/get-category', categoryController.getCategory);


/******  update ******/

router.post('/update-category', categoryController.updateCategory);


/******  delete ******/

router.delete('/delete-category', categoryController.deleteCategory);






/*_______________________________  CRUD OF BLOG _______________________________________ */

/******  Create ******/

router.post('/create-blog', upload.single('img') , blogController.createBlog);


/******  get ******/

router.get('/get-blog' , blogController.getBlog);

/******  get by user ******/
router.get('/get-blog-user', blogController.getuserBlog);

/******  update ******/

router.post('/update-blog', blogController.updateBlog);


/******  delete ******/

router.delete('/delete-blog', blogController.deleteBlog);



module.exports = router;
