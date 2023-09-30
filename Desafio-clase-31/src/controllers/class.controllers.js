import {createResponse} from '../utils.js'
import {HttpResponse} from '../errors/http.response.js';
import error from '../errors/error.dictionary.js'
import {logguer} from '../utils/logguer.js';
const httpResponse = new HttpResponse()

export default class Controllers {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const items = await this.service.getAll();
            httpResponse.ok(res, items);
        } catch (error) {
            next(error.message);
        }
    };

    getById = async (req, res, next) => {
        try {
            const {id} = req.params;
            const item = await this.service.getById(id);
            if (! item) 
                httpResponse.NotFound(res, error.ITEM_NOT_FOUND);
             else 
                httpResponse.ok(res, item);
            


        } catch (error) {
            next(error.message);
        }
    };

    create = async (req, res, next) => {
        try {
            const newItem = await this.service.create(req.body);
            if (! newItem) 
                httpResponse.NotFound(res, {
                    method: "service",
                    error: "Validation error"
                });
             else 
                httpResponse.ok(res, newItem);
            


        } catch (error) {
            next(error.message);
        }
    };

    update = async (req, res, next) => {
        try {
            const {id} = req.params;
            const item = await this.service.getById(id);
            if (! item) 
                httpResponse.NotFound(res, logguer.error(error.ITEM_NOT_FOUND));
             else {
                const itemUpd = await this.service.update(id, req.body);
                httpResponse.OK(res, itemUpd);
            }
        } catch (error) {
            next(error.message);
        }
    };

    delete = async (req, res, next) => {
        try {
            const {id} = req.params;
            const item = await this.service.getById(id);
            if (! item) 
                httpResponse.NotFound(res, error.ITEM_NOT_FOUND);
             else {
                const userD = await this.service.delete(id);
                httpResponse.ok(res, {
                    msg: "User deleted",
                    item
                });
            }
        } catch (error) {
            next(error.message);
        }
    };


}
