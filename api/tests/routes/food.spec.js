/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { User, Recipe, conn } = require('../../src/db.js');

const agent = session(app);

const initialUsers = [
  {
    name: "ADM",
    lastName: "ADM",
    email: "ADM@ADM.COM",
    password: "ADM"
  },
  {
    name: "ROOT",
    lastName: "ROOT",
    email: "ROOT@ADM.COM",
    password: "ROOT"
  },
  {
    name: "USER1",
    lastName: "USER1_LASTNAME",
    email: "USER1@FOOD.COM",
    password: "USER1_PASS"
  },
  {
    name: "USER2",
    lastName: "USER2_LASTNAME",
    email: "USER2@FOOD.COM",
    password: "USER2_PASS"
  }
]

const recipe = {
  title: 'Milanesa a la napolitana',
  summary: "Una milanesa con salsa napolitana"
};

before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  })
);

describe("Users routes", () => {

  beforeEach( () => User.sync({ force: true })
    .then(() => User.bulkCreate(initialUsers))
    )

  describe('GET /users', () => {

    it("Users are returned as json", async () => {
      await agent.get("/users")
      .expect(200)
      .expect("Content-Type", /application\/json/)
    })

    it("Should have four users initially", async () => {
      const res = await agent.get("/users")
      expect( res.body ).to.have.lengthOf(initialUsers.length)
    })

    it("Should return the correct users", async () => {
      const res = await agent.get("/users")
      expect( res.body[0].name ).to.equal("ADM")
      expect( res.body[1].last_name ).to.equal("ROOT")
      expect( res.body[2].email ).to.equal("USER1@FOOD.COM")
      expect( res.body[3].password ).to.equal("USER2_PASS")
    })

    it('I should get a 201 y un msg User created successfully!! , when creating a user', async () => {
      const res = await agent.post('/users').send({
        name:"user back",
        lastName: "user_app",
        email: "userBack@food.com",
        password: "userBack_pass"
      })
      .expect(201)
      expect(res.body).to.eql( {msg: "User created successfully!!"} )
    })
  })
})

describe('Recipe routes', () => {

  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', async () => {
      await agent.get('/recipes').expect(200)
    });

    it ( "You should get a 'Not Found' message if you don't match any recipes", async () => {
      const req = await agent.get("/recipes?name=nombrequejamasencontrara")
      expect(req.body).to.eql({ msg: "Recipe not found!!" })
    })

    });
    describe( "POST /recipes", () => {
      it("I should get a 201 y un msg Successfully created recipe!! , when creating a recipe", 
      async () => {
        const res = await agent.post("/recipes").send({
          title: "receta casera",
          summary: "description recipe 2 ",
          image:"image recet",
          healthScore:"85.3",
          diets:[1,2]
      })
        .expect(201)
        expect(res.body).to.eql( {msg: "Recipe created successfully!!"} )
      })
    })
});