const Traje = require('../models/traje.model');
const trajeCtrl = {};

//Funciones CRUD

// Obtener todas los trajes 
trajeCtrl.getTrajes = async (req, res) => {
    const trajes = await Traje.find()
        .then((data)=>res.status(200).json({status:data}))
        .catch((err)=>res.status(400).json({status:err}));
};

// Obtener un traje por su ID
trajeCtrl.getTraje = async (req, res) => {
    const traje = await Traje.findById(req.params.id)
        .then(data=>
        {
            if(data!=null) res.status(200).json({status:data});
            else res.status(404).json({status:'No se ha encontrado el traje'})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

// Agregar un nuevo traje
trajeCtrl.addTraje = async (req, res) => {
    const { nombre, material, propietario } = req.body;
    if (!nombre || !material || !propietario) {
        return res.status(400).json({status: 'Faltan campos: nombre, material o propietario'});
    }

    const traje = new Traje({ nombre, material, propietario });
    try {
        const saved = await traje.save();
        // enviamos el documento completo; incluirá createdAt/updatedAt automáticamente
        return res.status(200).json({status: 'Traje agregado correctamente', data: saved});
    } catch (err) {
        return res.status(400).json({status: err});
    }
};

// Actualizar un traje
trajeCtrl.updateTraje = async (req, res) => {
    // desestructuramos los campos esperados en el body
    const { id, nombre, material, propietario } = req.body;

    // id en el body es obligatorio
    if (!id) {
        return res.status(400).json({ status: 'El campo id no puede estar vacio' });
    }

    // opcional: podríamos comparar con req.params.id, pero utilizaremos el id del body
    const update = { nombre, material, propietario, updatedAt: Date.now() };
    try {

        console.log(data);
      const data = await Traje.findByIdAndUpdate(id, update, { new: true });
        if (!data) {
            // no existía ningún documento con ese id
            // devolver 400 según la petición
            return res.status(400).json({ status: 'Traje no encontrado' });
        }
        return res.status(200).json({ status: 'Traje actualizado correctamente', data });
    } catch (err) {
        return res.status(400).json({ status: err });
    }
};

// Eliminar un traje
trajeCtrl.deleteTraje = async (req, res) => {
    await Traje.findByIdAndDelete(req.params.id)
        .then((data)=> {
            if(data)res.status(200).json({status:'Traje eliminada correctamente'});
            else res.status(404).json({status:'No se ha encontrado el traje'})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

module.exports = trajeCtrl;