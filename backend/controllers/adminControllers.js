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
    return res.render("login",{
      error:"Invalid username or password",
    })
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
    console.log('inside toReview');
    const db = await connectDatabase();
    const allWorksCollection = db.collection('allWorks');
    const jobsCollection = db.collection('jobs');
    const jobId = req.params.workId;
    console.log(jobId,29)
  const { action } = req.body;

  if (!jobId || !action) {
    return res.status(400).send({
      message: 'Invalid request parameters',
      status: false
    });
  }

  try {
    const job = await allWorksCollection.findOne({ _id: new ObjectId(jobId) });

    if (!job) {
      return res.status(404).send({
        message: 'Job not found',
        status: false
      });
    }

    // Exclude _id when moving the document to jobsCollection
    delete job._id;

    // Update the job status based on admin's action
    if (action === 'accept') {
      job.approvedBy = req.cookies.name;
      await jobsCollection.insertOne(job); // Move to jobsCollection
    }

    // Remove from allWorksCollection in both cases (accept or reject)
    await allWorksCollection.deleteOne({ _id: new ObjectId(jobId) });

    return res.status(200).send({
      message: 'Job review updated successfully',
      status: true
    });
  } catch (error) {
    console.error('Error reviewing job:', error);
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