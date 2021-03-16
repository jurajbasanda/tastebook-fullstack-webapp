import mongoose from 'mongoose'
const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
)
const RecipeSchema = mongoose.Schema({
	title: { type: String, required: true },
	// keywords: { type: String, required: true },
	// prepTime: { type: Number, required: true },
	// calories: { type: Number, required: true },
	// serving: { type: Number, required: true, default: 1 },
	// meat: { type: Boolean, required: false, default: true },
	// description: { type: Array, required: true },
	// ingredients: { type: Array, required: true },
	// vegeterian: { type: Boolean, required: true, default: false },
	// glutenFree: { type: Boolean, required: true, default: false },
	// hot: { type: Boolean, required: true, default: false },
	// img: { type: Array, required: true },
	date: { type: Date, default: Date.now },
	userId: { type: mongoose.Schema.Types.ObjectId, required: true },
	// submitedBy: {
	// 	firstName: { type: String, required: true },
	// 	lastName: { type: String, required: true },
	// 	email: { type: String, required: true },
	// },
	// reviews: [reviewSchema],
	// rating: {
	// 	type: Number,
	// 	required: true,
	// 	default: 0,
	// },
	// numReviews: {
	// 	type: Number,
	// 	required: true,
	// 	default: 0,
	// },
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

export default Recipe
