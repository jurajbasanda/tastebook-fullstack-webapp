import express from 'express'
import Recipe from '../models/recipeModel.js'
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const recipe = await Recipe.find()
		res.json(recipe)
	} catch (err) {
		res.json({ message: err })
		console.error('There was a error')
	}
})

router.post('/', (req, res) => {
	const addRecipe = new Recipe({
		title: req.body.title,
		prepTime: req.body.prepTime,
		calories: req.body.calories,
		meat: req.body.meat,
		description: req.body.description,
		vegeterian: req.body.vegeterian,
		glutenFree: req.body.glutenFree,
		hot: req.body.hot,
		img: req.body.img,
	})
	addRecipe
		.save()
		.then(
			(data) =>
				res.status(200).json(data) &&
				console.log(`New Recipe ${data.title} added`)
		)
		.catch((err) => res.json({ message: err }))
})

export default router
