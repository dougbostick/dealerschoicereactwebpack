const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/counters_db"
);

const Counters = sequelize.define("counters", {
  value: Sequelize.INTEGER,
});

//express

const express = require("express");
const app = express();
const path = require("path");

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/counters", async (req, res, next) => {
  try {
    const counters = await Counters.findAll();
    res.send(counters);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/counters", async (req, res, next) => {
  try {
    const newnumber = Math.floor(Math.random() * 10);
    const created = await Counters.create({ value: newnumber });
    res.status(204).send(created);
  } catch (ex) {
    next(ex);
  }
});

// app.delete("/api/counters/:id", async (req, res, next) => {
//   const target = await Counters.findByPk(req.params.id);
//   target.destroy();
//   res.sendStatus(204);
// });

const init = async () => {
  await sequelize.sync({ force: true });
  console.log("syncd");
  const first = Counters.create({
    value: 1,
  });
  const second = Counters.create({
    value: 2,
  });
  console.log("seeded");
  const port = process.env.PORT || 9999;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

init();
