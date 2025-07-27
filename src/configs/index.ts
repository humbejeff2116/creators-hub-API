
import { config } from "dotenv";
config();
// const nodeEnv = process.env.NODE_ENV || 'development';

export interface MongoDbOptions {
    useNewUrlParser: boolean,
    useUnifiedTopology: boolean,
    useCreateIndex: boolean,
    useFindAndModify: boolean
}

interface Db {
    mongoDbOptions: MongoDbOptions,
    mongoLocalURI: string,
    mongoCloudURI: string,
    mongoProdDbURI: () => string,
    mongoDevDbURI: () => string,
    mongoDatabaseURI: () => string 
}

interface App {
    port: number
    url: string
}

interface Secret {
    cookieSecret: string,
    sessionSecret: string,
    jwtSecret: string,
    pssrptJwtSecret: string
}

interface CorsOptions {
    credentials: boolean
    origin: string
    optionsSuccessStatus: number
}

interface Config {
    app: App
    secret: Secret
    corsOptions: CorsOptions
    db: Db
}

const configs: Config = {
    app: {
        port: parseInt(process.env.API_PORT),
        url: process.env.SITE_URL
    },
    secret: {
        cookieSecret: process.env.COOKIE_SECRET,
        sessionSecret: process.env.SESSION_SECRET,
        jwtSecret: process.env.JWT_SECRET,
        pssrptJwtSecret: process.env.PSSRPT_JWT_SECRET
    },
    corsOptions: {
        credentials: true,
        origin: process.env.CORS_ORIGIN_URL,
        optionsSuccessStatus: 200
    },
    db: {
        mongoDbOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        },
        mongoLocalURI: `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`,
        // TODO... replace appName=Cluster0 query parameter to the appropriate one
        mongoCloudURI: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
        mongoProdDbURI: function (): string {
            return this.mongoCloudURI;
        },
        mongoDevDbURI: function (): string {
            return this.mongoLocalURI;
        },
        /**
         * sets database URI according to environment nodejs is running in
         */
        mongoDatabaseURI: function (): string {
            // return nodeEnv === 'production' ? this.mongoProdDbURI() : this.mongoDevDbURI();
            return this.mongoProdDbURI();
        }
    },
}
export default configs;