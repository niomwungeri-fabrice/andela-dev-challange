import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import parcelRouter from './src/routes/parcelRoute';
import authRouter from './src/routes/authRoute';
import userRouter from './src/routes/userRoute';
import Auth from './src/middleware/Authentication';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to home SendIT API', status: 200 }));


app.use('/api/v1/parcels', Auth.verifyToken, parcelRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', Auth.verifyToken, userRouter);


// eslint-disable-next-line no-console
app.listen(port, () => console.log(`SendIT app listening on port ${port}!`));

export default app;
