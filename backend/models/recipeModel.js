import mongoose from 'mongoose'

const RecipeSchema = mongoose.Schema({
	title: { type: String, required: true },
	prepTime: { type: Number, required: true },
	calories: { type: Number, required: true },
	meat: { type: String, required: false },
	description: { type: String, required: true },
	vegeterian: { type: Boolean, required: true },
	glutenFree: { type: Boolean, required: true },
	hot: { type: Boolean, required: true },
	img: { type: String, required: true },
	date: { type: Date, default: Date.now },
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

export default Recipe