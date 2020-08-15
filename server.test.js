const request = require('supertest')

const server = require('./api/server.js')
const { set } = require('./api/server.js')

let token

beforeAll((done) => {
    request(server)
      .post('/api/auth/login')
      .send({
        username: 'user',
        password: 'pass',
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done()
      })
  })

describe('server.js', () => {

    describe('auth router', () => {

        describe('register', () => {
            it('should return a 201 status', () => {
        return request(server)
            .post('/api/auth/register')
            .send({
                username: 'unique user2',
                password: 'pass'
            })
            .then(response => {
                expect(response.statusCode).toEqual(201)
            })
        })
        it('should return text', () => {
            return request(server)
                .get('/api/auth/register')
                .send({
                    username: 'user 1',
                    password: 'pass'
                })
                .then(response => {
                    expect(response.type).toEqual('text/html')
                })
         })
        
    }) 
    
        describe('login', () => {
            it('should return a 200 status', () => {
                return request(server)
                    .post('/api/auth/login')
                    .send({
                        username: 'user',
                        password: 'pass'
                    })
                    .then( response => {
                        expect(response.statusCode).toEqual(200)
                    })
                
                }) 
            it('should return text', () => {
                return request(server)
                    .get('/api/auth/login')
                    .send({
                        username: 'user',
                        password: 'pass'
                    })
                    .set('Accept', 'application/json')
                    .then(response => {
                        expect(response.type).toEqual('text/html')
                    })
             })
        })
    
    })

describe('jokes router', () => {

    it('should return a 200', () => {
        return request(server)
            .get('/api/jokes')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
            })
    })

    it('should return a json object', () => {
        return request(server)
            .get('/api/jokes')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.type).toEqual('application/json')
            })
    })
})
    
})