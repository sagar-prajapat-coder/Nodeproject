import express from "express";
import { AuthServices } from "../Controllers/UserController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
import upload from "../Middlewares/upload.js";
import { LocationServices } from "../Controllers/LocationController.js";



const router = express(); 
router.get("/", LocationServices.renderHomePage);
router.post("/create-user", AuthServices.createUser);
router.post("/login", AuthServices.login);


// Protected Routes (Apply middleware to all routes inside this group)
router.use(authMiddleware);

router.get("/profile", AuthServices.getUserProfile);
router.post("/update-profile", AuthServices.updateProfile);
router.delete("/delete-user",AuthServices.deleteUser);



export default router; 

