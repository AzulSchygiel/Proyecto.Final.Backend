import chai from "chai";
import { request } from "express";
import supertest from "supertest";
import { app } from "../src/app.js";

const expect = chai.expect;
const requester = supertest(app)

describe("Testing de App LibreMercado", () => {

    describe("Test de módulo para Signup", async function () {
        it("El endpoint POST /api/session/signup debe resgistrar un nuevo usuario en este caso admin", async () => {
            const userMock = {
                name: "libremercado",
                last_name: "proyecto",
                age: "10",
                email: "libremercado@gmail.com",
                password: "123"
            }
            const result = await requester.post('/api/session/signup').send(userMock)
            expect(result).to.be.ok
        })
    })
    describe("Test de módulo para Login", () => {
        it("El endpoint POST /api/session/login debe logear al usuario", async function () {
            const userMock = {
                email: "libremercado@gmail.com",
                password: "123"
            }
            const result = await requester.post('/api/session/login').send(userMock)
            console.log("result", result)
            expect(result).to.be.ok
        })
    })

    describe("Test de módulo crear un producto", async function () {
        before(async function () {
            const userMock = {
                email: "libremercado@gmail.com",
                password: "123"
            }
            const login = await requester.post('/api/session/login').send(userMock)
        })
        it("El endpoint POST /api/products/ debe crear un producto", async function () {
            const ProductMock = {
                title: "Producto0",
                description: "Producto de prueba",
                price: 4860,
                thumbnail: "imagen",
                code: 2006,
                stock: 90,
                category: "ropa",
                status: true
            }
            const result = await requester.post('/api/products').send(ProductMock)
            console.log("product", result)
            expect(result).to.be.ok
        })
    })

})