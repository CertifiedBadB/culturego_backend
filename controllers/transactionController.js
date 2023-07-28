const Transaction = require ('../model/Transaction');
const User = require ('../model/User');
const MailingController = require('./mailingController')


module.exports.transaction_post = async(req, res) => {
    const { user,pascode } = req.body;
    try {
        const userGet = await User.findById(user);
        if (!userGet) {
          return res.status(404).json({ error: 'User not found' });
        }
        else{
              try {
                const transaction = new Transaction({
                    points: userGet.points,
                    user: user,
                  });
                await User.findOneAndUpdate(
                    { _id: id }, // Filter by user ID
                    { points: 0}, // Update points 
                    { new: true } // Return the updated document
                  );
                await transaction.save();
                MailingController.transaction_postmail();
                res.send(transaction);

              } catch (err) {
                res.status(400).send(err);
              }
        }
    }catch (err) {
        res.status(400).send(err);
      }
    };





