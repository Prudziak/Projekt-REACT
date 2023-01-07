const router = require(`express`).Router();

const shoesModel = require(`../models/shoes`);

// read all records
router.get(`/shoes`, (req, res) => {
  //user does not have to be logged in to see car details
  shoesModel.find((error, data) => {
    res.json(data);
  });
});

// Read one record
router.get(`/shoes/:id`, (req, res) => {
  shoesModel.findById(req.params.id, (error, data) => {
    res.json(data);
  });
});

// Add new record
router.post(`/shoes`, (req, res) => {
  shoesModel.create(req.body, (error, data) => {
    res.json(data);
  });
});

// Update one record
router.put(`/shoes/:id`, (req, res) => {
  shoesModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (error, data) => {
      res.json(data);
    }
  );
});

// Delete one record
router.delete(`/shoes/:id`, (req, res) => {
  shoesModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data);
  });
});

module.exports = router;
