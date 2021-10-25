/////////////////////////
// Import Dependencies
/////////////////////////
const express = require("express"); // express for Router function
const Fruit = require("../models/fruit.js"); // fruit model

///////////////////////////////////
//Create Router
///////////////////////////////////
const router = express.Router()



///////////////////////////////////
//Routes
///////////////////////////////////



////////////////////////
// Fruits Routes
////////////////////////

//seed route - seed our starter data
router.get("/seed", (req, res) => {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ];

    // delete all fruits
    Fruit.deleteMany({})
    .then((data) => {
        // seed the starter fruits
        Fruit.create(startFruits)
        .then((data) => {
            // send created fruits back as JSON
            res.json(data)
        })
    })
})


//Index route - get -/fruits

router.get("/", (req, res) => {
  //find all the fruits
  Fruit.find({})
    .then((fruits) => {
    //render the index template with the fruits
      res.render("fruits/index.liquid",{fruits})
  })
  //error handeling
  .catch((error)=>res.json({error}))
})


//new route - get /fruits/new
router.get("/new", (req, res) => {
  res.render("fruits/new.liquid");
});

// create - post request - /fruits
router.post("/", (req, res) => {
  // convert the checkbox property to true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;

  // create the new fruit
  Fruit.create(req.body)
    .then((fruit) => {
      // redirect the user back to the index route
      res.redirect("/fruits");
    })
    // error handling
    .catch((error) => {
      res.json({ error });
    });
});



// edit route - get request - /fruits/:id/edit
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // get the fruit with the matching id
  Fruit.findById(id)
    .then((fruit) => {
      // render the edit page template with the fruit data
      res.render("fruits/edit.liquid", { fruit });
    })
    // error handling
    .catch((error) => {
      res.json({ error });
    });
});



// update route - put request - "/fruits/:id"
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;

  // convert the checkbox property to true or false
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false;

  // update the item with the matching id
  Fruit.findByIdAndUpdate(id, req.body, { new: true })
    .then((fruit) => {
      // redirect user back to index
      res.redirect("/fruits");
    })
    // error handling
    .catch((error) => {
      res.json({ error });
    });
});

// destroy route - delete
router.delete("/:id", (req, res) => {
  //grab id from params
  const id = req.params.id;
  //delete the fruit
  Fruit.findByIdAndRemove(id)
    .then((fruit) => {
      res.redirect("/fruits");
    })
    .catch((error) => {
      res.json({ error });
    });
});



// show route - get route

router.get("/:id", (req, res) => {
  //get the id from params
  const id = req.params.id;
  //get that particular fruit from the database
  Fruit.findById(id)
    .then((fruit) => {
      //render the show page with the fruit
      res.render("fruits/show.liquid", { fruit });
    })
    //error handeling
    .catch((error) => {
      res.json({ error });
    });
});






///////////////////////////////////
//Export Router
///////////////////////////////////
module.exports = router