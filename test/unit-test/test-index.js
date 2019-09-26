

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../../app.js');


// chai.should();

// chai.use(chaiHttp);

// describe('POST /register/', () => {
    
//     it('Index path', (done) => {
//         chai.request(server)
//             .post("/register")
//             .set('content-type', 'application/x-www-form-urlencoded')
//             .send({
//                 username: 'ts@lol.se',
//                 password: "1234568"
//             })
//             .end((err, res) => {
//                 console.log(res.body);
//                 res.should.have.status(200);
//                 res.body.should.be.an("string");
//                 res.body.should.be.equal("Success");


//                 done();
//             });
//     });
// });