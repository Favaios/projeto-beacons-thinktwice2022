const express = require("express");
const morgan = require("morgan");
const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({
  logging: console.log
});


require("./routes/beacon.routes")(app);
require("./routes/location.routes")(app);
require("./routes/detection.routes")(app);
require("./routes/statistics.routes")(app);

const ws = require("./config/ws.config.js");
ws.init(app)

const PORT = process.env.PORT || 8080;
ws.server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});