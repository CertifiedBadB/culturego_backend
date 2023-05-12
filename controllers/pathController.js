const Path = require ('../model/Path');
const Point = require ('../model/Point');
const PointController = require('./pointController');

module.exports.path_post = async(req, res) => {
    const path = await Path.create({
        title: req.body.title, 
        description: req.body.description,
        photo:req.body.photo,
        points:req.body.points,
        location:req.body.location
    });
    try {
      await path.save();
      res.send(path);
    } catch (err) {
      res.status(400).send(err);
    }
  }
          
module.exports.path_get = async(req, res) => {
    const path = await Path.find();
    res.json(path);
}

module.exports.addPoint = async(req, res) => {
  const pathId = req.body.pathId;
  const point = req.body.point;
  const point1 = await Point.create({
    description: point.description,
    location: point.location,
    value:point.value,
    question:point.question,
    photo:point.photo
  });
  const path =  await Path.findByIdAndUpdate(pathId,{$push : { points:point1 }},
    {safe: true, upsert: true},
    function(err, path) {
    console.log(err);
});

  res.json(path);
}

module.exports.path_delete = async(req, res) => {
    const retPath = await Path.findById(req.body.id);
    await Path.deleteOne({_id: req.body.id});
    res.json(retPath);
}


module.exports.createDummyData = async(req,res) =>{
    const rabobank = { type: 'Point', coordinates: [51.49210869058752, 4.293080623376294] };
    const rabobankQuestion = {question: "Hoe heet het plein tegenover de Rabobank?", photo: "",badAnswers:["Plein 12","Parkeerplein"],goodAnswer:"Plein 13",value:1};
    const groffen = { type: 'Point', coordinates: [51.49225754613385, 4.292769369932292] };
    const groffenQuestion = {question: "Waar staat groffen bekend om?", photo: "",badAnswers:["Stokbroden","Appeltaarten"],goodAnswer:"Koeken",value:1};
    const politiebureau = { type: 'Point', coordinates: [51.493237733725415, 4.294537650367783] };
    const politieQuestion = {question: "Sinds wanneer staat dit pand van de politie hier?", photo: "",badAnswers:["2002","2017"],goodAnswer:"2019",value:1};
    const curio = { type: 'Point', coordinates: [51.493816287291345, 4.292498714707853] };
    const curioQuestion = {question: "Wat is Curio?", photo: "",badAnswers:["Een fysiotherapeut","Een bedrijvenpand"],goodAnswer:"Een school",value:1};
    
    const point1 = await Point.create({
        description: "rabobank",
        location: rabobank,
        value:1,
        question:rabobankQuestion,
        photo:""
      });
      const point2 = await Point.create({
        description: "groffen",
        location: groffen,
        value:1,
        question:groffenQuestion,
        photo:""
      });
      const point3 = await Point.create({
        description: "politiebureau",
        location: politiebureau,
        value:1,
        question:politieQuestion,
        photo:""
      });
      const point4 = await Point.create({
        description: "curio",
        location: curio,
        value:1,
        question:curioQuestion,
        photo:""
      });
    const zuidOost = { type: 'Point', coordinates: [51.49303271056819, 4.293991829181514] };
      const path = await Path.create({
        title: "De ZuidOost Route",
        description: "De eerste route, ooit gemaakt",
        photo:"dsdsdsds",
        points:[point1, point2, point3, point4],
        location: zuidOost
      });

    res.json(path.toJSON());
}