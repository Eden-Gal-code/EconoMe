const router = require("express").Router();
let User = require("../models/user.model");

function updateLocAndFields(user) {
  user.fields = [];
  user.locations = [];
  user.expenses.map(exp => {
    if (user.fields.includes(exp.field) === false) {
      user.fields.push(exp.field);
    }
    if (user.locations.includes(exp.location) === false) {
      user.locations.push(exp.location);
    }
    user.balance = Number(user.balance) - Number(exp.amount);
  });
}

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

//Deletes an Exp
router.route("/:id/:exp").delete((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      const newExp = user.expenses.filter(exp => exp.id !== req.params.exp);

      user.expenses = newExp;
      updateLocAndFields(user);
      user
        .save()
        .then(() => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
    })
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
          updateLocAndFields(user);
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
    yearly: [
      {
        year: 2017,
        Ybalance: 0
      },
      {
        year: 2018,
        Ybalance: 0
      },
      {
        year: 2019,
        Ybalance: 0
      }
    ],
    monthly: [
      {
        month: "Jan",
        Mbalance: 0
      },
      {
        month: "Feb",
        Mbalance: 0
      },
      {
        month: "Mar",
        Mbalance: 0
      },
      {
        month: "Apr",
        Mbalance: 0
      },
      {
        month: "May",
        Mbalance: 0
      },
      {
        month: "Jun",
        Mbalance: 0
      },
      {
        month: "Jul",
        Mbalance: 0
      },
      {
        month: "Aug",
        Mbalance: 0
      },
      {
        month: "Sep",
        Mbalance: 0
      },
      {
        month: "Oct",
        Mbalance: 0
      },
      {
        month: "Nov",
        Mbalance: 0
      },
      {
        month: "Dec",
        Mbalance: 0
      }
    ]
  });

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json("Error: " + err));
});

//editing an Expense
router.route("/editExp/:id/:exp").post((req, res) => {
  User.findById(req.params.id).then(user => {
    user.expenses.map(exp => {
      if (exp.id === req.params.exp) {
        exp.caption = req.body.caption;
        exp.amount = Number(req.body.amount);
        exp.date = Date.parse(req.body.date);
        exp.location = req.body.location;
        exp.field = req.body.field;
      }
    });
    updateLocAndFields(user);

    user
      .save()
      .then(() => res.json(user))
      .catch(err => res.status(400).json("Error: " + err));
  });
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
