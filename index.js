const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("./serviceAccount.json");


const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });

const storageRef = admin.storage().bucket("gs://nft101-e636b.appspot.com");

async function uploadFile(path, filename) {
  
    const storage = storageRef.upload(path, {
        public: true,
        destination: `metadata/${filename}`,    //to upload images we must change the location as: 'images/${filename}'
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
          },
        },
    });

    return storage

}


//to upload images we must change the location as: './images/{i}.png','${i}.png' 

(async () => { 
    for (let i=1;i<106;i++){
        const res = await uploadFile(`./metadata/${i}.json`, `${i}.json`);
        console.log("Uploaded metadata number "+ i);
    }
})();