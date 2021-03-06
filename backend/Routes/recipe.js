import express from 'express'
import Recipe from '../models/recipeModel.js'
const router = express.Router()
//Get/recipes => show all recipes
router.get('/', async (req, res) => {
	const keyword = req.query.keyword
		? {
				keywords: { $regex: req.query.keyword, $options: 'i' },
		  }
		: {}
	try {
		const recipes = await Recipe.find({ ...keyword })
		res.json(recipes)
	} catch (err) {
		res.json({ message: err })
		console.error('There was a error')
	}
})
//Get/recipes/:id => show one specific recipe
router.get('/:id', async (req, res) => {
	try {
		const oneRecipe = await Recipe.findById(req.params.id)
		res.json(oneRecipe)
	} catch (err) {
		res.json({ message: err })
		console.error('There was a error')
	}
})
//Delete/recipes/:id => delete specific recipe
router.delete('/:id', async (req, res) => {
	try {
		const removedRecipe = await Recipe.remove({ _id: req.params.id })
		res.json(removedRecipe)
	} catch (err) {
		res.json({ message: err })
		console.error('There was a error')
	}
})
//Update/recipe/:id => update specific post
router.patch('/:id', async (req, res) => {
	try {
		const updateRecipe = await Recipe.updateOne({ _id: req.params.id }, {})
		res.json(updateRecipe)
	} catch (err) {
		res.status(404).json({ message: err })
		console.error('There was a error')
	}
})
//Post/recepis => create new recipe
router.post('/', (req, res) => {
	const addRecipe = new Recipe({
		title: req.body.title,
		keywords:req.body.keywords,
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
