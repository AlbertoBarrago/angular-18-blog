require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Articles, Users } = require('../models');

// Generate a random secret key
const SECRET_KEY = process.env.SECRET_KEY;
const HOURS_24_H = 24 * 60 * 60;

//ARTICLES CONTROLLER
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

async function create(req, res) {
  try {
    const data = new Articles({
      _id: uuidv4(),
      title: req.body.title,
      content: req.body.content,
      shortContent: req.body.shortContent,
      author: req.body.author,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
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
    let data = await Articles.findByIdAndDelete({ _id: paramID });
    if (!data) {
      res
        .status(404)
        .send({ message: `Article with id: ${paramID} not found` });
    }
    res.json({ message: `Article deleted with id: ${paramID} successfully` });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function filterArticleByQuery(req, res) {
  const reqParam = req.params;
  const page = parseInt(reqParam.page, 10) || 1;
  const limit = parseInt(reqParam.size, 10) || 6;
  const skip = (page - 1) * limit;
  let searchQuery = reqParam.q !== 'null' ? String(reqParam.q) : '';

  try {
    const articles = await Articles.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { content: { $regex: searchQuery, $options: 'i' } },
            { shortContent: { $regex: searchQuery, $options: 'i' } },
            { author: { $regex: searchQuery, $options: 'i' } },
          ],
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
        },
      },
      {
        $addFields: {
          'metadata.page': page,
          'metadata.pageSize': limit,
        },
      },
    ]);

    const metadata = articles[0].metadata[0] || {
      totalCount: 0,
      page,
      pageSize: limit,
    };
    const data = articles[0].data || [];
    res.json({ metadata, data });
  } catch (err) {
    res.status(500).send({
      error: 'An error occurred while fetching articles',
      details: err,
    });
  }
}

//USERS CONTROLLER
async function getAllUsers(req, res) {
  try {
    const data = await Users.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getOneUser(req, res, paramID) {
  try {
    const data = await Users.findById(paramID);
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function byCryptPass(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return String(hash);
}

async function createUser(req, res) {
  try {
    const hashedPassword = await byCryptPass(req.body.password);
    const user = new Users({
      _id: uuidv4(),
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      role: req.body.role,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateUser(req, res, id) {
  try {
    const data = await Users.findByIdAndUpdate(
      id,
      {
        username: req.body.username,
        email: req.body.email,
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

async function removeUser(req, res, id) {
  try {
    let data = await Users.findByIdAndDelete({ _id: id });
    if (!data) {
      res.status(404).send({ message: `User with id: ${id} not found` });
    }
    res.json({ message: `User deleted with id: ${id} successfully` });
  } catch (err) {
    res.status(500).send(err);
  }
}

// AUTH CONTROLLER
async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username: username });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    if (user && !user.password) {
      res.status(500).send('Provide a password');
      return;
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Error while comparing passwords.');
      if (!isMatch) return res.status(401).send('Invalid password');

      // Generate JWT
      const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
        expiresIn: HOURS_24_H,
      });
      const userLogged = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };
      res.status(200).send({ auth: true, token, user: userLogged });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function refreshToken(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('No token provided.');
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized!');
    }
    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      SECRET_KEY,
      {
        expiresIn: HOURS_24_H,
      }
    );
    res.status(200).send({ auth: true, token: newToken });
  });
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  createUser,
  getAllUsers,
  getOneUser,
  login,
  refreshToken,
  filterArticleByQuery,
  updateUser,
  removeUser,
};
