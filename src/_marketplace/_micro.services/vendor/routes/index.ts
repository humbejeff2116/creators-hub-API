import { Router } from "express";
import vendorManagementController from '../controllers/index.js';
const router = Router();


router.use(
    '/vendor/apply', 
    // authMiddleWare.authVendor, 
    vendorManagementController.applyVendor
);

export {
    router
}