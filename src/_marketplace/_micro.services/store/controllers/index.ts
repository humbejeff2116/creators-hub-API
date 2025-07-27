import { NextFunction, Request, Response } from 'express';
import storeManagementService from '../services/index.js';
import { Store } from '../../../types/store.js';

class Controller {
    async setUpVendorStore(store: Store, req:Request, res: Response) { 
        try {
            const storeResp = await storeManagementService.setUpStore(store);  
        } catch (err) {
            console.error(err);
            
        }
    }

    async listProduct(req:Request, res: Response) {
        const { product } = req.body; 
        try {
            const productResponse = await storeManagementService.createStoreProduct(product); 
        } catch (err) {
            console.error(err);
            
        }
    }

    async getStoreProducts(req:Request, res: Response, next: NextFunction) {
        const { storeId } = req.params; 
    }

    async getAllProducts(req:Request, res: Response, next: NextFunction) {

    }

    async getFeaturedProducts(req:Request, res: Response, next: NextFunction) {
        
    }

    async removeVendorStore(req:Request, res: Response, next: NextFunction) { 

    }
}

const storeManagementController = new Controller();
export default storeManagementController;