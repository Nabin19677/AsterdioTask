import "./config/index.js";
import dbErrorHandler from "./db/_err.js";
import db from "./db/index.js";
import expressApp from "./express_app/index.js";

db.then((db) => {
  const PORT = expressApp.get("port");
  expressApp.listen(PORT, () => {
    console.log(`Express App listening on port ${PORT}`);
  });
}).catch(dbErrorHandler);
