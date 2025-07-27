import http from 'node:http';
import express from 'express';
import morganLogger from 'morgan';
import path from 'node:path';
import session from 'express-session';
import cookie from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { connectToCacheStore, sessionRedisStore } from './src/_marketplace/cache/index.js';
import { 
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
} from './src/_marketplace/_micro.services/index.js';
import { 
    errorLogerHandler, 
    finalErrorHandler, 
    handleUncaughtExceptions, 
    notFoundHandler, 
    operationalErrorHandler 
} from './src/_marketplace/lib/logs/middlewares/index.js';
import configs from './src/configs/index.js';
import connectToDatabase, { dbTypes } from './src/lib/database/index.js';


const app = express();
const server = http.createServer(app);
const port = configs.app.port || 4000;
const corsOptions = configs.corsOptions;
// const __dirname = define__dirname();
const API_VERSION = '/api/v1';

app.disable('x-powered-by');
// enable this if you run server behind a proxy (e.g. nginx)
// app.set('trust proxy', 1);

app.use(helmet());
app.use(morganLogger('dev'));
app.use(cors(corsOptions));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookie(configs.secret.cookieSecret));
app.use(session({
    store: sessionRedisStore,
    secret: configs.secret.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: false,
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 2 // expires after 2 hours
    }
}));


app.use(express.static(path.join(process.cwd(), 'public')));
app.use(API_VERSION, accountRoutes);
app.use(API_VERSION, searchRoutes);
app.use(API_VERSION, storeRoutes);
app.use(API_VERSION, vendorRoutes);
app.use(API_VERSION, walletRoutes);
app.use(API_VERSION, transactionRoutes);
app.use(API_VERSION, notificationRoutes);
app.use(API_VERSION, orderRoutes);

// error handlers
app.use(notFoundHandler);
app.use(errorLogerHandler);
app.use(operationalErrorHandler);
app.use(finalErrorHandler);
handleUncaughtExceptions(server);

connectToDatabase(dbTypes.mongoDB);
connectToCacheStore();
server.listen(port, () => {
    return console.log(`app is listening at http://localhost:${port}`);
});