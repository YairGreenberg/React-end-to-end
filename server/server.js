import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import terrorRouter from './src/routes/terror.routes.js'; // ניצור אותו עכשיו

const PORT = 3033;
const app = express();

app.use(cors());
app.use(express.json());

// חיבור הראוטר של הפרויקט
app.use('/api', terrorRouter);

app.get('/', (req, res) => {
  res.send('Terror Dataset Server is Running!');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});