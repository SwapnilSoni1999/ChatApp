const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

UserSchema.plugin(mongooseUniqueValidator)

// To hash
UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(Number(process.env.SALT_ROUNDS), (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (errur, hash) => {
            if (errur) { return next(errur); }
            user.password = hash;
            next();
        });
    });
});

module.exports = model('User', UserSchema)
