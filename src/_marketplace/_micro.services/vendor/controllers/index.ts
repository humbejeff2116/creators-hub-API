import { NextFunction, Request, Response } from 'express';
import vendorManagementService from '../services/index.js';
import storeManagementService from '../../store-management/services/index.js';
import { APIError, HttpStatusCode } from '../../logs/errorHandler.js';

class Controller {
    async applyVendor(req:Request, res: Response, next: NextFunction) {
        const { vendor } = req.body;

        try {
            const applyResponse = await vendorManagementService.applyVendor(vendor);
            return res.status(200).json(applyResponse);
        } catch { 
            next(new APIError('Apply vendor Error', HttpStatusCode.INTERNAL_SERVER));       
        }
    }

    async approveVendor(req:Request, res: Response, next: NextFunction) { 
        const { vendorId, status } = req.body;

        try {
            const approveVendor = await vendorManagementService.approveVendor(vendorId, status);
            const setupVendorStore = await storeManagementService.setUpStore(approveVendor.data);
            
            const jsonResponse = {
                status: 200,
                error: false,
                data: setupVendorStore.data,
                message: 'Approved vendor successfully',
            }
            return res.status(200).json(jsonResponse); 
        } catch (err) {
            next(err);
        }    
    }

    async getVendor(req:Request, res: Response, next: NextFunction) {
        const { vendorId } = req.params
        try {
            const vendor = await vendorManagementService.getVendor(vendorId);

            const jsonResponse = {
                status: 200,
                error: false,
                data: vendor,
                message: 'Vendor gotten successfully',
            }
            return res.status(200).json(jsonResponse);

        } catch (err) {
            next(err);
        } 
    }

    async subscribeVendor(req:Request, res: Response, next: NextFunction) { 
        const { vendorId } = req.params;
        const { subscription } = req.body;
        try {
            const subscribeVendorResp = await vendorManagementService.createVendorSubscription(vendorId, subscription);

            return res.status(200).json(subscribeVendorResp);
        } catch (err) {
            next(err);
        } 
    }

    // TODO... implement commented code functionality when needed

    // async suspendVendor(req:Request, res: Response) {
    //     try {
    //         const approveVendor = await vendorManagementService.(vendorId);

    //     } catch (err) {
    //         next(err);
    //     } 
    // }

    // async disableVendor(req:Request, res: Response, next: NextFunction) {
    //     try {
    //         const disableVendor = await vendorManagementService.;
    //         return res.status(200).json(approveVendor.)
    //     } catch (err) {
    //         next(err);
    //     } 
    // }

    // async deactivateVendor(req:Request, res: Response, next: NextFunction) {
    //     try {
    //         const approveVendor = await vendorManagementService.getVendor(vendorId);

    //     } catch (err) {
    //         next(err);
    //     } 
    // }
}

const vendorManagementController = new Controller();
export default vendorManagementController;