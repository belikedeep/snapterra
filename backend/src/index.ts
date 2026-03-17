import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
