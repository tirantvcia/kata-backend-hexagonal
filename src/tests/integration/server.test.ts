import request from "supertest";
import {Express} from "express";
import { Factory } from "../../Factory";
import { Routes } from "../../infrastructure/Routes";

describe('The Server', ()=>{
    let server: Express;
    beforeEach(()=>{
        server = Factory.createServer();
    });
    
    it('works', async ()=>{
        const response = await request(server).get(Routes.status);

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body).toEqual({status: 'OK'});
    });
    it('register new user fpr a given valid credentials', async ()=>{
        const email = 'test@test.com';
        const response = await request(server).post(Routes.register)
        .send({
            email,
            password: 'Test123_1'
        });

        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toContain('application/json');
        


        expect(response.body).toEqual({id: expect.any(String), email});
    });
    it('reject user registration when exists user with same email', async ()=>{
        const email = 'test1@test.com';
        let response = await request(server).post(Routes.register)
        .send({
            email,
            password: 'Test123_1'
        });

        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toContain('application/json');

        response = await request(server).post(Routes.register)
        .send({
            email,
            password: 'Test123_1'
        });

        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body).toEqual({message:'email has been used'});
    });
    it('reject user registration with invalid email format', async ()=>{
        const email = 'test1@testcom';
        let response = await request(server).post(Routes.register)
        .send({
            email,
            password: 'Test123_1'
        });

        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body).toEqual({message:'email with invalid format'});
    });
    it('reject user registration with invalid password', async ()=>{
        const email = 'test2@test.com';
        let response = await request(server).post(Routes.register)
        .send({
            email,
            password: 'Test123'
        });

        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body).toEqual({message:'password must have almost one underscore'});
    });
});
