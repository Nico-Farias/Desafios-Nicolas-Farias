import Controllers from './class.controllers.js';
import TickerServices from '../services/ticket.services.js';
import {createResponse} from '../utils.js';
import error from '../errors/error.dictionary.js'
import {HttpResponse} from '../errors/http.response.js';
const ticketServices = new TickerServices();
const httpResponse = new HttpResponse();

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
                httpResponse.NotFound(res, {msg: 'Invalid ticket'})
            }


            httpResponse.ok(res, {
                msg: 'Compra correcta ',
                ticket
            })
        } catch (error) {
            next(error.message)
        }
    }
}
