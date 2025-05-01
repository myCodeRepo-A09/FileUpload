const { app } = require("./app");
const config = require("./utils/config");
app.listen(config.port || 3000, () => {
  console.log("server started successfully");
});
