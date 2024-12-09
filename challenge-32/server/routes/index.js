'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
  console.log('[GET] /car:', data);
  res.json(data);
});

router.post('/', function(req, res) {
  const existingCar = data.find(car => car.plate === req.body.plate);

  if (existingCar) {
    console.log('[POST] /car: Duplicate plate', req.body.plate);
    return res.status(400).json({ message: 'Car with this plate already exists' });
  }

  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color
  });
  console.log('[POST] /car:', JSON.stringify({
    body: req.body,
    data
  }, null, 2));
  res.json({ message: 'success' });
});

router.delete('/:plate', function(req, res) {
  const plate = req.params.plate;
  const index = data.findIndex(car => car.plate === plate);

  if (index !== -1) {
    data.splice(index, 1);
    console.log(`[DELETE] /car/${plate}: success`);
    res.json({ message: 'Car deleted successfully' });
  } else {
    console.log(`[DELETE] /car/${plate}: not found`);
    res.status(404).json({ message: 'Car not found' });
  }
});

module.exports = router;
