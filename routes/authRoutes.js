const express = require("express");
const { registerController, loginController } = require("../controllers/authController");
const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post('/login', loginController)

module.exports=router;

// const express = require("express");
// //const { registerController, loginController } = require("../controllers/authController");
// const abc = require("../controllers/authnew");
// const router = express.Router();

// //routes
// //REGISTER || POST
// router.post("/register", abc.registerController);

// //LOGIN || POST
// router.post("/login", abc.loginController);

// module.exports = router;