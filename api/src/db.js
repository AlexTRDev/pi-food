require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME
} = process.env;

// API_KEY=206aac4c607943c49eb99bf20a699dad 
// API_URL=https://api.spoonacular.com/recipes/complexSearch
// API_URL2=https://api.spoonacular.com/recipes/{id}/information
// API_FLAG=&addRecipeInformation=true
// API_URL100=https://api.spoonacular.com/recipes/complexSearch?apiKey=206aac4c607943c49eb99bf20a699dad&number=100

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipe, Diet, Step, User } = sequelize.models;
// Aca vendrian las relaciones
// Recetas ==> N-M<== Dietas;
Recipe.belongsToMany(Diet, { through: 'recipe_diet' });
Diet.belongsToMany(Recipe, { through: 'recipe_diet' });

// Recetas ==> 1-N <== Pasos;
Recipe.hasMany(Step);
Step.belongsTo(Recipe);

// Usuarios ==> N-M <== Recetas
User.belongsToMany(Recipe, { through: "favorite", as: "favorites" });
Recipe.belongsToMany(User, { through: "favorite", as: "favorites" });

// Usuario ==> N-N <== Receta
User.belongsToMany(Recipe, { through: "user_recipe" });
Recipe.belongsToMany(User, { through: "user_recipe" });

// Usuario ==> N-N <== Dieta
User.belongsToMany(Diet, { through: "user_diet" });
Diet.belongsToMany(User, { through: "user_diet" });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op,
};
