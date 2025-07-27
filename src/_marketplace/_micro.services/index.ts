import  { router as accountRoutes } from './account/routes/index.js';
import  { router as searchRoutes } from './search/routes/index.js';
import  { router as storeRoutes } from './store/routes/index.js';
import  { router as vendorRoutes } from './vendor/routes/index.js';
import   { router as walletRoutes }  from './wallet/routes/index.js';
import  { router as transactionRoutes } from './transaction/routes/index.js';
import  { router as notificationRoutes } from './notification/routes/index.js';
// import  { router as paymentRoutes } from './payment/routes/index.js';
import  { router as orderRoutes } from './order/routes/index.js';
// import  { router as reviewRoutes } from './review/routes/index.js';

export {
    accountRoutes,
    searchRoutes,
    storeRoutes,
    vendorRoutes,
    walletRoutes,
    transactionRoutes,
    notificationRoutes,
    // paymentRoutes,
    orderRoutes,
    // reviewRoutes
}