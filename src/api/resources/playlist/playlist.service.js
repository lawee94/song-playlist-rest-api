import joi from "joi";
import bcrypt from "bcryptjs";

export default {
  validateBody(body) {
    const schema = joi.object().keys({
      songs: joi.array().items().required(),
      name: joi.string().required(),
    });

    const { value, error } = joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
};
