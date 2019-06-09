const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const db = require('./helpers/database')
const sequelize = require('./helpers/database')
const Product = require('./models/product')
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products').then(res => {
//     console.log(res[0], res[1])
// }).catch(err => {
//     console.log(err)
// })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//incomming request 
app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user
        next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//make a RELATIONSHIP (associations user-product) CONTRAINTS = MANAGE ONDELETE = DELETE
Product.belongsTo(User, { contraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)

// sequelize.sync({ forced: true })
sequelize.sync()
.then(res => {
    return User.findByPk(1)
    //console.log(res)
})
.then(user => {
    if(!user) {
        return User.create({ name: 'aziz', email: 'ziz@test.com' })
    }
    return user
})
.then(user => {
    //console.log(user)
    app.listen(3000)
})
.catch(err => console.log(err))


