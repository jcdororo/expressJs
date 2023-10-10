const express = require('express');
const PORT = 4000;
const path = require('path')

const usersRouter = require('./routes/users.router')
const postsRouter = require('./routes/posts.router');
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'hbs');
app.set('vies', path.join(__dirname, 'views'));


app.use('/static',express.static(path.join(__dirname, 'public')));

app.use(express.json());

mongoose.connect(`mongodb+srv://wnwlcks123:wnwlcks123@express-cluster.5v9rwcx.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log('mongodb connected'))  
  .catch(err => console.log(err))

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`)
  next();
  const diffTime = Date.now() - start;
  console.log(`end: ${req.method} ${req.baseUrl} ${diffTime}ms`)
})

app.get('/', (req, res) => {
  res.render('index', {
    imageTitle: "It is a huhdang"
  })
})


app.use('/users', usersRouter)
app.use('/posts', postsRouter)



app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})