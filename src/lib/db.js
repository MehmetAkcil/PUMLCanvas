// src/db.js
import Dexie from 'dexie';

const db = new Dexie('projectDatabase');
db.version(1).stores({
    projects: '++id, name, content, createdAt'
});

export default db;
