const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const workplace = req.body.workPlace;
  const balance = req.body.balance;
  const income = req.body.income;
  const spendlimit = req.body.spendlimit;

  const newUser = new User({
    email,
    password,
    firstName,
    lastName,
    workplace,
    balance,
    spendlimit,
    income,
    expenses: [
      {
        caption: null,
        amount: null,
        date: null,
        location: null,
        field: null
      }
    ],
    fields: [],
    locations: [],
    yearly: [],
    monthly: []
  });

  newUser
    .save()
    .then(() => res.json("User Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});
//Adding a new Expense
router.route("/addExp/:id").post((req, res) => {
  User.findById(req.params.id).then(user => {
    user.expenses.push({
      caption: req.body.caption,
      amount: Number(req.body.amount),
      date: Date.parse(req.body.date),
      location: req.body.location,
      field: req.body.field
    });
    if (user.fields.includes(req.body.field) === false) {
      user.fields.push(req.body.field);
    }

    if (user.locations.includes(req.body.locations) === false) {
      user.locations.push(req.body.location);
    }

    //add if statement for the fields and locations.

    user
      .save()
      .then(() => res.json("User Added Expense!"))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
