const app = require("../index");
require("dotenv").config();
const cors = require("cors");

const serverless = require("serverless-http");
const corsOpts = {
  origin: ["http://localhost:3000", "http://192.168.100.29:3000"],
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));
app.use(express.json());
const logger = (req, res, next) => {
  console.log(req.method, req.url, res.statusCode);
  next();
};

app.use(logger);

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    throw new Error(err.message);
  });
module.exports = app;
