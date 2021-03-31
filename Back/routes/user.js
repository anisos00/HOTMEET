const express = require('express')

const { userById, allUsers, getUser, updateUser, deleteUser, userPhoto, addFollowing, addFollower, removeFollowing, removeFollower, updateUserRn , editUser } = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');


const router = express.Router();

router.put('/user/follow', requireSignin, addFollowing, addFollower);    
router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower );    

router.get("/users", allUsers);                          // get all users
router.get("/user/:userId", requireSignin, getUser);    //gets user by id
router.put("/user/:userId", requireSignin, updateUser); // updates picture
router.put("/rn/user/:userId", requireSignin, updateUserRn); //updates picture

router.put("/user/update/:userId", requireSignin, editUser); //update all credentials




router.delete("/user/:userId", requireSignin, deleteUser);

//photo
router.get("/user/photo/:userId", userPhoto);

// follow suggestions


// any route containing :userId, this is execute first
router.param("userId", userById);

module.exports = router;