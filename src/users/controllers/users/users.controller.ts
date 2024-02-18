import { Body, Controller, Get, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
// @UseGuards(AuthGuard) // si je veut que le guard s'applique sur tous les routes de ce controller
export class UsersController {

  constructor(private readonly userService : UsersService){}
  
  @Get()
  @UseGuards(AuthGuard) // si je veut que le guard s'applique sur une route specifique
  getUser() {
    return this.userService.fetchUsers();
  }

  @Get("/posts")
  getUsersPosts() {
    return [{name: "anson", email: "anson@anson.com", posts:[
      {
        id: 1,
        title: "Post 1"
      },
      {id: 2,
      title: "Post 2"}
    ]}];
  }

  @Get("/queryparams")
  getSortedUsers(@Query() query:any, @Query("name") name:string, @Query("isActive",ParseBoolPipe) isActive:boolean){ //ParseBoolPipe : used to convert the "isActive" query param from a string (default type) to a boolean
    const message = `name: ${name}, isActive: ${isActive}`;
    return {query,message};
  }  

  // @Get(":id")
  // getUserById(@Req() req: Request, @Res() res: Response) { // the express way
  //   res.send(req.params.id);
  // }

  @Get(":id")
  getUserById(@Param("id", ParseIntPipe) id:number) { // ParseIntPipe : used to validate the route params , in this case we used it to convert the id provided in the route to an integer becouse by default the route params are converted to strings
    return id;
  }

  // @Post()
  // createUser(@Req() req:Request, @Res() res:Response){ // handling the post request with the express way
  //   const message = `hello ${req.body.name}, your age is ${req.body.age}`;
  //   res.send(message);
  // }

  @Get("findByAge/:age")
  @UseFilters(HttpExceptionFilter)
  getUserByAge(@Param("age", ParseIntPipe) age:number) {
    const user = this.userService.findByAge(age);
    if (user.length !== 0){
      return user
    }else{
      throw new UserNotFoundException("l'user avec l'age specifier n'existe pas", HttpStatus.NOT_FOUND)
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  postUser(@Body(ValidateCreateUserPipe) newUser:CreateUserDto){
    return newUser;
  }

  @Post("/create")
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) newUser:CreateUserDto){
    return this.userService.createUser(newUser);
  }

}
