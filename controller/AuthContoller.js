import pool from "../db/configDB.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
    console.log('llega al signup')
  try {
    // Verificar si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario con contraseña hasheada
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Verificar si el usuario existe
      const userFound = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userFound.rows.length === 0) {
        return res.status(400).json({ message: 'El usuario no existe' });
      }
      // Comparar la contraseña hasheada
      const passwordMatch = await bcrypt.compare(password, userFound.rows[0].password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
      // Crear un token JWT
      const payload = { userID: userFound.rows[0].id };
      const token = jwt.sign(payload, 'tu_secreto_aqui');
  
      // Configurar la cookie
      res.cookie('token', token, {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
      });
      console.log(userFound.rows[0])
      res.json(
        // mensaje: 'Inicio de sesión exitoso',
        userFound.rows[0],
        // token,
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  





