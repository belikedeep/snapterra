import app from "./app";
import { connectDB } from "./config/db";
import { initAdmin } from "./config/init";

const PORT = process.env.PORT || 5001;

await connectDB();
await initAdmin();

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
