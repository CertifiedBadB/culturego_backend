const { signup_post } = require('./controllers/userController');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('signup_post', () => {
   let connection;
   let db;
 
   let req;
   let res;
 
   let mongod;
 
   beforeAll(async () => {
     mongod = await MongoMemoryServer.create();
     const uri = mongod.getUri();
     connection = await MongoClient.connect(uri, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     db = connection.db();
   });
 
   afterAll(async () => {
     if (connection) {
       await connection.close();
     }
     if (mongod) {
       await mongod.stop();
     }
   });

   beforeEach(() => {
    req = {
      body: {
        email: 'dummy@dummy.nl',
        password: '123@12OO'
      }
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user and return a token', async () => {
    const createToken = jest.fn().mockReturnValue('dummy-token');
    const User = {
      create: jest.fn().mockResolvedValue({ _id: 'some-user-id' })
    };

    const expectedUser = { user: 'some-user-id' };

    await signup_post(req, res);

    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith({
      email: 'dummy@dummy.nl',
      password: '123@12OO'
    });

    expect(createToken).toHaveBeenCalledTimes(1);
    expect(createToken).toHaveBeenCalledWith('some-user-id');

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedUser);
  }, 10000);

  it('should handle errors and return error messages', async () => {
    const error = new Error('Invalid email');
    const handleErrors = jest.fn().mockReturnValue(['Invalid email']);

    const User = {
      create: jest.fn().mockRejectedValue(error)
    };

    const expectedErrors = ['Invalid email'];

    await signup_post(req, res);

    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith({
      email: 'dummy@dummy.nl',
      password: '123@12OO'
    });

    expect(handleErrors).toHaveBeenCalledTimes(1);
    expect(handleErrors).toHaveBeenCalledWith(error);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedErrors);
  }, 10000);
});
