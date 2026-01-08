import 'dotenv/config';
import app from "./app";

const PORT = process.env.PORT || 3000;

app.get('/health', (_, res) => {
  res.status(200).send('API is healthy!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
