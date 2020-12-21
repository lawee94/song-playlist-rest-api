import userService from "./user.service";
import User, { STANDARD_ROLE } from "./user.model";
import jwt from "../../helpers/jwt";

export default {
  async signup(req, res) {
    try {
      const { value, error } = userService.validateSignup(req.body);

      if (error && error.details) return res.status(400).json(error);

      const encryptedPassword = userService.encryptPassword(value.password);

      const user = await User.create({
        email: value.email,
        firstName: value.firstName,
        lastName: value.lastName,
        password: encryptedPassword,
        role: value.role || STANDARD_ROLE,
      });

      return res.json({ msg: "User Created Successfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // async login(req, res) {
  //   try {
  //     const { value, error } = userService.validateLogin(req.body);

  //     if (error && error.details) return res.status(400).json(error);

  //     const user = await User.findOne({ email: value.email });

  //     if (!user) return res.status(401).json({ err: "Unauthorized User" });

  //     const authenticated = userService.comparePassword(
  //       value.password,
  //       user.password
  //     );

  //     if (!authenticated)
  //       return res.status(401).json({ err: "Invalid Password" });

  //     const token = jwt.issue({ id: user._id }, "1d");
  //     return res.json({ token });
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // },

  authenticate(req, res) {
    return res.json(req.user);
  },
};
