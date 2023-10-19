import app from "./app";
import { connect } from "./data/connection";

const PORT = process.env.PORT || 5000

connect().then(() => {
  app.listen(PORT, () => {
    console.log("Server running and DB connected");
  });
}).catch((error) => {
  console.log(error);
  process.exit(1);
});