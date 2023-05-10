const Multiplayer = require ('../model/Multiplayer');
const Path = require ('../model/Path');
const Point = require ('../model/Point');

module.exports.multiplayer_post= async(req, res) => {
    const multiplayer = await Multiplayer.create({
        code: req.body.code, 
        users: req.body.users,
        collectedPointsInPath:req.body.collectedPointsInPath
    });
    try {
      await multiplayer.save();
      res.send(multiplayer);
    } catch (err) {
      res.status(400).send(err);
    }
  }

module.exports.multiplayer_addUser= async(req, res) => {
};

module.exports.multiplayer_get= async(req, res) => {
};