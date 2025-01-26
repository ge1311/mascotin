export const CREATE_TABLES = `CREATE TABLE IF NOT EXISTS tbl_Categoria (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Titulo TEXT NOT NULL CHECK (LENGTH(Titulo) <= 30),
    Descripcion TEXT NOT NULL CHECK (LENGTH(Descripcion) <= 100),
    Boton TEXT NOT NULL CHECK (LENGTH(Boton) <= 15),
    Imagen TEXT,
    Url TEXT NOT NULL CHECK (LENGTH(Titulo) <= 20),
    Activo BOOLEAN NOT NULL DEFAULT 1,
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP);
    
    CREATE TABLE IF NOT EXISTS tbl_Usuario (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombres TEXT NOT NULL,
    Nickname TEXT NOT NULL UNIQUE,
    Correo TEXT NOT NULL UNIQUE,
    Telefono NUMERIC(15),
    Foto_Perfil TEXT,
    Admin BOOLEAN NOT NULL DEFAULT 1,
    Activo BOOLEAN NOT NULL DEFAULT 1);
    
    CREATE TABLE tbl_Articulo (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Id_Categoria INTEGER NOT NULL,
    Id_Usuario INTEGER NOT NULL,
    Titulo_Articulo TEXT(50) NOT NULL,
    Imagen TEXT,
    Descripcion TEXT(500),
    Activo BOOLEAN NOT NULL DEFAULT 1,
    Fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_Categoria) REFERENCES tbl_Categoria(Id),
    FOREIGN KEY (Id_Usuario) REFERENCES tbl_Usuario(Id)
);
    
    `;

export const INSERT_DEFAULT_DATA = `
INSERT INTO tbl_Categoria (Titulo, Descripcion, Boton, Imagen, Url, Activo)
VALUES ('Salud y Cuidados', 'Aquí encontrarás contenidos sobre salud y cuidados para tu mascota!',
  'Foro de salud','veterinaria.png','salud', 1);

INSERT INTO tbl_Categoria (Titulo, Descripcion, Boton, Imagen, Url, Activo)
VALUES ('Reseñas de productos', 'Aquí encontrarás reseñas de productos para tu mascota.',
  'Foro de reseñas','reseñap.webp','resenas', 1);

INSERT INTO tbl_Usuario (Nombres, Nickname, Correo, Telefono, Foto_Perfil, Activo, Admin) 
VALUES 
('Juan Pérez', 'Usuario123', 'juan.perez@email.com', 1234567890, 'avatarp.jpg', 1,1),
('María López', 'Marla77', 'maria.lopez@email.com', 987654321, 'avatar2.jpg', 1,0),
('Carlos Gómez', 'Esteb4nZ', 'carlos.gomez@email.com', 312456789, 'avatar3.jpg', 1,0);

INSERT INTO tbl_Articulo (Id_Categoria, Id_Usuario, Titulo_Articulo, Imagen, Descripcion, Activo)
VALUES 
(1, 1, 'Vacunas', 'salud1.jpg', 'Malvavisco con sus vacunas al dia, recordar gente que se deben vacunar todos los años a sus peludos.', 1),
(1, 2, 'Cepillo a vapor', 'salud2.jpg', 'Mirad cómo quedó mi gatita después de la operación, le puse esta camisita para que no se rasque ni toque la zona.
        Parece una pequeña enfermera, pero sé que esto la va a ayudar a mantenerse cómoda y a no estresarse.', 1),
(1, 3, 'Shampoo', 'salud3.jpg', 'Recuerda, no bañes a tu perro todos los días. El baño frecuente puede eliminar los aceites naturales de su piel,
         lo que podría causar irritaciones. Lo ideal es bañarlos cada 3-4 semanas, o según lo necesiten.', 1),
(2, 1, 'Comida preparada', 'reseña1.jpg', 'Gente ¿ustedes les preparan comida húmeda a sus mascotas?', 1),
(2, 2, 'Cepillo a vapor', 'reseña2.jpg', 'Le compre un cepillo a vapor a shifu por amazon y me encanta, le deja el pelo muy suave.', 1),
(2, 3, 'Shampoo', 'reseña3.webp', 'Me encanta el shampoo de esta marca, se lo recomiendo a todos, huele riquisimo!!', 1);

   `;
