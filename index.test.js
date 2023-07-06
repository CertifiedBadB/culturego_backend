const { signup_post } = require('./controllers/userController');

const mongod = new MongoMemoryServer();

describe('signup_post', () => {
   let connection;
  let db;

  let req;
  let res;

 beforeAll(async () => {
    const uri = await mongod.getUri();
    connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
    await mongod.stop();
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
