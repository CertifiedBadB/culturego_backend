const {MongoClient} = require('mongodb');
const {UserController} = require('./controllers/userController')
describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});

// spy on method in service
const mockSaveProduct = jest.spyOn(UserController, 'saveProduct')
// dummy product
const mockProductObject = { email: 'dummy@dummy.nl', password: '123@12OO' };
// result is defined in the format we return in APIs
const mockProduct = jest.fn(async () => {
  return { data: mockProductObject };
});
// mocking method implementation
mockSaveProduct.mockImplementation(mockProduct);

const response = httpMocks.createResponse();
  const request = httpMocks.createRequest();
  request.body = { email: 'dummy@dummy.nl', password: '123@12OO' };

  it('should create a product', async () => {
    const response = httpMocks.createResponse();
    const request = httpMocks.createRequest();
    request.body = {
      name: 'dummy 1',
      price: 10
    };
    const mockProduct = jest.fn(async () => {
      return { data: mockProductObject };
    });
    mockSaveProduct.mockImplementation(mockProduct);
    await UserController.signup_post(request, response);
    expect(mockSaveProduct).toHaveBeenCalledTimes(1);
    expect(mockSaveProduct).toHaveBeenCalledWith(mockProductObject);
    expect(response.statusCode).toEqual(201);
    expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData().data.name).toEqual('dummy 1');
  });