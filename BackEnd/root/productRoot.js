const express=require("express");
const { getAllProducts, createProduct, updateProduct, deletProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../control/productControler");
const { isAuthenticatedUser, authoriseRoll } = require("../middleware/auth");

const router=express.Router();

router.route("/product").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,authoriseRoll("admin"),createProduct);
router.route("/product/:id").put(isAuthenticatedUser,authoriseRoll("admin"),updateProduct)
router.route("/product/:id").delete(isAuthenticatedUser,authoriseRoll("admin"),deletProduct)
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/review").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)
module.exports=router