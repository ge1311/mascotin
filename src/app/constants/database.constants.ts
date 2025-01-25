export const CREATE_TABLES = `CREATE TABLE IF NOT EXISTS tbl_Categoria (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Titulo TEXT NOT NULL CHECK (LENGTH(Titulo) <= 30),
    Descripcion TEXT NOT NULL CHECK (LENGTH(Descripcion) <= 100),
    Boton TEXT NOT NULL CHECK (LENGTH(Boton) <= 15),
    Imagen TEXT,
    Url TEXT NOT NULL CHECK (LENGTH(Titulo) <= 20),
    Activo BOOLEAN NOT NULL DEFAULT 1,
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP);`;

export const INSERT_DEFAULT_DATA = `
  INSERT INTO tbl_Categoria (Titulo, Descripcion, Boton, Imagen, Url, Activo)
  VALUES ('Salud y Cuidados', 'Aquí encontrarás contenidos sobre salud y cuidados para tu mascota!',
   'Foro de salud','veterinaria.png','salud', 1);

  INSERT INTO tbl_Categoria (Titulo, Descripcion, Boton, Imagen, Url, Activo)
  VALUES ('Reseñas de productos', 'Aquí encontrarás reseñas de productos para tu mascota.',
   'Foro de reseñas','reseñap.webp','resenas', 1);
   `;
