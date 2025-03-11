import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
          "id": 1,
          "name": "Alice Johnson",
          "email": "alice@example.com",
          "password": "password123",
          "role": "user"
        },
        {
          "id": 2,
          "name": "Bob Williams",
          "email": "bob@example.com",
          "password": "mypassword",
          "role": "admin"
        },
        {
          "id": 3,
          "name": "Charlie Brown",
          "email": "charlie@example.com",
          "password": "testpass",
          "role": "moderator"
        }
      ];

    /**
     * Retrieve all users, optionally filtered by role or name.
     *
     * @param role If specified, only return users with the given role.
     * @param name If specified, only return users with the given name.
     *
     * @returns An array of users.
     */
    findAll(role?: 'user' | 'admin' | 'moderator', name?: string) {
        if(role){
            return this.users.filter(user => user.role === role);
        }
        if(name){
            return this.users.filter(user => user.name === name);
        }
        return this.users;
    }

    /**
     * Retrieve a single user by ID.
     *
     * @param id The ID of the user to retrieve.
     *
     * @returns The user with the given ID, or undefined if no such user exists.
     */

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    /**
     * Create a new user.
     *
     * @param user The user to create. The user object must contain the fields 'name', 'email', 'password', and 'role'.
     *
     * @returns The created user.
     */
    create(user: {name : string , email: string , password: string, role: 'user' | 'admin' | 'moderator'}) {
        const newUser = {
            id: this.users.length + 1,
            ...user
        }
        this.users.push(newUser);
        return this.users;
    }

    /**
     * Update a user.
     *
     * @param id The ID of the user to update.
     * @param user The user to update. The user object must contain the fields 'name', 'email', 'password', and 'role'.
     *
     * @returns The updated user.
     */
    update(id: number, user: {name : string , email: string , password: string, role: 'user' | 'admin' | 'moderator'}) {
        this.users = this.users.map(u => {
            if(u.id === id){
                return {
                    ...u,
                    ...user
                }
            }
            return u;
        })

        return this.findOne(id);
    }

/**
 * Delete a user by ID.
 *
 * @param id The ID of the user to delete.
 *
 * @returns The updated users list after deletion, or null if no user with the given ID exists.
 */

    delete(id: number) {
        const index = this.users.findIndex(user => user.id === id);
        if(index !== -1){
            this.users.splice(index, 1);
            return this.users;
        }
        return null;
    }
      
}
