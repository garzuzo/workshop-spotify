const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://accounts.spotify.com/api/token';
const authEncoded = Buffer.from(`${process.env.client_id}:${process.env.client_secret}`).toString('base64');
const urlSearch = 'https://api.spotify.com/v1/search';

describe('Spotify Api Test', () => {
  describe('Authentication', () => {
    it('Via Client Credentials', async () => {
      const response = await agent.post(`${urlBase}`)
        .type('application/x-www-form-urlencoded')
        .set('Authorization', `Basic ${authEncoded}`)
        .send('grant_type=client_credentials')
        .set('User-Agent', 'agent');

      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.access_token).to.exist;
    });
  });

  describe('Search track test', () => {
    it('Via search, find Till I Collapse', async () => {
      const response = await agent.post(`${urlBase}`)
        .type('application/x-www-form-urlencoded')
        .set('Authorization', `Basic ${authEncoded}`)
        .send('grant_type=client_credentials')
        .set('User-Agent', 'agent');


      const reqBody = {
        q: 'Till I Collapse',
        type: 'track',
        limit: 20
      };

      const search = await agent.get(`${urlSearch}`)
        .set('Authorization', `Bearer ${response.body.access_token}`)
        .query(reqBody)
        .set('User-Agent', 'agent');
      expect(search.status).to.equal(statusCode.OK);
      expect(search.body.tracks.items).to.have.lengthOf(20);
    });
  });
});
