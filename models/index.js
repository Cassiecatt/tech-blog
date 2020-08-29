const User = require('./User'); //user model
const Post = require('./Post'); //post model

//Associations 

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});




module.exports = { User, Post };