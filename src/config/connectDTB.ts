import mongoose from 'mongoose';

const connectWithDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {}).then(() => {
            console.log('Connected with database ....');
        });
    } catch (error) {
        console.log('Error connecting to database', +error);
    }
};

export default connectWithDatabase;
