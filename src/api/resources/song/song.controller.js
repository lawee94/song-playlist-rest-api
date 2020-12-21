import joi from "joi";
import Song from "./song.model";

export default {
  async create(req, res) {
    try {
      const schema = joi.object().keys({
        title: joi.string().required(),
        url: joi.string().required(),
        rating: joi.number().integer().min(0).max(5).optional(),
      });
      const { value, error } = joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }
      const song = await Song.create(
        Object.assign({}, value, { artist: req.user._id })
      );
      return res.json(song);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async findAll(req, res) {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        perPage: parseInt(perPage, 10) || 10,
        populate: {
          path: "artist",
          select: "firstName lastName",
        },
      };
      const songs = await Song.paginate({}, options);
      return res.json(songs);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async findOne(req, res) {
    try {
      const id = req.params.id;
      const song = await Song.findById(id).populate(
        "artist",
        "firstName lastName"
      );
      if (!song) return res.status(404).json({ err: "Could not find song" });
      return res.json(song);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const id = req.params.id;
      const song = await Song.findOneAndDelete({ _id: id });
      if (!song) return res.status(404).json({ err: "Could not find song" });
      return res.json({ msg: "Song has been deleted" });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const schema = joi.object().keys({
        title: joi.string().optional(),
        url: joi.string().optional(),
        rating: joi.number().integer().min(0).max(5).optional(),
      });
      const { value, error } = joi.validate(req.body, schema);
      if (error && error.details) {
        return res.status(400).json(error);
      }

      const song = await Song.findOneAndUpdate({ _id: id }, value, {
        new: true,
      });
      if (!song) return res.status(404).json({ err: "Could not find song" });
      return res.json({ msg: "Song has been Updated", data: song });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
