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


INSERT INTO usuario (nombre, email, password, ubicacion, telefono) VALUES
('Ana García', 'ana@email.com', 'password123', 'Madrid', '600123456'),
('Carlos Rodríguez', 'carlos@email.com', 'securepass', 'Barcelona', '611234567'),
('María López', 'maria@email.com', 'pass1234', 'Valencia', '622345678'),
('Juan Martínez', 'juan@email.com', 'strongpass', 'Sevilla', '633456789'),
('Laura Fernández', 'laura@email.com', 'safepassword', 'Bilbao', '644567890'),
('Pedro Sánchez', 'pedro@email.com', 'secret123', 'Málaga', '655678901'),
('Sofia Ruiz', 'sofia@email.com', 'mysecretpass', 'Zaragoza', '666789012'),
('Diego González', 'diego@email.com', 'pass5678', 'Murcia', '677890123'),
('Carmen Moreno', 'carmen@email.com', 'securepass123', 'Palma', '688901234'),
('Javier Jiménez', 'javier@email.com', 'strongpass456', 'Las Palmas', '699012345');


INSERT INTO perro (id_usuario, nombre, edad, raza, peso, foto, comportamiento) VALUES
(1, 'Max', 3, 'Labrador', 25.5, 'max.jpg', 'Amigable y juguetón'),
(2, 'Luna', 2, 'Bulldog', 18.2, 'luna.jpg', 'Tranquila y cariñosa'),
(3, 'Rocky', 5, 'Pastor Alemán', 32.0, 'rocky.jpg', 'Protector y leal'),
(4, 'Bella', 1, 'Golden Retriever', 20.7, 'bella.jpg', 'Energética y sociable'),
(5, 'Toby', 4, 'Beagle', 12.3, 'toby.jpg', 'Curioso y activo'),
(6, 'Lola', 6, 'Poodle', 8.5, 'lola.jpg', 'Inteligente y juguetona'),
(7, 'Charlie', 2, 'Husky', 23.8, 'charlie.jpg', 'Independiente y amigable'),
(8, 'Daisy', 3, 'Dálmata', 27.1, 'daisy.jpg', 'Enérgica y cariñosa'),
(9, 'Cooper', 5, 'Boxer', 29.4, 'cooper.jpg', 'Protector y leal'),
(10, 'Lucy', 4, 'Chihuahua', 3.2, 'lucy.jpg', 'Pequeña pero valiente');


INSERT INTO paseo (id_perro, fecha_hora, ubicacion_inicio, precio, capacidad, estado_pendiente) VALUES
(1, '2024-03-15 10:00:00', 'Parque del Retiro', 15.00, 3, true),
(2, '2024-03-15 11:30:00', 'Playa de la Barceloneta', 18.00, 2, false),
(3, '2024-03-16 09:00:00', 'Jardines del Turia', 20.00, 4, true),
(4, '2024-03-16 16:00:00', 'Parque de María Luisa', 16.50, 3, true),
(5, '2024-03-17 08:30:00', 'Parque de Doña Casilda', 14.00, 2, false),
(6, '2024-03-17 17:30:00', 'Parque de la Alameda', 17.50, 3, true),
(7, '2024-03-18 10:30:00', 'Parque Grande José Antonio Labordeta', 19.00, 4, true),
(8, '2024-03-18 15:00:00', 'Jardín de Floridablanca', 15.50, 2, false),
(9, '2024-03-19 11:00:00', 'Parque de la Mar', 18.50, 3, true),
(10, '2024-03-19 18:00:00', 'Parque de Santa Catalina', 16.00, 2, true);


INSERT INTO pago (id_paseo, id_usuario, cantidad, fecha_pago, metodo_pago) VALUES
(1, 1, 15.00, '2024-03-15 09:55:00', 'Tarjeta de crédito'),
(2, 2, 18.00, '2024-03-15 11:25:00', 'PayPal'),
(3, 3, 20.00, '2024-03-16 08:55:00', 'Transferencia bancaria'),
(4, 4, 16.50, '2024-03-16 15:55:00', 'Tarjeta de débito'),
(5, 5, 14.00, '2024-03-17 08:25:00', 'Efectivo'),
(6, 6, 17.50, '2024-03-17 17:25:00', 'PayPal'),
(7, 7, 19.00, '2024-03-18 10:25:00', 'Tarjeta de crédito'),
(8, 8, 15.50, '2024-03-18 14:55:00', 'Transferencia bancaria'),
(9, 9, 18.50, '2024-03-19 10:55:00', 'Tarjeta de débito'),
(10, 10, 16.00, '2024-03-19 17:55:00', 'Efectivo');
