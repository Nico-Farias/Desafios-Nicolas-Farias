import FSDao from "./fs.dao.js";
const path = "./src/daos/file/users.json";

export default class UserDaoFS extends FSDao {
    constructor() {
        super(path);
    }


};
