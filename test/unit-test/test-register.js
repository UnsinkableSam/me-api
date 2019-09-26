

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/test.sqlite');

chai.should();

chai.use(chaiHttp);

describe('POST /register/', () => {
    before((done) => {
        console.log("Deleting users in test database")
        return new Promise(() => {
            db.run(`DELETE  from users where email = 'ola123s'`, (err) => {
                if (err) {
                    console.log("Couldn't delete users");
                }

            })
            done();
        })
        
    })
    

    

    it('Success register', (done) => {
        chai.request(server)
            .post("/register/")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: "ola123s",
                password: "test123  ",
                name: "sam",
                birth: "1/1/2"


                
            })
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.an("string");
                res.body.should.be.equal("Success");


                done();
            });
    });


    it('Failed register', (done) => {
        chai.request(server)
            .post("/register/")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: "ola123",
                password: "test123  ",
                name: "sam",
                birth: "1/1/2"
            })
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.an("string");
                res.body.should.be.equal("Failed");


                done();
            });
    });



  
});


