import persistence from '../../persistence/daos/persistence.js'
import UserDaoMongo from '../../persistence/daos/mongoDb/UserDaoMongo.js';
const userDao = new UserDaoMongo();
import assert from 'node:assert'
import test from 'node:test'
// const {userDao} = persistence;


test("Deberia mostrar todos los usuarios de la base de datos", async () => {
    const response = await userDao.getAll()
    assert.equal(Array.isArray(response), true)

})

test("Deberia crear un usuario", async () => {
    const user = {
        nombre: "juan carlos",
        apellido: "farias",
        email: "nicoscs12@gmail.com",
        password: "12345",
        admin: true

    }

    const response = await userDao.register(user)

    assert.strictEqual(typeof user.nombre === "string", true)
    assert.strictEqual(typeof user.apellido === "string", true)
    assert.strictEqual(typeof user.email === "string", true)
    assert.strictEqual(typeof user.password === "string", true)


})

test("Deberia buscar un user por Id", async () => {
    const user = {
        nombre: "juan carlos",
        apellido: "farias",
        email: "nicoscs12@gmail.com",
        password: "12345"
    }

    const response = await userDao.register(user)
    const responseId = response._id.toString()
    const NewUser = await userDao.getById(response._id)
    const NewUserId = NewUser._id.toString()
    assert.equal(NewUserId, responseId)

})

test("Deberia hacer login", async () => {

    const newUser = {
        nombre: "juan carlos",
        apellido: "farias",
        email: "nicoscs12@gmail.com",
        password: "12345"
    }

    await userDao.register(newUser)


    const user = {
        email: "nicoscs12@gmail.com",
        password: "12345"

    }

    const response = await userDao.login(user)

    assert.equal(user.email, response.email)
    assert.strictEqual(typeof user.email === "string", true)
    assert.strictEqual(typeof user.password === "string", true)


})
