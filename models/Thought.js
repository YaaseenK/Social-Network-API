const {Schema, model} = require('mongoose');
const Reaction = require ('./Reaction');
const formatDate = require('../utils/formatDate');

const thoughtSchema = new Schema (
    {
        thoughtText:
        {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt:
        {
            type: Date,
            default: Date.now,
            get: (CreatedAt) => {
                return formatDate(CreatedAt)
            } 
        },
        username:   
        {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: 
        {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const Thought = model("Thought", thoughtSchema);

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});



module.exports = Thought;