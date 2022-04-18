const axios = require('axios').default;

exports.handler = async (event, context, callback) => {

  callback(null, {
    statusCode: 200,
    body: "Hello, world!",
    headers: {
      "access-control-allow-origin": "*",
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': '*',
    },
  });

  const data = JSON.parse(event.body)

  //getting auth token
  const responseToken = await axios.post("https://login.artcart.cloud/oauth/token", {
    grant_type: 'client_credentials',
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    audience: 'platform.artcart.app/api/transactional/'
  });
  const token = responseToken.data.access_token;

  const responseNFT = await axios.get(`https://platform.artcart.cloud/api/transactional/nft`, 
  { headers: { "Authorization": `Bearer ${token}` } });

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  return { 
    statusCode: 200,
    body: responseNFT.data
  }
};