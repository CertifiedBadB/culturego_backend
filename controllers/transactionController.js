const Transaction = require ('../model/Transaction');
const User = require ('../model/User');
const MailingController = require('./mailingController')


module.exports.transaction_post = async (req, res) => {
    const { user, pascode } = req.body;
  
    try {
      const userGet = await User.findById(user);
      if (!userGet) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        try {
          const transaction = new Transaction({
            points: userGet.points,
            user: user,
          });
          await User.findOneAndUpdate(
            { _id: user }, // Fix: Use 'user' instead of 'id'
            { points: 0 }, // Update points
            { new: true } // Return the updated document
          );
          const t = await transaction.save();
          const mail = await MailingController.transaction_postmail(userGet.email, userGet.points,t._id,pascode );
          return res.status(200).json(transaction);
        } catch (err) {
          return res.status(400).send(err);
        }
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  };





