var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');



/*______________  export all CONTROLLERS  ______________ */

const categoryController = require('../controller/category');
const blogController = require('../controller/blog');
const userController = require('../controller/users');
const adminController = require('../controller/admin');



/*_______________________________  Get HOME Page _______________________________________ */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});




/*_______________________________  USER Authentication_______________________________________ */


/******  user Register ******/

router.post('/register', userController.createUser);


/******  get ******/

router.post('/login', userController.loginUser);


/******  update ******/

// router.post('/update-user', userController.updateUser);


/******  delete ******/

// router.delete('/delete-user', userController.deleteUser);






/*_______________________________  USER Authentication_______________________________________ */


/******  user Register ******/

router.post('/admin-register', adminController.createAdmin);


/******  get ******/

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

router.post('/create-blog', blogController.createBlog);


/******  get ******/

router.get('/get-blog' , blogController.getBlog);


/******  update ******/

router.post('/update-blog', blogController.updateBlog);


/******  delete ******/

router.delete('/delete-blog', blogController.deleteBlog);



module.exports = router;
