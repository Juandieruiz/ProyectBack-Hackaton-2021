var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const LoginController = require("./controllers/loginController");
const registerRouter = require("./controllers/registerController");
const sessionAuth = require("./lib/sessionAuthMiddleware");
const jwtAuth = require("./lib/jwtAuthMiddleware");
const MongoStore = require("connect-mongo");

var app = express();

// Conexión con Base de Datos
require("./lib/connectMongoose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").__express);
// app.set("view engine", "ejs");

// Variables globales de las vistas
app.locals.title = "OhMyGod";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// middleware de ficheros estáticos
app.use(express.static(path.join(__dirname, "public")));

const loginController = new LoginController();

/**
 * Rutas de la API
 */
app.use("/apiv1/cursos", jwtAuth, require("./routes/apiv1/cursos"));
app.use("/apiv1/usuarios", jwtAuth, require("./routes/apiv1/usuarios"));
app.use("/apiv1/register", registerRouter);
app.post("/apiv1/authenticate", loginController.postJWT);

// Setup de sesiones del Website
app.use(
  session({
    name: "ohmygod-session",
    secret: "M.S:XLc3vVt9E$[GV,tj`knHa7qc,>=G}<Zeg_J7~*,-",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias de inactividad
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    }),
  })
);

// hacemos disponible la sesión en todas las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/**
 * Rutas del website
 */
app.use("/", require("./routes/index"));
app.use("/change-locale", require("./routes/change-locale"));
app.use("/users", require("./routes/users"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // es un error de validación?
  if (err.array) {
    const errorInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf("/apiv1/") === 0;
}

module.exports = app;
