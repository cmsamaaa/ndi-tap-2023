const tester = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = tester.should();

const profiles = require("../models/profiles");
const generate_person = require('../lib/generate_person');

tester.use(chaiHttp);

describe('Check frontend paths', () => {
    before((done) => {
        // create table and insert seed data
        profiles.createTableIfNotExist().then(res => {
            done();
        });
    });

    after((done) => {
        // drop tale
        profiles.dropTable().then(res => {
            done();
        });
    });

    /* Start of API endpoint unit tests */
    describe('/POST /api/createProfile 200 | (Individual)', () => {
        it('it should return a json object with id and 200 status code', (done) => {
            const profile = generate_person.random_individual();
            tester.request(app)
                .post('/api/createProfile')
                .send(profile)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.id.should.not.be.null;
                    done();
                });
        });
    });

    describe('/POST /api/createProfile 200 | (Entity Individual)', () => {
        it('it should return a json object with id and 200 status code', (done) => {
            const profile = generate_person.random_entity_individual();
            tester.request(app)
                .post('/api/createProfile')
                .send(profile)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.id.should.not.be.null;
                    done();
                });
        });
    });

    describe('/POST /api/createProfile 400 | POST duplicate code', () => {
        it('it should return a 400 status code', (done) => {
            tester.request(app)
                .post('/api/createProfile')
                .send({
                    code: 'SG12345678Z',
                    fullName: 'John Doe',
                    sex: 'Male',
                    race: 'Chinese',
                    email: 'john_doe@gmail.com',
                    nric: 'S9025123Z'
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/POST /api/createProfile 400 | POST empty request body', () => {
        it('it should return a 400 status code', (done) => {
            tester.request(app)
                .post('/api/createProfile')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('/GET /api/getProfile/:code 200', () => {
        it('it should return a json object with id and 200 status code', (done) => {
            tester.request(app)
                .get('/api/getProfile/SG12345678Z')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.not.be.null;
                    done();
                });
        });
    });

    describe('/GET /api/getProfile/null 404', () => {
        it('it should return a 404 status code', (done) => {
            tester.request(app)
                .get('/api/getProfile/null')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('/GET /api/null 404', () => {
        it('it should return a 404 status code and error message', (done) => {
            tester.request(app)
                .get('/api/null')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.message.should.be.eq('API endpoint not found');
                    done();
                });
        });
    });
    /* End of API endpoint unit tests */

    /* Start of fullstack app unit tests */
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

    describe('/GET /profileCard?code= 404', () => {
        it('it should redirect to `Verify Identity` page with 404 status code', (done) => {
            tester.request(app)
                .get('/profileCard?code=')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.error.path.should.eq('/verify?result=false');
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

    describe('/POST /submit/register 200 | (MyInfo)', () => {
        it('it should display the `Profile Card` page', (done) => {
            const profile = generate_person.random_individual();
            tester.request(app)
                .post('/submit/register')
                .send(profile)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.redirects[0].split('/')[3].should.eq('profileCard?code=' + profile.code);
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

    describe('/POST /submit/register 400 | POST empty request body', () => {
        it('it should display the `Register` page with 400 status code', (done) => {
            tester.request(app)
                .post('/submit/register')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.redirects[0].split('/')[3].should.eq('register?result=false');
                    done();
                });
        });
    });

    describe('/POST /submit/register 200 | (MyInfo Business)', () => {
        it('it should display the `Profile Card` page', (done) => {
            const profile = generate_person.random_entity_individual();
            tester.request(app)
                .post('/submit/register')
                .send(profile)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.redirects[0].split('/')[3].should.eq('profileCard?code=' + profile.code);
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

    describe('/GET /null 404', () => {
        it('it should display the `Error` view when an invalid path is entered', (done) => {
            tester.request(app)
                .get('/null')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
    /* End of fullstack app unit tests */
});