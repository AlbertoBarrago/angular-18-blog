const express = require('express');
const Controller = require('../controllers');
const { verifyToken } = require('../middleware/middleware'); // Import your middleware

const router = express.Router();

//Post Method
router.post('/create', async (req, res) => {
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

//USERS CONTROLLER
router.post('/createUser', async (req, res) => {
  await Controller.createUser(req, res);
});

router.get('/getAllUsers', async (req, res) => {
  await Controller.getAllUsers(req, res);
});

router.get('/getOneUser/:id', async (req, res) => {
  await Controller.getOneUser(req, res, req.params.id);
});

router.get('/logout', async (req, res) => {
  await Controller.logout(req, res);
});

router.post('/login', async (req, res) => {
  await Controller.login(req, res);
});

//TODO: Remove me after implement login and logout in FE
router.get('/verifyToken', verifyToken, async (req, res) => {
  await Controller.protectedRoute(req, res);
});

module.exports = router;
