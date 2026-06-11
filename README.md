# FitLife — Tu mejor versión

Aplicación web de fitness con autenticación de usuarios, calculadora de calorías personalizada y guías de nutrición y ejercicio.

---

## Descripción

FitLife es un proyecto frontend/backend desarrollado como parte del programa SENA. Ofrece información educativa sobre alimentación, rutinas de entrenamiento y salud integral, junto con una calculadora calórica basada en la fórmula Mifflin-St Jeor. Incluye un sistema de registro e inicio de sesión con sesiones persistentes.

---

## Características

- **Calculadora de calorías** — calcula tu requerimiento diario y distribución de macronutrientes (proteínas, carbohidratos y grasas) según tus datos y objetivo.
- **Guía de nutrición** — tabla de comidas ejemplo, macronutrientes principales y alimentos recomendados.
- **Rutina semanal** — plan de 7 días con tipo de entrenamiento por día.
- **Salud personalizada** — selecciona condiciones físicas actuales (dolor de rodilla, estrés, sedentarismo, etc.) y recibe recomendaciones al instante.
- **Autenticación completa** — registro, inicio de sesión y cierre de sesión con JWT almacenado en cookie HttpOnly.
- **Diseño responsive** — navegación con hamburguesa para móvil, layouts adaptables.

---

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3 (variables CSS, grid, flex), JavaScript vanilla |
| Backend | Node.js, Express 5 |
| Base de datos | SQLite vía `better-sqlite3` |
| Autenticación | JWT (`jsonwebtoken`) + cookies (`cookie-parser`) |
| Seguridad | Hash de contraseñas con `bcryptjs` |

---

## Requisitos

- Node.js 18 o superior
- npm

---

## Instalación y uso

```bash
# 1. Clonar o descargar el repositorio
git clone <url-del-repo>
cd loginfitnes

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start
```

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

Para desarrollo con recarga automática:

```bash
npm run dev
```

---

## Estructura del proyecto

```
loginfitnes/
├── index.html          # Interfaz principal (landing + calculadora + auth modal)
├── server.js           # Servidor Express (API REST + estáticos)
├── database.js         # Configuración y esquema de SQLite
├── fitlife.db          # Base de datos (generada automáticamente)
├── package.json
└── node_modules/
```

---

## API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/register` | Registrar nuevo usuario |
| `POST` | `/api/login` | Iniciar sesión |
| `POST` | `/api/logout` | Cerrar sesión |
| `GET` | `/api/me` | Obtener sesión activa (requiere auth) |

---

## Variables de entorno

| Variable | Valor por defecto | Descripción |
|----------|------------------|-------------|
| `PORT` | `3000` | Puerto del servidor |
| `JWT_SECRET` | `fitlife_secret_dev_2024` | Clave secreta para firmar tokens |

Para producción, define `JWT_SECRET` con un valor seguro antes de arrancar el servidor.

---

## Notas

- La información nutricional y de salud es de carácter **educativo**. Consulta a un profesional de la salud antes de realizar cambios en tu dieta o rutina.
- El proyecto fue desarrollado con ayuda de inteligencia artificial como apoyo en la estructura y lógica del código.

---

## Autor

Daniel Jiménez — Proyecto SENA Frontend
