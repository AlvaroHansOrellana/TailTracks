CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    ubicacion VARCHAR(100)
);

-- Crear la tabla Perro
CREATE TABLE Perro (
    id_perro SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    edad INT,
    raza VARCHAR(100),
    peso DECIMAL(5, 2),
    comportamiento VARCHAR(255),
    foto TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario) ON DELETE CASCADE
);

-- Crear la tabla Paseo
CREATE TABLE Paseo (
    id_paseo SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    ubicacion_inicio VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    capacidad INT NOT NULL,
    estado_pendiente BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario) ON DELETE CASCADE
);

-- Crear la tabla Reserva
CREATE TABLE Reserva (
    id_reserva SERIAL PRIMARY KEY,
    id_paseo INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_paseo) REFERENCES Paseo (id_paseo) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario) ON DELETE CASCADE
);

-- Crear la tabla Pago
CREATE TABLE Pago (
    id_pago SERIAL PRIMARY KEY,
    id_paseo INT NOT NULL,
    id_usuario INT NOT NULL,
    cantidad DECIMAL(10, 2) NOT NULL,
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pago VARCHAR(50),
    FOREIGN KEY (id_paseo) REFERENCES Paseo (id_paseo) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario) ON DELETE CASCADE
);