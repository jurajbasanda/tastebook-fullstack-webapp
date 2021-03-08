import express from 'express'
import User from '../models/userModel.js'
const router = express.Router()

//api/users/login => Auth user & get token
router.get('/register', (req, res) => {
	res.send('register page')
})
//api/users/register => Auth user & get token
router.post('/register', async (req, res) => {
	const { firstName, lastName, email, password } = req.body
	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400).send('User already exists')
		throw new Error('User already exists')
	}
	const user = new User({
		firstName: firstName,
		lastName: lastName,
		email: email,
		password: password,
	})
	try {
		const savedUser = await user.save()
		res.status(200)
		res.send(savedUser)
	} catch (err) {
		res.status(400).send(err)
		console.log(err)
	}
})

export default router
