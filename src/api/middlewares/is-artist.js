import { ARTIST_ROLE } from "../resources/user/user.model";

export const isArtist = (req, res, next) => {
  if (req.user.role !== ARTIST_ROLE)
    return res.json({ err: "Unauthorize, Not An Artist" });
  next();
};
