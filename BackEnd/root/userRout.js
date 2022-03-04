const express=require("express");
const { registUser, loginUser, logOut, forgotPassword, ResetPassword, getUserDetail, updateUserPasss, updateUserProfile, getAllUser, getSingleUser, updateUserRole, DeleteUser } = require("../control/userControler");
const { isAuthenticatedUser, authoriseRoll } = require("../middleware/auth");
const router=express.Router();

router.route("/user").post(registUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(ResetPassword);
router.route("/logout").get(logOut);
router.route("/me").get(isAuthenticatedUser,getUserDetail)
router.route("/password/update").put(isAuthenticatedUser,updateUserPasss)
router.route("/me/update").put(isAuthenticatedUser,updateUserProfile)
router.route("/admin/users").get(isAuthenticatedUser,authoriseRoll("admin"),getAllUser)
router.route("/admin/users/:id").get(isAuthenticatedUser,authoriseRoll("admin"),getSingleUser)
.put(isAuthenticatedUser,authoriseRoll("admin"),updateUserRole)
.delete(isAuthenticatedUser,authoriseRoll("admin"),DeleteUser)

module.exports=router;