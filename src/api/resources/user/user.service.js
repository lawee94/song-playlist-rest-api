import joi from "joi";
import bcrypt from "bcryptjs";

export default {
  encryptPassword(plainText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
  },

  comparePassword(plainText, encryptedPassword) {
    return bcrypt.compareSync(plainText, encryptedPassword);
  },

  validateSignup(body) {
    const schema = joi.object().keys({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      role: joi.number().integer(),
    });

    const { value, error } = joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },

  validateLogin(body) {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    const { value, error } = joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
};
