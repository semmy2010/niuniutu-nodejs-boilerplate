/**
 * @author Semmy
 *
 * @flow
 */
import { Ctx, Controller, JsonController, Param, QueryParam, Body, Get, Post, Put, Delete } from 'routing-controllers';

@Controller()
export default class UserController {
    @Get('/users')
    getAll() {
        return 'This action returns all users';
    }

    @Get('/users/:id')
    getOne(@Param('id') id: number) {
        console.log(id);
        return 'This action returns user #' + id;
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
