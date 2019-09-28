process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/test.sqlite');

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {

    describe('Post reports', () => {
        before((done) => {
            console.log("Deleting report in test database")
            return new Promise(() => {
                db.run(`DELETE  from reports where filename = 'testingfile'`, (err) => {
                    if (err) {
                        console.log("Couldn't delete report testinfile");
                    }

                })
                done();
            })

        })




        it('Success Reports', (done) => {
            chai.request(server)
                .post("/reports")
                .set('sexbomb', '23')
                .send({
                    filename: "testingfile",
                    file: "test test"
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("string");
                    res.body.should.be.equal("Success");


                    done();
                });
        });
    });



    describe('GET /reports/week/hello', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    

                    done();
                });
        });
    });



    
    describe('GET /reports/names', () => {
        it('200 HAPPY PATH', (done) => {
            
            chai.request(server)
                .get("/reports/names")
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    res.body.length.should.be.above(0);

                    done();
                });
        });
    });







    describe('POST /updateReports', () => {
        it('200 /updateReports', (done) => {
            chai.request(server)
                .post("/updateReports")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    filename: "testingfile",
                    file: "testingfile",
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.an("string");
                    res.body.should.be.equal("Updated");


                    done();
                });
        });
    });




});