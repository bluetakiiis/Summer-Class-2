//index.js: practice backend server using http module

const http = require("http");

let Movies = [
  {
    id: "1",
    title: "Absolute Value of Romance",
    description:
      "A quiet student by day, a romance novelist by night, Eui-ju is inspired when four gorgeous teachers appear.",
    episodes: "16",
    rating: "8/10",
    genres: ["Comedy", "Youth", "Drama"],
    image:
      "https://m.media-amazon.com/images/M/MV5BMjA0Zjg5ZWQtMDcyYi00ZTA2LTliNTItNDhkNWY0NTZlZWNjXkEyXkFqcGc@._V1_FMjpg_UX1080_.jpg",
    imageMobile:
      "https://m.media-amazon.com/images/M/MV5BMjA0Zjg5ZWQtMDcyYi00ZTA2LTliNTItNDhkNWY0NTZlZWNjXkEyXkFqcGc@._V1_FMjpg_UX1080_.jpg",
    link: "https://kisskh.co/",
    liked: false,
    list: "watched",
  },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Movie server is running!" }));
  }

  if (req.method === "GET" && req.url === "/movies") {
    res.statusCode = 200;
    res.end(JSON.stringify(Movies));
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server is running on port 5000");
});
