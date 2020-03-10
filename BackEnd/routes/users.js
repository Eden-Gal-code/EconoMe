const router = require("express").Router();
let User = require("../models/user.model");
//gives all users
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});
//gives specific user by id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});
//get email and pasword and returns the user
router.route("/login").post((req, res) => {
  User.find()
    .then(users => {
      let found = false;
      users.map(user => {
        if (
          user.email.slice() === req.body.email &&
          user.password.slice() === req.body.password
        ) {
          res.json(user);
          found = true;
        }
      });
      if (!found) {
        res.json("0");
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//adds a user to the database
router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const workplace = req.body.workplace;
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
    expenses: [],
    fields: [],
    locations: [],
    yearly: [],
    monthly: []
  });

  newUser
    .save()
    .then(() => res.json(newUser))
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

    if (user.locations.includes(req.body.location) === false) {
      user.locations.push(req.body.location);
    }

    user
      .save()
      .then(() => res.json(user))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
