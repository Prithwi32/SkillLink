import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import http from 'http';
import { Server } from 'socket.io';

import AuthRouter from './routes/AuthRouter.js'
import ProtectedRouter from './routes/ProtectedRoute.js'
import userRoutes from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import reviewRouter from './routes/reviewRoutes.js'
import sessionRouter from './routes/sessionRoutes.js'
import ReportedUserRouter from './routes/reportedUserRoutes.js'
import skillRouter from './routes/skillRoutes.js'
import chatRouter from './routes/chatRoutes.js'
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5174', 'http://localhost:5173', 'https://hobby-verse-ajnf.vercel.app'],
        methods: ['GET', 'POST'],
        credentials: true,
    }
});
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
const allowedOrigins = [
  'http://localhost:5174', // Admin frontend
  'http://localhost:5173', // Client frontend
  'https://hobby-verse-ajnf.vercel.app'
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

// reported user routes
app.use('/api/report-user', ReportedUserRouter);

// custom routes
app.use('/api/user', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/skills', skillRouter);
app.use('/api/chat', chatRouter);

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('join', (conversationId) => {
      socket.join(conversationId);
      console.log(`User joined conversation: ${conversationId}`);
    });
  
    socket.on('sendMessage', (data) => {
      io.to(data.conversationId).emit('message', data);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})