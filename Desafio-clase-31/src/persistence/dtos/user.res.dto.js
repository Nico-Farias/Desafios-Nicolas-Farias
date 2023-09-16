export default class UserDTO {
    constructor(user) {
        this.nombre = user.nombre;
        this.apellido = user.apellido;
        this.email = user.email;
        this.carts = user.carts;
    }
}
