-- Tabla Usuario
CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    Contraseña VARCHAR(200) NOT NULL,
    Ubicación VARCHAR(200),
    Teléfono VARCHAR(20)
);

-- Tabla Perro
CREATE TABLE Perro (
    id_perro SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Edad INT,
    Raza VARCHAR(50),
    Peso DECIMAL(5, 2),
    Foto TEXT,
    Comportamiento TEXT,
    CONSTRAINT fk_usuario_perro FOREIGN KEY (id_usuario)
        REFERENCES Usuario (id_usuario)
        ON DELETE CASCADE
);

-- Tabla Paseo
CREATE TABLE Paseo (
    id_paseo SERIAL PRIMARY KEY,
    id_perro INT NOT NULL,
    Fecha_hora TIMESTAMP NOT NULL,
    Ubicación_inicio VARCHAR(200),
    Precio DECIMAL(10, 2) NOT NULL,
    Capacidad INT NOT NULL,
    Estado_pendiente BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_perro_paseo FOREIGN KEY (id_perro)
        REFERENCES Perro (id_perro)
        ON DELETE CASCADE
);

-- Tabla Pago
CREATE TABLE Pago (
    id_pago SERIAL PRIMARY KEY,
    id_paseo INT NOT NULL,
    id_usuario INT NOT NULL,
    Cantidad DECIMAL(10, 2) NOT NULL,
    Fecha_pago TIMESTAMP NOT NULL,
    Metodo_pago VARCHAR(50),
    CONSTRAINT fk_paseo_pago FOREIGN KEY (id_paseo)
        REFERENCES Paseo (id_paseo)
        ON DELETE CASCADE,
    CONSTRAINT fk_usuario_pago FOREIGN KEY (id_usuario)
        REFERENCES Usuario (id_usuario)
        ON DELETE CASCADE
);
