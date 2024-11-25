import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/user.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    authSource: 'admin'
})
.then(()=> console.log('Successfully Connected to MongoDB '))
.catch((err) => console.error('MongoDB connection error: ', err));

// default routes
app.get('/', (req, res) => {
    res.send('API is running...')
});

// custom routes
app.use('/api/user', userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})