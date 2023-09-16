import Services from './class.services.js';
import persistence from '../persistence/daos/persistence.js'

const {prodDao, userDao, ticketDao} = persistence;

export default class TickerServices extends Services {
    constructor() {
        super(ticketDao)
    }

    async generateTicket(userId) {
        try {
            let amountAcc = 0;

            const user = await userDao.getById(userId);
            if (! user) {
                return false;
            }


            for (const prod of user.carts) {
                const idProd = prod._id.toString();
                const prodDB = await prodDao.getById(idProd);
                if (prod.qty <= prodDB.stock) {
                    const amount = prod.qty * prodDB.price;
                    amountAcc += amount;
                }
            }
            const ticket = await ticketDao.create({
                    code: `${
                    Math.random()
                }`,
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purchaser: user.email
            });
            user.carts = [];
            user.save();
            return ticket;


        } catch (error) {
            console.log(error)
        }
    }

}
