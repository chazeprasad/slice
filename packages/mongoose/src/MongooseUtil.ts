import * as mongoose from 'mongoose';

export class MongooseUtil {
    static configureMongoose = async (url?: string, options?: any) => {
        const DB_URL = url || process.env.MONGODB_URI || '';

        try {
            await mongoose.connect(DB_URL, options);
        } catch (error) {
            console.log(error.message);
        }
    };
}
