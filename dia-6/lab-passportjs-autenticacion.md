# Laboratorio: Autenticación con PassportJS y JWT

## Objetivo
Implementar autenticación básica con PassportJS usando estrategia JWT en una API Express.

## Requisitos previos
- Node.js instalado
- Conocimientos de Express.js
- Editor de código (VS Code)

## Configuración inicial

Crear proyecto e instalar dependencias:

```bash
npm init -y
npm install express passport passport-jwt jsonwebtoken bcrypt
```

Añadir en `package.json`:
```json
{
  "type": "module"
}
```

## Implementación

### 1. Configurar estrategia JWT

**passport-config.js**
```javascript
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const SECRET_KEY = 'tu_clave_secreta_segura';

const users = [
  { id: 1, username: 'admin', password: '$2b$10$...' }
];

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

export const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  const user = users.find(u => u.id === payload.id);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
});

export { SECRET_KEY };
```

### 2. Crear rutas de autenticación

**routes/auth.js**
```javascript
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { SECRET_KEY } from '../passport-config.js';

const router = express.Router();

const users = [
  { id: 1, username: 'admin', password: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' } // password: admin123
];

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  
  res.json({ token });
});

// Ruta protegida
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
```

### 3. Servidor principal

**server.js**
```javascript
import express from 'express';
import passport from 'passport';
import { jwtStrategy } from './passport-config.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(express.json());
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use('/api/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
```

## Pruebas

### 1. Iniciar servidor
```bash
node server.js
```

### 2. Obtener token (Login)
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Respuesta:
```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

### 3. Acceder a ruta protegida
```bash
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

Respuesta:
```json
{"user":{"id":1,"username":"admin"}}
```

## Generar hash de contraseña

Para crear nuevos usuarios, genera el hash:

```javascript
import bcrypt from 'bcrypt';

const password = 'mipassword';
const hash = await bcrypt.hash(password, 10);
console.log(hash);
```

## Referencias

- [PassportJS Documentation](http://www.passportjs.org/)
- [passport-jwt Strategy](https://github.com/mikenicholson/passport-jwt)
- [JWT.io](https://jwt.io/)
- [Express.js Guide](https://expressjs.com/)
