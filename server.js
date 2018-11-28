import express from 'express';
import dotenv from 'dotenv';
import parcelRouter from './src/routes/parcelRoute';
import authRouter from './src/routes/authRoute';
import userRouter from './src/routes/userRoute';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  next();
});
app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to home SendIT API', status: 200 }));


app.use('/api/v1/parcels', parcelRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);


// eslint-disable-next-line no-console
app.listen(port, () => console.log(`SendIT app listening on port ${port}!`));

export default app;
