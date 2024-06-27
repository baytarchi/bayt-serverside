const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

module.exports = [
  express.json({ limit: "2mb" }),
  express.urlencoded({ extended: true }),
  cookieParser(),
  cors({
    origin: [
      "https://bayt-client.netlify.app",
      "http://localhost:5173",
      "https://baytarchitects.com",
    ],
    methods: ["HEAD", "GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "x-now-id",
      "x-now-trace",
      "x-powered-by",
      "Origin",
      "Accept",
      "Content-Type",
      "Set-Cookie",
      "Authorization",
    ],
  }),
];
