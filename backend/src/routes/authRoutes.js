const express =
require("express")

const router =
express.Router()

const {

register,

login,

getUsers,

me

} =
require(
"../controllers/authController"
)

router.post(
"/register",
register
)

router.post(
	"/login",
	login
)

router.get(
	"/me",
	me
)

router.get(
"/users",
getUsers
)

module.exports =
router