// migrate-mongo-config.js
module.exports = {
    mongodb: {
        url: 'mongodb://localhost:27017/auth_users',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // Add any other MongoDB connection options here
        }
    },
    migrationsDir: './migrations'
};
