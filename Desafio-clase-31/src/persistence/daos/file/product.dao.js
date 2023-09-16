import FSDao from "./fs.dao.js";
const path = "./src/daos/file/products.json";

export default class ProductDaoFS extends FSDao {
    constructor() {
        super(path);
    }
};
