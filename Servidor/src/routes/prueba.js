const express = require('express');
const router = express.Router();
const passport = require('passport');
const Task = require('../models/task');
const Historial = require('../models/historial');
const Cliente = require('../models/cliente')
const Mascota = require('../models/mascota');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const { verify } = require('../middlewares/Auth');
/* Pagina principal */
router.get('/', async (req, res) => {
  const tasks = await Task.find();

  res.render("home", {
    tasks: tasks
  });
  console.log(tasks);
});

// AGREGAR 
router.post('/add', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect("/");
});

//BORRAR
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Task.deleteOne({ _id: id });
  res.redirect("/");
});


router.get('/add/cliente', async (req, res) => {
  const cliente = new Cliente({
    _id: new mongoose.Types.ObjectId,
    primernombre: "Lukas",
    primerapellido: "Pinto",
    rut: 20725246,
    correo: "lukas.pinto@alumnos.uv.cl",
    clave: "hola123"
  })
  await cliente.save().then(result => {
    console.log(result)

  });

})



router.get('/update/cliente', async (req, res) => {
  await Cliente.findOneAndUpdate({
    _id: mongoose.Types.ObjectId("61aad2af1cf73279db387b3a")
  }, {
    $push: {
      mascota: mongoose.Types.ObjectId("61aad54c11dcda4d5e71c436")
    }
  }).then(result => {
    res.json(result)
  })
})

router.get("/Auth", verify, (req, res) => {
  console.log(req.user)
  res.json(req.user)
})

router.post('/inicioSesion', async (req, respuesta) => {
  const { correo, clave } = req.body;
  await Cliente.findOne({ correo, clave }, (err, res) => {

    if (res) {
      const userForToken = {
        correo: res.correo,
        rut: res.rut,
        _id: res._id,
      }
      const token = jwt.sign(userForToken, 'admin', { expiresIn: "2d" })
      respuesta.send({ correo: res.correo, rut: res.rut, _id: res._id, token })
    }
    else {
      respuesta.json({ error: "El usuario no existe" })
    }
  }).catch(err => {
    console.log(err)
  }
  )
})

router.post('/add/mascota', verify, async (req, res) => {
  console.log(req.body._id)
  const { _id, nombre_mascota, especie, raza, edad, peso } = req.body;
  const _id_mascota= new mongoose.Types.ObjectId
  const mascota = new Mascota({
    _id:  mongoose.Types.ObjectId(_id_mascota),
    nombre_mascota: nombre_mascota,
    especie: especie,
    raza: raza,
    edad: edad,
    peso: peso,
    cliente: mongoose.Types.ObjectId(_id)
  })
  await mascota.save().then(result => {
    if (result) {
      console.log(result);
    }
    else {
      res.json({ error: "Ocurrio un error al ingresar la mascota" });
      console.log(err);
    }

  });
  await Cliente.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(_id)
  }, {
    $push: {
      mascota: mongoose.Types.ObjectId(_id_mascota)
    }
  }).then(result => {
    res.json(result)
  })

});


module.exports = router;
