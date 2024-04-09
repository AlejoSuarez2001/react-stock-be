import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  try {
    await sequelize.authenticate();
    console.log("database connected successfully");

    await sequelize.sync();
    console.log("database synchronized successfully");

    app.listen(3000);
    console.log("Server Open");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
