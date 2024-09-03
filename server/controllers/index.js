const Articles = require('../models');

async function getAll(req, res) {
  try {
    const data = await Articles.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getOne(req, res, paramID) {
  try {
    const data = await Articles.findById(paramID);
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

function assignRandomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function create(req, res) {
  try {
    const data = new Articles({
      _id: assignRandomUUID(),
      title: req.body.title,
      content: req.body.content,
      shortContent: req.body.shortContent,
      author: req.body.author,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    console.log(data);
    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function update(req, res, paramID) {
  try {
    const data = await Articles.findByIdAndUpdate(
      paramID,
      {
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content,
        shortContent: req.body.shortContent,
        author: req.body.author,
        createdAt: req.body.createdAt,
        updatedAt: Date.now(),
      },
      {
        new: true,
      }
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function remove(req, res, paramID) {
  try {
    console.log(paramID);
    await Articles.findByIdAndDelete({ _id: paramID });
    res.json({ message: `Article deleted with id: ${paramID} successfully` });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
