import Controllers from './class.controllers.js';
import TickerServices from '../services/ticket.services.js';
import {createResponse} from '../utils.js';
const ticketServices = new TickerServices();

export default class TicketController extends Controllers {
    constructor() {
        super(ticketServices)
    }

    async generateTicket(req, res, next) {
        try {
            const {_id} = req.user;

            const ticket = await ticketServices.generateTicket(_id)
            console.log(ticket)
            if (! ticket) {
                createResponse(res, 404, {msg: 'Invalid ticket'})
            }


            createResponse(res, 200, {
                msg: 'Compra correcta ',
                ticket
            })
        } catch (error) {
            next(error.message)
        }
    }
}
