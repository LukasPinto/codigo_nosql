const express = require('express');
const router = express.Router();
const passport = require('passport');

const Task = require('../models/task');
const Historial = require('../models/historial');
const Cliente = require('../models/cliente')
const Mascota = require('../models/mascota')
/* Pagina principal */
router.get('/', async (req, res) => {
  const tasks = await  Task.find();
 
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
  await Task.deleteOne({_id:id});
  res.redirect("/");
});


router.get('/get', async (req, res)=> {
  const respuesta = await Cliente.find();
  res.json(respuesta)
  console.log(respuesta)
})


module.exports = router;
