import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import AuthRouter from './routes/AuthRouter.js'
import ProtectedRouter from './routes/ProtectedRoute.js'
import userRoutes from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import reviewRouter from './routes/reviewRoutes.js'
import sessionRouter from './routes/sessionRoutes.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
const allowedOrigins = [
  'http://localhost:5174', // Admin frontend
  'http://localhost:5173', // Client frontend
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// app.use(cors({
//     origin: function (origin, callback) {
//       const regex = /^http:\/\/localhost:(517[3-9])$/;
//       if (regex.test(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   }));

// app.use(cors());
app.use(express.json());
app.use(cookieParser());

// mongoose.connect(process.env.MONGO_URI, {
//     authSource: 'admin'
// })
mongoose.connect('mongodb+srv://prithwionline11:prithwi@hobbyverse-cluster.9fu1u.mongodb.net/hobbyverse1?retryWrites=true&w=majority')
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

// Review routes
app.use('/api/reviews',reviewRouter);

// session routes
app.use('/api/sessions', sessionRouter);

// custom routes
app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})