const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const urlRegex =
  /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "Invalid avatar URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.index({ email: 1 }, { unique: true });

userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error('Invalid email or password'));
        }
  
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Invalid email or password'));
          }
          return user;
        });
      });
  };

module.exports = mongoose.model("user", userSchema);
