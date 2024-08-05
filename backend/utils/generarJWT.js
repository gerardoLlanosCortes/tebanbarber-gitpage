import jwt from "jsonwebtoken";

const generarJWT = (user) => {
  // JWT expira en 7 días
  const accessToken = jwt.sign(
    { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Refresh token expira en 30 dias
  const refreshToken = jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return { accessToken, refreshToken };
};

export default generarJWT;
