process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');


chai.should();

chai.use(chaiHttp);

describe('login', () => {
    describe('POST /login/', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login/")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ 
                    username: 'ola123', 
                    password: "test123"
                     })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);


                    done();
                });
        });
    });



    describe('POST /login/', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login/")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    username: 'ola123',
                    password: "1234568"
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


});


