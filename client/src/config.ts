// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '8t8gn2ueg4'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-sqnytw1aaphll1pt.us.auth0.com',          
  clientId: 'ro6T6ZXjq1tvJBsPZpNLjwkgZ2jGvYhb', 
  // domain: '...',            // Auth0 domain
  // clientId: '...',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
