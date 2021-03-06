const {Schema, model} = require('mongoose');

const userShcema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    resetToken: String,
    resetTokenExp: Date,

    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseID: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true,
                }
            }
        ]
    }
});
// Логика прям в обьекте пользователя, function обязательно
userShcema.methods.addToCart = function(course) {
    const items = [...this.cart.items];
    // findIndex return -1 if not found
    const idx = items.findIndex(c => {
        // courseID.toString() because this is type: Schema.Types.ObjectId
        return c.courseID.toString() === course._id.toString()
    });
    if(idx >= 0) {
        items[idx].count = items[idx].count + 1;
    } else {
        items.push({
            courseID: course._id,
            count: 1
        })
    }
    this.cart = {items};
    return this.save();
};

userShcema.methods.removeFromCart = function(id){
    let items = [...this.cart.items];
    const idx = items.findIndex(c => {
        return c.courseID.toString() === id.toString()
    });
    if(items[idx].count === 1){
        items = items.filter(c => {
            c.courseID.toString() !== id.toString()
        })
    } else {
        items[idx].count--;
    }
    this.cart = {items};
    return this.save();
};

userShcema.methods.clearCart = function(){
    this.cart = {items: []};
    return this.save()
};
module.exports = model('User', userShcema);
