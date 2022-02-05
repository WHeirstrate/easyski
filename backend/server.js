require("dotenv").config();
const APP = require("./routes");
const PORT = process.env.API_PORT || 3000;

APP.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
});
