import { mongoose } from 'mongoose'

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
        dateDue: {
            type: Date,
            default: Date.now()
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true}
);

const Task = mongoose.model('Recipe', recipeSchema);
export default Task;