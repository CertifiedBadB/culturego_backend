// const { signup_post } = require('./controllers/userController');
// const User = require('./model/User');
// const {MongoClient} = require('mongodb');
// const { MongoMemoryServer } = require('mongodb-memory-server');
// require('./dbConnect');

// describe('Signup', () => {


//   beforeAll(async () => {
//     // Connect to the MongoDB database
//     await mongoose.connect(process.env.DB_CONNECTION, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       autoIndex: true,
//     });
//   });

//   afterAll(async () => {
//     // Disconnect from the MongoDB database
//     await mongoose.disconnect();
//   });

//   beforeEach(async () => {
//     // Clear the user collection before each test
//     await User.deleteMany({});
//   });

//   it('should create a new user and return the user ID', async () => {
//     const req = {
//       body: {
//         email: 'test@example.com',
//         password: 'passwS@123ord',
//         photo: 'photo-url',
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
  
//     await signup_post(req, res);
  
//     console.log('Response:', res); // Add this line for logging
  
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({ user: expect.any(String) });
  
//     // Check if the user is created in the database
//     const user = await User.findOne({ email: 'test@example.com' });
//     expect(user).toBeDefined();
//     expect(user.email).toBe('test@example.com');
//     expect(user.password).toBe('password');
//     expect(user.photo).toBe('photo-url');
//   },30000);

//   it('should handle errors and return error messages', async () => {
    
//     // Create a user with the same email to simulate duplicate error
//     await User.create({
//       email: 'test@example.com',
//       password: 'password',
//       photo: 'photo-url',
//     });

//     const req = {
//       body: {
//         email: 'test@example.com',
//         password: 'password',
//         photo: 'photo-url',
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await signup_post(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       email: 'Dit email adres heeft al een account bij ons',
//     });
//   }, 30000);
// });