import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import AuthRouter from './routes/AuthRouter.js'
import ProtectedRouter from './routes/ProtectedRoute.js'
import userRoutes from './routes/user.js'
import adminRouter from './routes/adminRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
    authSource: 'admin'
})
.then(()=> console.log('Successfully Connected to MongoDB '))
.catch((err) => console.error('MongoDB connection error: ', err));



// default routes
app.get('/', (req, res) => {
    res.send('API is running...')
});

app.use('/auth', AuthRouter)
app.use('/protectedRoute', ProtectedRouter)

// Admin routes
app.use('/api/admin', adminRouter);

// custom routes
app.use('/api/user', userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})