 require('dotenv').config({ path: '.env.development' });

module.exports = {
    user: process.env.DB_USER,
    host:process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:6543,
    pool : {
        max: 10,                  
        min: 0,                 
        acquire: 30000,          
        idle: 10000 
    }
 
}