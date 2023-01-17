const router = require(`express`).Router();

const salesModel = require(`../models/sales`);
const shoeModel = require(`../models/shoes`);

const createNewSale = (req, res, next) => {
  let saleDetails = new Object();

  saleDetails.orderID = req.params.orderID;
  saleDetails.buyer_email = req.params.buyer_email;
  saleDetails.shoes = req.params.shoes.split(`,`);
  saleDetails.total = req.params.total;

  for (let i = 0; i < saleDetails.shoes.length; i++) {
    shoeModel.findOne({ _id: saleDetails.shoes[i] }, (err, data) => {
      if (err) {
        return next(err);
      }
      data.stock -= 1;
      data.sold_pairs += 1;
      data.save();
    });
  }

  salesModel.create(saleDetails, (err, data) => {
    if (err) {
      return next(err);
    }
  });
  return res.json({ success: true });
};

router.post(`/sales/:orderID/:buyer_email/:shoes/:total`, createNewSale);

router.get(`/sales/:buyer_email`, (req, res) => {
  salesModel.find(req.params, (error, data) => {
    res.json(data);
  });
});

module.exports = router;
