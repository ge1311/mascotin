export const CREATE_TABLES = `CREATE TABLE IF NOT EXISTS tbl_Categoria (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Titulo TEXT NOT NULL CHECK (LENGTH(Titulo) <= 20),
    Descripcion TEXT NOT NULL CHECK (LENGTH(Descripcion) <= 50),
    Boton TEXT NOT NULL CHECK (LENGTH(Boton) <= 10),
    Imagen TEXT,
    Activo BOOLEAN NOT NULL DEFAULT 1,
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP);

    
`;

export const INSERT_DEFAULT_DATA = `
  INSERT INTO tbl_Categoria (Titulo, Descripcion, Boton, Imagen, Activo)
  VALUES ('Ejemplo', 'Descripción de prueba', 'OK', NULL, 1);
`;
