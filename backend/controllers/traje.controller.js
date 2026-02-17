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
        await traje.save();
        return res.status(200).json({status: 'Traje agregado correctamente'});
    } catch (err) {
        return res.status(400).json({status: err});
    }
};

// Actualizar un traje
trajeCtrl.updateTraje = async (req, res) => {
    const traje = req.body;
    await Traje.findByIdAndUpdate(
        req.params.id,
        {$set: traje},
        {new: true})
        .then((data)=> {
            if(data)res.status(200).json({status:'Traje actualizada correctamente'});
            else res.status(404).json({status:'No se ha encontrado el traje'})
        })
        .catch((err)=>res.status(400).json({status:err}));
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