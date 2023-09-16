import UserDaoFS from './file/user.dao.js';
import ProductDaoFS from './file/product.dao.js';
import ProductDaoMongo from './mongoDb/product.dao.js';
import UserDaoMongo from './mongoDb/user.dao.js';
import {initMongoDB} from './mongoDb/connection.js';
import TicketDao from './mongoDb/ticket.dao.js';

let prodDao;
let userDao;
let ticketDao;
let persistence = process.argv[2]

switch (persistence) {
    case 'file': userDao = new UserDaoFS()
        prodDao = new ProductDaoFS()
        break;
    case 'mongo':
        await initMongoDB()
        userDao = new UserDaoMongo()
        prodDao = new ProductDaoMongo()
        ticketDao = new TicketDao()
        break;
    default: userDao = new UserDaoFS();
        prodDao = new ProductDaoFS();
        persistence = 'file'
        console.log(persistence);
        break;

}

export default {userDao, prodDao, ticketDao}
