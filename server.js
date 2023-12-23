import express from 'express';
import pool from './db/configDB.js';
import { properties } from './db/initialProperties.js';
import routerAuth from './routes/auth/authRoutes.js';
import routerProperties from './routes/properties/index.js';
import routerMail from './utils/mail.js';
import cors from 'cors'

const app = express()
const port = 4001

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({extends:false}))
app.use('/auth', routerAuth)
app.use('/properties', routerProperties)
app.use('/', routerMail)

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});


app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
