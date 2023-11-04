const User = require("../model/usuario-model.js");

exports.registro = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "datos vacios!"
        });
    }
    const user = new User({
      nombre : req.body.nombre,
      mail : req.body.mail,
      password : req.body.password
    });
    console.log(user);
    User.registro(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "error al crear el nuevo usuario."
            });
        else res.send(data);
    });

};

exports.login = (req, res) =>{
    const user = new User({
        nombre : req.body.nombre,
        mail: req.body.mail,
        password: req.body.password
    });
    User.login(user,(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `usuario no encontrado`
                });
            } else {
                res.status(500).send({
                    message: "error al buscar nombre"
                });
            }
        } else {
            res.sendStatus(data);
        }
    });

}