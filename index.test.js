const { signup_post, logout_get, login_post, getById, handleErrors, createToken } = require('./controllers/userController');
const User = require('./model/User');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

// Create a new instance of MongoMemoryServer
const mongod = new MongoMemoryServer();
let db;


describe('User Controller', () => {
  beforeAll(async () => {
    await mongod.start();
    const uri = mongod.getUri();
    connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db();
  });

  afterAll(async () => {
    await connection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    // Clear the users collection before each test
    await db.collection('users').deleteMany({});
  });

  describe('signup_post', () => {
    it('should create a user and return the user ID', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password',
          photo: 'photo-url',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signup_post(req, res);

      const createdUser = await db.collection('users').findOne({ email: 'test@example.com' });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ user: createdUser._id.toString() });
      expect(createdUser.email).toBe('test@example.com');
      expect(createdUser.password).toBe('password');
      expect(createdUser.photo).toBe('photo-url');
    });

    it('should handle errors and return error messages', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password',
          photo: 'photo-url',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Simulate an error by passing an existing email address
      await db.collection('users').insertOne({ email: 'test@example.com' });

      await signup_post(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        email: 'Dit email adres heeft al een account bij ons',
      });
    });
  });
  describe('logout_get', () => {
    it('should clear the JWT cookie', () => {
      const res = {
        clearCookie: jest.fn(),
      };

      logout_get({}, res);

      expect(res.clearCookie).toHaveBeenCalledWith('jwt');
    });
  });

  describe('login_post', () => {
    it('should authenticate the user and return the user ID and token', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Create a test user
      const createdUser = await db.collection('users').insertOne({
        email: 'test@example.com',
        password: 'password',
      });

      await login_post(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: createdUser._id.toString(),
        token: expect.any(String),
      });
    });

    it('should handle errors and return error messages', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrong-password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await login_post(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errors: { email: 'Ingevoerde gegevens kloppen niet.' } });
    });
  });

  describe('getById', () => {
    it('should return the user by ID if found', async () => {
      // Create a test user
      const createdUser = await db.collection('users').insertOne({
        _id: 'test-user-id',
        email: 'test@example.com',
        password: 'password',
      });

      const req = {
        body: {
          id: 'test-user-id',
        },
      };
      const res = {
        json: jest.fn(),
      };

      await getById(req, res);

      expect(res.json).toHaveBeenCalledWith(createdUser.ops[0]);
    });

    it('should return an error if the user is not found', async () => {
      const req = {
        body: {
          id: 'nonexistent-user-id',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return an error if an internal server error occurs', async () => {
      const req = {
        body: {
          id: 'test-user-id',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Simulate an internal server error by passing an invalid user ID
      await getById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
  describe('handleErrors', () => {
    it('should return appropriate error messages based on the error', () => {
      const err1 = new Error('verkeerde email');
      const err2 = new Error('verkeerde wachtwoord');
      const err3 = { code: 11000 };
      const err4 = new Error('user validation failed');
      err4.errors = {
        email: { properties: { path: 'email', message: 'Email is required' } },
        password: { properties: { path: 'password', message: 'Password is required' } },
      };

      const errors1 = handleErrors(err1);
      const errors2 = handleErrors(err2);
      const errors3 = handleErrors(err3);
      const errors4 = handleErrors(err4);

      expect(errors1).toEqual({ email: 'Ingevoerde gegevens kloppen niet.' });
      expect(errors2).toEqual({ email: 'Ingevoerde gegevens kloppen niet.' });
      expect(errors3).toEqual({ email: 'Dit email adres heeft al een account bij ons' });
      expect(errors4).toEqual({
        email: 'Email is required',
        password: 'Password is required',
      });
    });
  });
});
