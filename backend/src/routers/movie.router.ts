import { Router } from "express";
import { MovieModel } from "../models/movie.model";
const router = Router();

// Hamma ma'lumotni olish
router.get("/movies/", async (req, res) => {
  const movies = await MovieModel.find();
  res.json(movies);
});

// ma'lumot qo'shish
router.post("/movies/", async (req, res) => {
  const movie = new MovieModel({
    name: req.body.name,
    img_url: req.body.img_url,
    video_url: req.body.video_url,
    state: req.body.state,
    year: req.body.year,
    genre: req.body.genre,
    language: req.body.language,
    duration: req.body.duration,
  });

  const saved_movie = await movie.save();
  res.status(201).json(saved_movie);
});

// ma'lumotni id si bo'yicha topish
router.get("/movies/:id", async (req, res) => {
  const movies = await MovieModel.find();
  const movie = movies.find((m) => m.id === req.params.id);
  if (!movie) {
    res.status(404).send("Berilgan ID bo'yicha video mavjud emas!!!");
  } else {
    res.send(movie);
  }
});

// ma'lumotni id si bo'yicha yangilash
router.put("/movies/:id", async (req, res) => {
  const movie_id = req.params.id;

  try {
    const movie = await MovieModel.findById(movie_id);

    if (!movie) {
      res.status(404).json({ success: false, message: "Video topilmadi." });
    } else {
      movie.name = req.body.name || movie.name;
      movie.img_url = req.body.img_url || movie.img_url;
      movie.video_url = req.body.video_url || movie.video_url;
      movie.state = req.body.state || movie.state;
      movie.year = req.body.year || movie.year;
      movie.genre = req.body.genre || movie.genre;
      movie.language = req.body.language || movie.language;
      movie.duration = req.body.duration || movie.duration;

      const updatedMovie = await movie.save();

      res
        .status(200)
        .json({ success: true, message: "Video yangilandi.", updatedMovie });
    }
  } catch (error) {
    console.error("Video yangilashda xatolik:", error);
    res.status(500).json({ success: false, message: "Server xatosi." });
  }
});

// ma'lumot id si bo'yicha o'chirish
router.delete("/movies/:id", async (req, res) => {
  const movie_id = req.params.id;

  try {
    const deleted_movie = await MovieModel.findByIdAndDelete(movie_id);

    if (deleted_movie) {
      res.status(200).json({ success: true, message: "Video o'chirildi." });
    } else {
      res.status(404).json({ success: false, message: "Video topilmadi." });
    }
  } catch (error) {
    console.error("Video o'chirishda xatolik:", error);
    res.status(500).json({ success: false, message: "Server xatosi." });
  }
});

// Janri bo'yicha izlash
router.get("/genres/:id", async (req, res) => {
  try {
    const requested_genre = req.params.id.toLowerCase();
    const movies = await MovieModel.find({ genre: requested_genre });
    res.json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server xatosi" });
  }
});

export default router;
