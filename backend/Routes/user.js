import express from 'express'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import protect from '../middleware/verifyToken.js'

const router = express.Router()

//api/users/register => Auth user & get token
router.post('/register', async (req, res) => {
	const { firstName, lastName, email, password } = req.body
	//Checking if user is already in database
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
		res.send({ user: savedUser._id })
	} catch (err) {
		res.status(400).send(err)
		console.log(err)
	}
})

//api/users/login => Auth user & get token
router.post('/login', async (req, res) => {
	const { email, password } = req.body

	//Checking if email of the user exists
	const user = await User.findOne({ email })
	if (!user) {
		res.status(400).send('Email do not mach')
		throw new Error('Email do not mach')
	}
	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id)
		res.status(200).header('auth-token', token).send(token)
	} else {
		res.status(400).send('Invalid password ')
	}
})

//api/users/:id => Auth user & get user information
router.get('/profile/', protect, async (req, res) => {
	const { _id, firstName, lastName, email, password } = req.user
	const user = await User.findOne(_id)
	if (user) {
		res
			.status(200)
			.json({
				_id: user._id,
				firstName: firstName,
				lastName: lastName,
				email: user.email,
			})
	}
	else{
		res.status(404)
		throw new Error('User not found')
	}
})

export default router
