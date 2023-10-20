const express = require("express");
const router = express.Router();
const { getContact, createContact, getContactWithId, updateContact, deleteContact} = require("../controllers/contact");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken)
router.get("/", getContact);

router.post("/", createContact);

router.get("/:id", getContactWithId);

router.put("/:id", updateContact)

router.delete("/:id", deleteContact)


module.exports = router;