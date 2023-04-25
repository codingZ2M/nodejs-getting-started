const request = require('supertest');
const app = require('./server');


describe("POST /users", () => {

    describe("Given username & password", ()=> {
        test("Should send response with 200 status code", async()=> {
            const response = await request(app).post("/users").send({
                username:"username",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
        })
        test("Should specify JSON in the content type header", async()=> {
            const response = await request(app).post("/users").send({
                username:"username",
                password: "password"
            })
          expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })

      test("Reponse has user id", async()=> {
        const response = await request(app).post("/users").send({
            username:"username",
            password: "password"
        })
      expect(response.body.userId).toBeDefined()
     })

    })


    describe("When username or password is missing", ()=> {
        test("Should respond with status code of 400", async()=> {
            const bodyData = [
                {username: "username"},
               {password: "password"}
            ]

            for (const body of bodyData) {
                const response = await request(app).post("/users").send(body)
                expect(response.statusCode).toBe(400)
            }
         })
    })

})