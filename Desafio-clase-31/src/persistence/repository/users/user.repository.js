import persistence from "../../daos/persistence.js";
import UserDTO from '../../dtos/user.res.dto.js';
const {userDao} = persistence;

export default class UserRepository {
    constructor() {
        this.dao = userDao;
    }

    async userRepositoryDto(id) {
        try {

            const user = await this.dao.getById(id)

            return new UserDTO(user);
        } catch (error) {
            console.log(error)
        }
    }

}
