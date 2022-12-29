require(`dotenv`).config({ path: `./config/.env` });

const express = require(`express`);
const app = express();

app.use(require(`body-parser`).json());
app.use(require(`cors`)({ credentials: true, origin: process.env.LOCAL_HOST }));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
