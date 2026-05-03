require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const multer = require('multer');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const app = express();

/* DB CONFIG */
const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
  allowExitOnIdle: true
};

const db = pgp(cn);

/* MULTER */
const storage = multer.diskStorage({
  destination: '../client/src/assets/',
  filename: function (req, file, cb){
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

/* MIDDLEWARES */
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

/* SESSION */
app.use(session({
  store: new pgSession({
    pgPromise: db,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 60 * 1000, secure: false },
}));

/* AUTH MIDDLEWARE */
const authenticateSession = (req, res, next) => {
  if (req.session.id_author) {
    next();
  } else {
    res.sendStatus(401);
  }
};

/* TEST */
app.get('/hello', (req, res) => {
  res.json({ message: "Hola" });
});

/* GET ALL POSTS */
app.get('/posts', (req, res) => {
  db.any('SELECT * FROM post')
    .then(data => res.json(data))
    .catch(error => {
      console.log('ERROR:', error);
      res.status(500).send(error.message);
    });
});

/* GET ONE POST */
app.get('/posts/:id_post', (req, res) => {
  db.one(`
    SELECT post.*, author.name, author.last_name
    FROM post
    JOIN author ON post.id_author = author.id_author
    WHERE post.id_post=$1
  `, [req.params.id_post])
    .then(data => res.json(data))
    .catch(error => {
      console.log('ERROR:', error);
      res.status(500).send(error.message);
    });
});

/* GET AUTHOR */
app.get('/authors/:id_author', (req, res) => {
  db.one(
    `SELECT *, TO_CHAR(date_of_birth, 'DD/MM/YYYY') as date_of_birth 
     FROM author 
     WHERE id_author = $1`,
    [req.params.id_author]
  )
    .then(data => res.json(data))
    .catch(error => {
      console.log('ERROR:', error);
      res.status(500).send(error.message);
    });
});

/* CREATE POST */
app.post('/posts/new', upload.single('img'), (req, res) => {
  db.none(
    "INSERT INTO post (title, image, text, id_author) VALUES($1, $2, $3, $4)",
    [
      req.body.title,
      req.file?.originalname || null,
      req.body.text,
      req.body.id_author
    ]
  )
  .then(() => res.json({ message: 'Post agregado correctamente' }))
  .catch((error) => {
    console.log("ERROR REAL:", error);
    res.status(500).json({ error: error.message });
  });
});

/* LOGIN */
app.post('/login', upload.none(), (req, res) => {
  const { username, password } = req.body;

  db.oneOrNone("SELECT * FROM author WHERE username=$1", [username])
    .then((data) => {
      if (data && data.password == password) {

        req.session.id_author = data.id_author;

        req.session.save((err) => {
          if (err) return res.status(500).send(err);

          res.json({ id_author: data.id_author });
        });

      } else {
        res.status(401).send('Invalid credentials');
      }
    })
    .catch((error) => {
      console.log('ERROR:', error);
      res.status(500).send('Server error');
    });
});

/* LOGOUT */
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Error al cerrar sesión');
    res.send('Sesión cerrada');
  });
});

/* SESSION INFO */
app.get('/session-info', (req, res) => {
  res.json(req.session);
});

/* SERVER */
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});