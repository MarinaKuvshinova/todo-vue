const  {Router} = require('express');
const router = Router();
const Todo = require ("../models/Todo");
const mongoose = require('mongoose');

router.get('/tasks', async (req,res)=>{
  const todos = await Todo.find({});
  res.send(todos);
});

router.post('/tasks', async (req,res)=>{
  const todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title
  });
  await todo.save().then(task => res.send(task));
});

router.delete('/task/:id', async (req, res) => {
  const id = req.params.id;
  await Todo.remove({_id: id}).then(task => res.send(task));
});

router.put('/task/:id', async (req, res) => {
  const id = req.params.id;
  await Todo.update({_id: id}, { $set: {title: req.body.title}}).then(() => res.sendStatus(200));
});




module.exports = router;