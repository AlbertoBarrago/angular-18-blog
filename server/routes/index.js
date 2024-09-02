const express = require('express');
const Controller = require('../controllers');

const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
  await Controller.create(req, res);
});

//Get all Method
router.get('/getAll', async (req, res) => {
  await Controller.getAll(req, res);
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  await Controller.getOne(req, res, req.params.id);
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  await Controller.update(req, res, req.params.id);
});

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  await Controller.remove(req, res, req.params.id);
});

module.exports = router;
