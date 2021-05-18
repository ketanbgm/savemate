const request = require('supertest');
const app = require("../server");



describe('', function() {
  let getId = 0;
    let empty_name = {
      "name" : "", 
      "description" :"dev",
      "cashback" : 4,
      "slug" : "aaa", 
      "merchant_redirection_url" : "hhtps://localhost:15537",
      "country":"ENgland"
  };
  let empty_cashback = {
    "name" : "cahback", 
    "description" :"dev",
    "cashback" : "",
    "slug" : "aaa", 
    "merchant_redirection_url" : "hhtps://localhost:15537",
    "country":"ENgland"
  };

  let empty_country = {
    "name" : "cahback", 
    "description" :"dev",
    "cashback" : 10,
    "slug" : "aaa", 
    "merchant_redirection_url" : "hhtps://localhost:15537",
    "country":""
  };

  let add_merchant = {
    "name" : "success", 
    "description" :"dev",
    "cashback" : 4,
    "slug" : "aaa", 
    "merchant_redirection_url" : "hhtps://localhost:15537",
    "country":"ENgland"
}
    
  let get_merchant = {
    "getId" : 1
  }



    it('should return a 200 status code for ALL MERCHANT', function(done) {
      request(app)
        .get('/api/merchants')
        .set('Authorization','Basic 5488cb9ef9244c42abc0650dec68fba1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200,done)
    });


    it('should return a 200 status code for empty result', function(done) {
      request(app)
        .get(`/api/merchants/${getId}`)
        .set('Authorization','Basic 5488cb9ef9244c42abc0650dec68fba1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200,done)
    });


    it('should return a 403 status code Merchant name is missing', function(done) {
      request(app)
        .post('/api/merchants/')
        .set('Authorization','Basic 5488cb9ef9244c42abc0650dec68fba1')
        .send(empty_name)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(403,done)
    });

    it('should return a 403 status code for invalid cashback', function(done) {
      request(app)
        .post('/api/merchants/')
        .set('Authorization','Basic 5488cb9ef9244c42abc0650dec68fba1')
        .send(empty_cashback)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(403,done)
    });

    it('should return a 403 status code country is missing', function(done) {
      request(app)
        .post('/api/merchants/')
        .set('Authorization','Basic 5488cb9ef9244c42abc0650dec68fba1')
        .send(empty_country)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(403,done)
    });403

    it('should return a 200 status code new merchant added', function(done) {
      request(app)
        .post('/api/merchants/')
        .set('Authorization','Basic 5488cb9ef9244c42abc0650dec68fba1')
        .send(add_merchant)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200,done)
    });

    it('should return a 200 status code for one merchant', function(done) {
      request(app)
        .get(`/api/merchants/${get_merchant.getId}`)
        .set('Authorization','Basic 5488cb9ef9244c42abc0650dec68fba1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200,done)
    });

    it('should return a 403 status code api key missing', function(done) {
      request(app)
        .post('/api/merchants/')
        .send(add_merchant)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(403,done)
    });

    it('should return a 403 status code wrong api key', function(done) {
      request(app)
        .post('/api/merchants/')
        .set('Authorization','Basic 5488cb9essf9244c42abc0650dec68fba1')
        .send(add_merchant)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(403,done)
    });
      
});
