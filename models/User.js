const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String ,
            unique: true,
            require: true,
            trim: true,
        },
        email: {
            type: String ,
            unique: true,
            require: true,
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,3})$/]
        },
        thoughts:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model ('User', userSchema);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = User;