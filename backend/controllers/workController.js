const { connectDatabase } = require('../db/db');
const postWorkForReview = async (req, res) => {
    try {
      const db = await connectDatabase();
      const allWorksCollection = db.collection('allWorks');
  
      const body = req.body;
      body.createdAt = new Date();
      body.status = 'pending'; // Initial status
  
      const result = await allWorksCollection.insertOne(body);
  
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: 'Can not get result of pushed work',
          status: false,
        });
      }
    } catch (error) {
      console.error('89Error posting work for review:', error);
      return res.status(500).send({
        message: '89Internal Server Error',
        status: false,
      });
    }
  };

const getAllWorks = async (req, res) => {
    try {
        const db = await connectDatabase();
        const worksCollection = db.collection('works');
    
        const works = await worksCollection.find({}).toArray();
    
        return res.status(200).json({
          message: 'All works retrieved successfully',
          status: true,
          data: works,
        });
      } catch (error) {
        console.error('Error retrieving all works:', error);
        return res.status(500).json({
          message: 'Internal Server Error',
          status: false,
        });
      }
};

const getMyWorks = async (req, res) => {
  const db = await connectDatabase();
  const worksCollection = db.collection('works');
  const workByMail = await worksCollection.find({postedBy:req.params.email}).toArray();
  res.send(workByMail);
};

const updateWork = async (req, res) => {
  console.log('inside toReview');
  const db = await connectDatabase();
  
};

const deleteByID = async (req,res)=>{
        const db = await connectDatabase();
        const worksCollection = db.collection('works');
        const id = req.params.id;
        const filter = {_id:new ObjectId(id)};
        const result = await worksCollection.deleteOne(filter);
        res.send(result);

}


module.exports = {
  postWorkForReview,
  getAllWorks,
  getMyWorks,
  updateWork,
  deleteByID
};
