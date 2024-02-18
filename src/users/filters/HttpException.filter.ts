import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) { // the "host" allows me to get multiple options from it such as the request and the response objects
        console.log(exception);
        console.log(exception.getResponse());
        console.log(exception.getStatus());

        const context = host.switchToHttp();
        const res = context.getResponse();
        const req = context.getRequest();

        res.send({
            status : exception.getStatus(),
            message : exception.getResponse()
        })


        // const res = host.switchToHttp().getResponse();
        // res.status(400).send("hello");
    }
};