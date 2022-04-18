const axios = require('axios').default;

exports.handler = async (event, context, callback) => {
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

  return { 
    statusCode: 200,
    body: responseNFT.data
  }
};