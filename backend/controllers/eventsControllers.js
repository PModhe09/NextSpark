const { connectDatabase } = require('../db/db');
const admin = require('firebase-admin');
const serviceAccount = require('../firebase/nextspark-6e6f8-firebase-adminsdk-jtkjq-971841c8fe.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nextspark-6e6f8-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const weeklyLeaderBoard = async(req,res)=>{
    try {
        const usersSnapshot = await admin.database().ref('usersInfo').once('value');
        const users = usersSnapshot.val();
    
        const userScores = Object.entries(users).map(([uid, userData]) => ({
          uid,
          score: userData.score || 0, // Assuming score is a property of each user
          displayName: userData.displayName || '', // Add displayName if available
          displayPicture: userData.displayPicture || '', // Add displayPicture if available
        }));
    
        res.json(userScores);
      } catch (error) {
        console.error('Error retrieving scores:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }



module.exports = {
    weeklyLeaderBoard
}