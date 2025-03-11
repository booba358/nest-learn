import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    /**
     * Retrieve all users, optionally filtered by role or name.
     *
     * @param role If specified, only return users with the given role.
     * @param name If specified, only return users with the given name.
     *
     * @returns An array of users.
     */
    findAll(@Query('role') role?: 'user' | 'admin' | 'moderator', @Query('name') name?: string) {
        return this.usersService.findAll(role, name);
    }

    @Get(':id')
    /**
     * Retrieve a single user by ID.
     *
     * @param id The ID of the user to retrieve.
     *
     * @returns The user with the given ID, or null if no such user exists.
     */
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    /**
     * Create a new user.
     *
     * @param user The user to create. The user object must contain the fields 'name', 'email', 'password', and 'role'.
     *
     * @returns The created user.
     */
    create(@Body() user: {name : string , email: string , password: string, role: 'user' | 'admin' | 'moderator'}) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    /**
     * Update a user.
     *
     * @param id The ID of the user to update.
     * @param user The user to update. The user object must contain the fields 'name', 'email', 'password', and 'role'.
     *
     * @returns The updated user.
     */
    update(@Param('id') id: number, @Body() user: {name : string , email: string , password: string, role: 'user' | 'admin' | 'moderator'}) {
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    /**
     * Delete a user.
     *
     * @param id The ID of the user to delete.
     *
     * @returns The users list after deletion.
     */
    delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
}
