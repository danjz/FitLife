const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// En Railway usamos /data (volumen persistente); en local, la carpeta del proyecto
const DATA_DIR = process.env.RAILWAY_VOLUME_MOUNT_PATH || __dirname;
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'fitlife.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT    NOT NULL,
    email    TEXT    NOT NULL UNIQUE,
    password TEXT    NOT NULL,
    created  INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
  )
`);

module.exports = db;
