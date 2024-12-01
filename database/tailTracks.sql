-- Create Usuario (User) table
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    ubicacion VARCHAR(200),
    telefono VARCHAR(20)
);

-- Create Perro (Dog) table
CREATE TABLE perro (
    id_perro SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER,
    raza VARCHAR(50),
    peso DECIMAL(5,2),
    foto TEXT,
    comportamiento TEXT,
    CONSTRAINT fk_usuario_perro 
        FOREIGN KEY (id_usuario)
        REFERENCES usuario (id_usuario)
        ON DELETE CASCADE
);

-- Create Paseo (Walk) table
CREATE TABLE paseo (
    id_paseo SERIAL PRIMARY KEY,
    id_perro INTEGER NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    ubicacion_inicio VARCHAR(200),
    precio DECIMAL(10,2) NOT NULL,
    capacidad INTEGER NOT NULL,
    estado_pendiente BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_perro_paseo 
        FOREIGN KEY (id_perro)
        REFERENCES perro (id_perro)
        ON DELETE CASCADE
);

-- Create Pago (Payment) table
CREATE TABLE pago (
    id_pago SERIAL PRIMARY KEY,
    id_paseo INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    fecha_pago TIMESTAMP NOT NULL,
    metodo_pago VARCHAR(50),
    CONSTRAINT fk_paseo_pago 
        FOREIGN KEY (id_paseo)
        REFERENCES paseo (id_paseo)
        ON DELETE CASCADE,
    CONSTRAINT fk_usuario_pago 
        FOREIGN KEY (id_usuario)
        REFERENCES usuario (id_usuario)
        ON DELETE CASCADE
);

