const express=require("express");
const { newOrder, getsingleOrder, myOrder, getAllOrder, UpdateOrder, Delete_Order } = require("../control/OrderControler");
const { isAuthenticatedUser, authoriseRoll } = require("../middleware/auth");

const router=express.Router()
router.route("/order/new").post(isAuthenticatedUser,newOrder)
router.route("/order/:id").get(isAuthenticatedUser,getsingleOrder);
router.route("/orde/me").get(isAuthenticatedUser,myOrder);
router.route("/admin/order").get(isAuthenticatedUser,authoriseRoll("admin"),getAllOrder);
router.route("/admin/order/:id").put(isAuthenticatedUser,authoriseRoll("admin"),UpdateOrder).delete(isAuthenticatedUser,authoriseRoll("admin"),Delete_Order)
module.exports=router