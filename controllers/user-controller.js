/**
 * @author Semmy
 *
 * @flow
 */
import { Render, Ctx, Controller, JsonController, Param, QueryParam, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { Container, Inject, Service } from 'typedi';

const t = 'ttt';

@Controller()
export default class UserController {
    constructor(userServices: UserService) {
        this.userServices = userServices;
    }

    @Render('test.html')
    @Get('/users')
    getAll() {
        console.log('getAll', this.userServices);
        return 'This action returns all users';
    }

    @Get('/users/:id')
    @Param('id')
    getOne(id: number) {
        console.log('getOne', id);
        return 'addddasdf';
        // return { id: id, title: '这是title' };
    }

    @Post('/users')
    post(@Body() user: any) {
        console.log(user);
        return 'Saving user...';
    }

    @Put('/users/:id')
    put(@Param('id') id: number, @Body() user: any) {
        return 'Updating a user...#' + id;
    }

    @Delete('/users/:id')
    remove(@Param('id') id: number) {
        return 'Removing user...#' + id;
    }
}
