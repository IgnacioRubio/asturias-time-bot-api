const Municipality = require('./municipalities.model');


// GETS ALL RECORDS
exports.getAll = (req, res, next) => {
  const fields = 'code name capital created';

  Municipality.find({}, fields, (err, docs) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(docs);
  });
}

// COUNT ALL RECORDS
exports.count = (req, res, next) => {
  const fields = 'code';

  Municipality.find({}, fields, (err, docs) => {
    if (err) {
      return next(err);
    }
    
    const count = { "count": docs.length };
    res.status(200).json(count);
  });
}

// GET ONE RECORD BY ID
exports.getByCode = (req, res, next) => {
  const code = req.params.code;

  const fields = 'code name capital created';

  Municipality.findOne({ code: code }, fields, (err, doc) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(doc);
  });
}

// CREATE A NEW RECORD
exports.create = (req, res, next) => {
  let municipalityData = {
    code: req.body.code,
    name: req.body.name,
    capital: req.body.capital
  };

  Municipality.create(municipalityData, (err, doc) => {
    if (err) {
      return next(err);
    }

    municipalityData.id = doc._id;
    res.status(201).json(municipalityData);
  });
}

// UPDATE A RECORD
exports.update = (req, res, next) => {
  const code = req.params.code;

  Municipality.findOneAndUpdate({ code: code }, req.body, { new: true }, (err, doc) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(doc);
  });
}

// DELETE ALL RECORDS
exports.deleteAll = (req, res, next) => {
  Municipality.deleteMany({}, (err) => {
    if (err) {
      return next(err);
    }

    res.sendStatus(204);    
  });
}

// DELETE ONE RECORD
exports.deleteByCode = (req, res, next) => {
  const code = req.params.code;

  Municipality.deleteOne({ code: code }, (err) => {
    if (err) {
      return next(err);
    }

    res.sendStatus(204); 
  });
}