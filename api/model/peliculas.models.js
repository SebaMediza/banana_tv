const sql = require("../db/db.js");

const Pelicula = function (pelicula) {
    this.titulo = pelicula.titulo,
    this.descripcion = pelicula.descripcion,
    this.fecha_lanzamiento = pelicula.fecha_lanzamiento,
    this.duracion = pelicula.duracion,
    this.productor = pelicula.productor,
    this.director = pelicula.director,
    this.genero = pelicula.genero,
    this.urlPelicula = pelicula.urlPelicula,
    this.banner = pelicula.banner,
    this.imagen = pelicula.image
};

Pelicula.create = (newPelicula, result) => {
    sql.query("INSERT INTO pelicula SET ?", newPelicula, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Pelicula creada: ", { id: res.insertId, ...newPelicula });
        result(null, { id: res.insertId, ...newPelicula });
    })
};

Pelicula.findById = (id, result) => {
    sql.query(`SELECT * FROM pelicula WHERE idMovie = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("pelicula encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not-found" }, null);
    });
};

Pelicula.getAll = (result) => {
    let query = "SELECT * FROM pelicula";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("peliculas: ", res);
        result(null, res);
    });
};

Pelicula.updateById = (id, pelicula, result) => {

    let updateQuery = "UPDATE pelicula SET ";
    let updateData = [];
    let updateValues = [];

    for (const key in pelicula) {
        if (pelicula[key] !== undefined) {
            updateValues.push(`${key} = ?`);
            updateData.push(pelicula[key]);
        };
    };

    updateQuery += updateValues.join(", ");
    updateQuery += " WHERE idMovie = ? ";
    updateData.push(id);

    sql.query(
        //"UPDATE pelicula SET titulo=?, descripcion=?, fecha_lanzamiento=?, duracion=?, director=?, genero=? WHERE idMovie = ?",
        //[pelicula.titulo, pelicula.descripcion, pelicula.fecha_lanzamiento, pelicula.duracion, pelicula.director, pelicula.genero, id],
        updateQuery, updateData,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("pelicula actualizada: ", { id: id, ...pelicula });
            result(null, { id: id, ...pelicula });
        }
    );

}

Pelicula.remove = (id, result) => {
    sql.query("DELETE FROM pelicula WHERE idMovie = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not found" }, null);
            return;
        }
        console.log("torta borrada id: ", id);
        result(null, res);
    });
}

Pelicula.removeAll = result => {
    sql.query("DELETE FROM pelicula", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} peliculas`)
        result(null, res);
    });

}

module.exports = Pelicula;