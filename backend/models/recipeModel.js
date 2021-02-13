import mongoose from 'mongoose'

const RecipeSchema = mongoose.Schema({
	title: { type: String, required: true },
	prepTime: { type: Number, required: true },
	calories: { type: Number, required: true },
	meat: { type: Boolean, required: false },
	description: { type: Array, required: true },
	vegeterian: { type: Boolean, required: true },
	glutenFree: { type: Boolean, required: true },
	hot: { type: Boolean, required: true },
	img: { type: Array, required: true },
	date: { type: Date, default: Date.now },
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

export default Recipe
