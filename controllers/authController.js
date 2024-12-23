import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../server.js';


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {

    const existingUser = await client.query('SELECT id, username, email, password, FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    

    const result = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email', [username, email, hashedPassword]);
    const newUser = result.rows[0];

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const user = result.rows[0];


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }


    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

export const listUsers = async (req, res) => {
  try {
    const result = await client.query('SELECT id, username, email, created_at FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};
