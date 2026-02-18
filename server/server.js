import express from 'express';
import api from './src/routes/route.api.js';
import routerAuth from './src/routes/routesAuth.js';
import cors from 'cors'
import 'dotenv/config'





const PORT = process.env.PORT || 3032

const app = express();
app.use(cors())
app.use(express.json());



// app.use('/',api)
// app.use('/',routerAuth)







app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
