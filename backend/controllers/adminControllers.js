const { connectDatabase } = require('../db/db');
const {v4 :uuidv4} = require('uuid');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { setUser } = require('../service/auth');

const signUp = async(req,res) => {
  try {
    const db = await connectDatabase();
    const usersCollection = db.collection('users');
    const body = req.body;
    const result = await usersCollection.insertOne(body);
    if(result.insertedId){
        return res.status(200).send(result);
    }
    else{
        return res.status(404).send({
            message:"Can not sign-up",
            status:"false",
        })
    }
  } catch (error) {
    console.error('Error signing-up:', error);
    return res.status(500).send({
      message: 'Internal Server Error',
      status: false,
    });
  }

}

const logIn = async(req,res) =>{
  const db = await connectDatabase();
  const usersCollection = db.collection('users');
  const {email,password} = req.body;
  const user = await usersCollection.findOne({email,password});
  if(!user){
    res.send({code:500,message:"Admin is not registered"})
  }
  const sessionId = uuidv4();
  setUser(sessionId,user);
  res.cookie("uuid",sessionId);
  return res.redirect("/")
}

const reviewList = async(req,res)=>{
    try {
        const db = await connectDatabase();
        const allWorksCollection = db.collection('allWorks');
        const allWorks = await allWorksCollection.find({}).toArray();
    
        return res.status(200).json({
          message: 'All works retrieved successfully',
          status: true,
          data: allWorks
        });
      } catch (error) {
        console.error('Error retrieving all works:', error);
        return res.status(500).json({
          message: 'Internal Server Error',
          status: false
        });
      }
}

const toReview = async (req, res) => {
  console.log('66');
  const db = await connectDatabase();
  const allWorksCollection = db.collection('allWorks');
  const worksCollection = db.collection('works');
  const workId = req.params.workId;
  console.log(workId, 29)
  const { action } = req.body;
  console.log(action, 73)
  if (!workId || !action) {
      return res.status(400).send({
          message: 'Invalid request parameters',
          status: false
      });
  }

  try {
      const allWork_work = await allWorksCollection.findOne({ _id: new ObjectId(workId) });

      if (!allWork_work) {
          return res.status(404).send({
              message: 'Work not found',
              status: false
          });
      }

      // Exclude _id when moving the document to jobsCollection
      delete allWork_work._id;

      // Update the job status based on admin's action
      if (action === 'accept') {
          allWork_work.approvedBy = req.cookies.name;
          await worksCollection.insertOne(allWork_work); // Move to jobsCollection
      }

      // Remove from allWorksCollection in both cases (accept or reject)
      await allWorksCollection.deleteOne({ _id: new ObjectId(workId) });

      return res.status(200).send({
          message: 'Work review updated successfully',
          status: true
      });
  } catch (error) {
      console.error('Error reviewing work:', error);
      return res.status(500).send({
          message: 'Internal Server Error',
          status: false
      });
  }
};


module.exports = {
    toReview,
    reviewList,
    signUp,
    logIn
}