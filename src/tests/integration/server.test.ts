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
});
