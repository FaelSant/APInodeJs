import jwt from "jsonwebtoken"

export const generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: "1d" })
}

export const decodeToken = async (token) => {
  let data = await jwt.verify(token, global.SALT_KEY)

  return data
}
export const authorize = (req, res, next) => {
  // Verificar se existe um token na requisição
  // Utilizado como middleware
  let token = req.body.token || req.query.token || req.headers["x-access-token"]
  if (!token) {
    res.status(401).json({
      message: "Acesso restrito"
    })
  } else {
    jwt.verify(token, global.SALT_KEY, (error, decoded) => {
      if (error) {
        res.status(401).json({
          message: "Token invalido"
        })
      } else {
        next()
      }
    })
  }
}

export const isAdmin = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"]

  if (!token) {
    res.status(401).json({
      message: "Token invalido"
    })
  } else {
    jwt.verify(token, global.SALT_KEY, (error, decoded) => {
      if (error) {
        res.status(401).json({
          message: "Token Invalido"
        })
      } else {
        if (decoded.roles.includes("admin")) {
          next()
        } else {
          res.status(403).json({
            message: "Essa funcionalidade é restrita aos administradores"
          })
        }
      }
    })
  }
}
