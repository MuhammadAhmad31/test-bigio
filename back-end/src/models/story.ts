import { Story } from "../types/story.type";
const dbPool = require("../config/database");

export const getAllStoryModel = (
  author?: string,
  title?: string,
  status?: string,
  category?: string
) => {
  let sqlQuery = "SELECT * FROM story";

  const filters = [];

  if (author) filters.push(`author LIKE '%${author}%'`);
  if (title) filters.push(`title LIKE '%${title}%'`);
  if (status) filters.push(`status = '${status}'`);
  if (category) filters.push(`category = '${category}'`);

  if (filters.length > 0) {
    sqlQuery += " WHERE " + filters.join(" AND ");
  }

  return dbPool.execute(sqlQuery);
};

export const getStoryByIdModel = async (id: string) => {
  const sqlQuery = `SELECT * FROM story WHERE id = ?`;
  const values = [id];

  try {
    const [rows] = await dbPool.execute(sqlQuery, values);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const createStoryModel = async (
  body: Story,
  file: Express.Multer.File | undefined
) => {
  const sqlQuery = `INSERT INTO story (title, author, synopsis, category, status, story_cover, tags) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    body.title,
    body.author,
    body.synopsis,
    body.category,
    body.status,
    file ? file.filename : null,
    body.tags,
  ];

  try {
    const [rows] = await dbPool.execute(sqlQuery, values);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const updateStoryModel = async (
  id: string,
  body: Story,
  file: Express.Multer.File | undefined
) => {
  const sqlQuery = `UPDATE story SET title = ?, author = ?, synopsis = ?, category = ?, status = ?, story_cover = ?, tags = ? WHERE id = ?`;
  const values = [
    body.title,
    body.author,
    body.synopsis,
    body.category,
    body.status,
    file ? file.filename : null,
    body.tags,
    id,
  ];
  try {
    const [rows] = await dbPool.execute(sqlQuery, values);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const deleteStoryModel = async (id: string) => {
  const sqlQuery = `DELETE FROM story WHERE id = ?`;
  const values = [id];

  try {
    const [rows] = await dbPool.execute(sqlQuery, values);
    return rows;
  } catch (error) {
    throw error;
  }
};
