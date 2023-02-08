const express = require("express");
const app = express();
const port = 8000;

const { faker } = require('@faker-js/faker');

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

//* Crea 2 clases: Usuario, Empresa con los mismos atributos que se enumeran arriba
class Usuario {
    constructor() {
        this._id = faker.datatype.uuid();
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.phoneNumber = faker.phone.number();
        this.email = faker.internet.email();
        this.password = faker.internet.password();
    }
}
class Empresa {
    constructor() {
        this._id = faker.datatype.uuid();
        this.name = faker.company.name();
        this.address = {
            street: faker.address.direction(),
            city: faker.address.city(),
            state: faker.address.state(),
            postalCode : faker.address.zipCode(),
            country: faker.address.county()
        }
    }
}

//! Crea una ruta api "/api/users/new" que devuelva un nuevo usuario
app.get("/api/users/new", (req, res) => {
    res.json(new Usuario());
});

//! Crea una ruta api "/api/companies/new" que devuelva una nueva compañía
app.get("/api/companies/new", (req, res) => {
    res.json(new Empresa());
});

//! Crea una ruta api "/api/user/company" que devuelva tanto un nuevo usuario como una nueva compañía
app.get("/api/users/company", (req, res) => {
    res.json({empresa: new Empresa(), usuario: new Usuario()});
});

// esto tiene que estar debajo de los otros bloques de código
app.listen( port, () => console.log(`Listening on port: ${port}`) );




