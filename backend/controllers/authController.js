import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import generarJWT from "../utils/generarJWT.js";
import { validateObjectId } from "../utils/index.js";

const register = async (req, res) => {
  const { nombre, email, password, rol, img } = req.body;

  if (!nombre || !email || !password) {
    return res
      .status(404)
      .json({ msg: "Todos los campos son obligatorios backend" });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ msg: "El usuario ya existe" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
      img,
    });
    res.status(200).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(404).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "El usuario no existe" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "La contraseña es incorrecta" });
    }

    res.status(200).json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      activo: user.activo,
      token: generarJWT(user),
      rol: user.rol,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const perfil = async (req, res) => {
  const { user } = req;
  res.json(user);
};

const refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ msg: "Refresh token no proporcionado" });
  }

  try {
    // Verificar y decodificar el refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Encontrar al usuario en la base de datos
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const tokens = generarJWT(user);

    // Generar nuevos tokens
    const newAccessToken = tokens.accessToken;
    const newRefreshToken = tokens.refreshToken;

    // Devolver los nuevos tokens
    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token de actualización inválido" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  if (!email) {
    return res.status(404).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "El usuario no existe" });
    }

    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `${process.env.FRONTEND_URL}/restablecer-contraseña?uid=${user._id}&token=${token}`;

    // TODO: CONECTARLO CON EL CORREO PARA ENVIAR CORREO CON EL LINK
    console.log(link);
    return res.status(200).json({ link });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;

  if (validateObjectId(id, res)) return;

  try {
    const user = await User.findById(id);

    const secret = process.env.JWT_SECRET + user.password;

    const payload = jwt.verify(token, secret);
    res.json({ email: user.email });

    if (!user) {
      return res.status(401).json({ msg: "El usuario no existe" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const sendResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;

  if (!password || !password2) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  if (password !== password2) {
    return res.status(400).json({ msg: "Las contraseñas no coinciden" });
  }

  if (validateObjectId(id, res)) return;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const secret = process.env.JWT_SECRET + user.password;

    try {
      const payload = jwt.verify(token, secret);

      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({ msg: "Contraseña actualizada" });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ msg: "El token ha expirado" });
      } else {
        return res.status(400).json({ msg: "Token inválido" });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Error del servidor" });
  }
};

export {
  register,
  login,
  perfil,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendResetPassword,
};
