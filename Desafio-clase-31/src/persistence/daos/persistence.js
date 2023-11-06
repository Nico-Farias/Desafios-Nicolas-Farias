import UserDaoFS from './file/user.dao.js';
import ProductDaoFS from './file/product.dao.js';
import ProductDaoMongo from './mongoDb/product.dao.js';
import {initMongoDB} from './mongoDb/connection.js';
import TicketDao from './mongoDb/ticket.dao.js';
import {logguer} from '../../utils/logguer.js';
import UserDaoMongo from './mongoDb/UserDaoMongo.js';

let prodDao;
let userDao;
let ticketDao;
let persistence = process.argv[2]

switch (persistence) {
    case 'file': userDao = new UserDaoFS()
        prodDao = new ProductDaoFS()
        logguer.info('File System')
        break;
    case 'mongo':
        await initMongoDB()
        userDao = new UserDaoMongo()
        prodDao = new ProductDaoMongo()
        ticketDao = new TicketDao()


        break;
    default:
        await initMongoDB()
        userDao = new UserDaoMongo()
        prodDao = new ProductDaoMongo()
        ticketDao = new TicketDao()

        break;

}

export default {userDao, prodDao, ticketDao}
