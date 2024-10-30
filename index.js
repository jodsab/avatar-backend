const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/films", async (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : "";
  try {
    const response = await axios.get("https://swapi.dev/api/films/");
    const films = response.data.results;

    const filteredFilms = films.filter(
      (film) =>
        film.title.toLowerCase().includes(query) ||
        film.director.toLowerCase().includes(query)
    );

    res.json(filteredFilms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching films" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
