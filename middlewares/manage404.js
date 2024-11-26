const manage404 = (req, res, next) => {
    res.status(404).json({
        message: 'La ruta solicitada no existe',
    });
};

module.exports = manage404;
