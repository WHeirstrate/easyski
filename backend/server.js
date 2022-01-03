require("dotenv").config();
const APP = require("./routes");
const PORT = process.env.PORT || 3001;

APP.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
});
