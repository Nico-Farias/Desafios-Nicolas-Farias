import {logguer} from "../../../utils/logguer.js";

export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const response = await this.model.find({})
            return response;
        } catch (error) {
            logguer.error(error);
        }
    }

    async getById(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            logguer.error(error);
        }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            logguer.error(error);
        }
    }

    async update(id, obj) {
        try {
            await this.model.updateOne({
                _id: id
            }, obj);
            return obj;
        } catch (error) {
            logguer.error(error);
        }
    }

    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            logguer.error(error);
        }
    }
}
