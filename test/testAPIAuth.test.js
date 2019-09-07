const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://accounts.spotify.com/api/token';
const authEncoded = Buffer.from(`${process.env.client_id}:${process.env.client_secret}`).toString('base64');

describe('Spotify Api Test', () => {
  describe('Authentication', () => {
    it('Via Client Credentials', async () => {
      const response = await agent.post(`${urlBase}`)
        .type('application/x-www-form-urlencoded')
        .set('Authorization', `Basic ${authEncoded}`)
        .send('grant_type=client_credentials')
        .set('User-Agent', 'agent');


      expect(response.status).to.equal(statusCode.OK);
    });
  });
});
