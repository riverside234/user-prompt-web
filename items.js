import sql from "better-sqlite3";

const db = sql("items.db");

export async function getItems() {
  return db.prepare("SELECT * FROM items").all();
}

export async function saveItems(answer) {
  db.prepare(
    `
      INSERT INTO items (answer) VALUES (@answer)
    `
  ).run({ answer });
}
