const express    = require('express');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors       = require('cors');
const path       = require('path');
const db         = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fitlife_secret_dev_2024';

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname)));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'fitness-landing.html'));
});


function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function requireAuth(req, res, next) {
  const token = req.cookies.fitlife_token;
  if (!token) return res.status(401).json({ error: 'No autenticado' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.clearCookie('fitlife_token');
    res.status(401).json({ error: 'Sesión expirada' });
  }
}

function setCookie(res, token) {
  res.cookie('fitlife_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  });
}


app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim())
    return res.status(400).json({ error: 'Ingresa tu nombre.' });
  if (!email || !/\S+@\S+\.\S+/.test(email))
    return res.status(400).json({ error: 'Ingresa un email válido.' });
  if (!password || password.length < 6)
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing)
    return res.status(409).json({ error: 'Este email ya está registrado.' });

  const hash = await bcrypt.hash(password, 10);
  const { lastInsertRowid } = db
    .prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
    .run(name.trim(), email.trim().toLowerCase(), hash);

  const token = createToken({ id: lastInsertRowid, name: name.trim(), email });
  setCookie(res, token);
  res.json({ name: name.trim(), email });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Completa todos los campos.' });

  const user = db
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email.trim().toLowerCase());

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });

  const token = createToken({ id: user.id, name: user.name, email: user.email });
  setCookie(res, token);
  res.json({ name: user.name, email: user.email });
});

app.post('/api/logout', (_req, res) => {
  res.clearCookie('fitlife_token');
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => {
  res.json({ name: req.user.name, email: req.user.email });
});


app.listen(PORT, () => {
  console.log(`FitLife server corriendo en http://localhost:${PORT}`);
});
