let tester = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = tester.should();

tester.use(chaiHttp);

describe('Check frontend paths', () => {
    describe('/GET / 200', () => {
        it('it should display the `Home` page', (done) => {
            tester.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET /index 200', () => {
        it('it should display the `Home` page', (done) => {
            tester.request(app)
                .get('/index')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET /verify 200', () => {
        it('it should display the `Verify Identity` page', (done) => {
            tester.request(app)
                .get('/verify')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET /verify 404', () => {
        it('it should display the `Verify Identity` page with 404 status code', (done) => {
            tester.request(app)
                .get('/verify?result=false&search=123')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/GET /profileCard?code=SG12345678Z 200', () => {
        it('it should display the `Profile Card` page', (done) => {
            tester.request(app)
                .get('/profileCard?code=SG12345678Z')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET /profileCard?code=null 404', () => {
        it('it should redirect to `Verify Identity` page with 404 status code', (done) => {
            tester.request(app)
                .get('/profileCard?code=null')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.error.path.should.eq('/verify?result=false&search=null');
                    done();
                });
        });
    });

    describe('/GET /register 200', () => {
        it('it should display the `Register` page', (done) => {
            tester.request(app)
                .get('/register')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET /myinfo 200', () => {
        it('it should display the `Register with MyInfo` page', (done) => {
            tester.request(app)
                .get('/myinfo')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET /myinfoBusiness 200', () => {
        it('it should display the `Register with MyInfo Business` page', (done) => {
            tester.request(app)
                .get('/myinfoBusiness')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET /login 200', () => {
        it('it should display the `Login` page', (done) => {
            tester.request(app)
                .get('/login')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET /asdfghjkl 404', () => {
        it('it should display the `Error` page when an invalid path is entered', (done) => {
            tester.request(app)
                .get('/asdfghjkl')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});

describe('Check API endpoints', () => {
    before((done) => {
        // create database
        done();
    });

    after((done) => {
        // clear database
        done();
    });
});