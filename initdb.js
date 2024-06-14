const sql = require("better-sqlite3");
const db = sql("items.db");

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS items (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       answer INTEGER NOT NULL
    )
`
).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO items VALUES (
         null,
         @answer
      )
   `);
}

initData();
