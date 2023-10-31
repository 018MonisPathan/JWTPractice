const crypto = require('crypto')
const fs = require('fs')

function generatePublicPrivateKey(){

   const createKeyPair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      }
   })

   fs.writeFileSync(__dirname+'/rsaPublicKey.pem',createKeyPair.publicKey)
   fs.writeFileSync(__dirname+'/rsaPrivateKey.pem',createKeyPair.privateKey)

}

generatePublicPrivateKey()