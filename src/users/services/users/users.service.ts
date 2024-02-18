import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { createUserType } from 'src/utils/types';
import { isUndefined } from 'util';

@Injectable()
export class UsersService {
    private allUsers = [
        { name: 'anson', age: 21, email: 'anson@anson.com', isActive: true },
        { name: 'joe', age: 21, email: 'joe@joe.com', isActive: true },
        { name: 'cory', age: 22, email: 'cory@cory.com', isActive: false },
        { name: 'greg', age: 23, email: 'greg@greg.com', isActive: true }
    ];

    fetchUsers(){
        return this.allUsers;
    }

    createUser(newUser : CreateUserDto){ // on peut faire "newUser : CreateUserType" en utilisant le type "CreateUserType" qui est similaire au type "CreateUserDto" mais le best practice est de ne pas utiliser le type dto dans le service (dto est utiliser seulement dans les controllers) c'est pour cela on a creer le type "CreateUserType" qui se trouve dans le dossier "utils" dans le file "types.ts"
        this.allUsers.push(newUser);
        const message = `hello ${newUser.name}, your age is ${newUser.age} and your email is (${newUser.email})`
        return {message, allUsers:this.allUsers};
    }

    findByAge(age: number){
    //    const userFound = this.allUsers.find((user) => {return user.age === age});
       const userFound = this.allUsers.filter((user) => {return user.age === age});
       return userFound
    //    return (isUndefined(userFound) || userFound.length === 0) ? `user with age ${age} not found` : userFound;
    }
}
