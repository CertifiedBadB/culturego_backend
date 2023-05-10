const Point = require ('../model/Point');

//dit is geen restfull, maar rpc remote procedure call
//get: cashability checken, rest checken aangezien dit geen restfull calls zijn.
module.exports.point_post = async(req, res) => {
    const point = new Point({
        description: req.body.description,
        location: req.body.location,
        value: req.body.value,
        question: req.body.question,
        photo: req.body.photo
      });
      try {
        await point.save();
        res.send(point);
      } catch (err) {
        res.status(400).send(err);
      }
    }

module.exports.point_get = async(req, res) => {
  console.log(req.body.longitude);
    const point = await Point.find({location:{$near : {$geometry:{type:"Point",coordinates:[req.body.longitude,req.body.latitude]},$maxDistance:500}}});
    console.log(point);
    const pickedDocs = [];
    const doc =  await getSomsDocs(point,req.body.value,pickedDocs);
    res.json(doc);
}

const getSomsDocs = async(doc,amount,picked) =>{
    if(amount <= 0){
        return picked
    }else{
        console.log(doc);
        const randomIndex = Math.floor(Math.random() * doc.length);
        picked.push(doc[randomIndex]);
        doc.splice(randomIndex,1)
        return await getSomsDocs(doc,amount-1,picked)
    }
}

//delete a point by id
module.exports.point_delete = async(req, res) => {
    const retPoint = await Point.findById(req.params._id);
    await Point.deleteOne({_id: req.params._id});
    res.json(retPoint);
}

module.exports.createDummyData = async(req,res) =>{
    const zuidOost = { type: 'Point', coordinates: [51.49303271056819, 4.293991829181514] };
    const zuidOostQuestion = {question: "Welk bedrijf zat voorheen in dit gebouw?", photo: "",badAnswers:["Politie","Brandweer"],goodAnswer:"GGD",value:1};
    const rabobank = { type: 'Point', coordinates: [51.49210869058752, 4.293080623376294] };
    const rabobankQuestion = {question: "Hoe heet het plein tegenover de Rabobank?", photo: "",badAnswers:["Plein 12","Parkeerplein 13"],goodAnswer:"Plein 13",value:1};
    const groffen = { type: 'Point', coordinates: [51.49225754613385, 4.292769369932292] };
    const groffenQuestion = {question: "Waar staat groffen bekend om?", photo: "",badAnswers:["Stokbroden","Appeltaarten"],goodAnswer:"Koeken",value:1};
    const politiebureau = { type: 'Point', coordinates: [51.493237733725415, 4.294537650367783] };
    const politieQuestion = {question: "Sinds wanneer staat dit pand van de politie hier?", photo: "",badAnswers:["2002","2017"],goodAnswer:"2019",value:1};
    const curio = { type: 'Point', coordinates: [51.493816287291345, 4.292498714707853] };
    const curioQuestion = {question: "Wat is Curio?", photo: "",badAnswers:["Een fysiotherapeut","Een bedrijvenpand"],goodAnswer:"Een school",value:1};
    const parade = { type: 'Point', coordinates: [51.49349642090475, 4.291939779756765] };
    const paradeQuestion = {question: "Welke winkel zit er in de Parade?", photo: "",badAnswers:["Albert Heijn","Lidl"],goodAnswer:"Jumbo",value:1};
    const woonsquare = { type: 'Point', coordinates: [51.49344632230043, 4.292258962596638] };
    const woonsquareQuestion = {question: "Wat word hier verkocht?", photo: "",badAnswers:["Groente","Kampeerspullen"],goodAnswer:"Meubels",value:1};
    const hotelDeDraak = { type: 'Point', coordinates: [51.49464769597015, 4.286489938615675] };
    const hotelDeDraakQuestion = {question: "Uit welk jaar komt dit oude pand?", photo: "",badAnswers:["1241","1800"],goodAnswer:"1397",value:1};
    const ijssalonLik = { type: 'Point', coordinates: [51.494752384630424, 4.285930136414714] };
    const ijssalonLikQuestion = {question: "In welke straat staat deze ijssalon?", photo: "",badAnswers:["Zuivelstraat","Markiezaatsweg"],goodAnswer:"Fortuinstraat",value:1};
    const athene = { type: 'Point', coordinates: [51.49497507512153, 4.285638862093958] };
    const atheneQuestion = {question: "Wat voor restaurant is dit?", photo: "",badAnswers:["Turks","Italiaans"],goodAnswer:"Grieks",value:1};
    const jamin = { type: 'Point', coordinates: [51.493469619521726, 4.290550905898466] };
    const jaminQuestion = {question: "Wat verkopen ze hier?", photo: "",badAnswers:["Groente","Koeken"],goodAnswer:"Snoep",value:1};
    const point = await Point.create({
        description: "zuidOost",
        location: zuidOost,
        value:1,
        question:zuidOostQuestion,
        photo:""
      });
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
      const point5 = await Point.create({
        description: "parade",
        location: parade,
        value:1,
        question:paradeQuestion,
        photo:""
      });
      const point6 = await Point.create({
        description: "woonsquare",
        location: woonsquare,
        value:1,
        question:woonsquareQuestion,
        photo:""
      });
      const point7 = await Point.create({
        description: "hotelDeDraak",
        location: hotelDeDraak,
        value:1,
        question:hotelDeDraakQuestion,
        photo:""
      });
      const point8 = await Point.create({
        description: "ijssalonLik",
        location: ijssalonLik,
        value:1,
        question:ijssalonLikQuestion,
        photo:""
      });
      const point9 = await Point.create({
        description: "athene",
        location: athene,
        value:1,
        question:atheneQuestion,
        photo:""
      });
      const point10 = await Point.create({
        description: "jamin",
        location: jamin,
        value:1,
        question:jaminQuestion,
        photo:""
      });
      const allpoints = [point.toJSON(), point1.toJSON(), point2.toJSON(), point3.toJSON(), point4.toJSON(), point5.toJSON(), point6.toJSON(), point7.toJSON(), point8.toJSON(), point9.toJSON(), point10.toJSON()];
res.json(allpoints);

}
