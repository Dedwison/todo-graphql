import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { UpdateTodoInput, CreateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver( () => Todo )
export class TodoResolver {

    constructor( private readonly todoService: TodoService) {

    }

    @Query(() => [Todo], {name: 'todos'})
    findAll(
        @Args() statusArgs : StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs)
    } 

    @Query( () => Todo, { name: 'todo'})
    findOne( @Args('id', {type: () => Int }) id: number) {
        return this.todoService.findOne( id )
    }

    @Mutation( () => Todo, { name: 'createTodo'} )
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ){
        return this.todoService.create(createTodoInput);
    }

    @Mutation( () => Todo, { name: 'updateTodo'} )
    updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
        return this.todoService.update(updateTodoInput);
    }

    @Mutation( () => Boolean )
    removeTodo( @Args('id', {type: () => Int }) id: number) {
        
        return this.todoService.delete(id);
    }

    @Query( () => Int, { name:'totalTodos' })
    totalTodos(){
        return this.todoService.getTotalTodos()
    }

    @Query( () => Int, { name:'completesTodos' })
    completedTodos(){
        return this.todoService.getCompletedTodos()
    }

    @Query( () => Int, { name:'pendingTodos' })
    pendingTodos(){
        return this.todoService.getPendingTodos()
    }

    @Query( () => AggregationsType )
    aggregations(): AggregationsType {
        return {
            total: this.totalTodos(),
            pending: this.pendingTodos(),
            completed: this.completedTodos()
        }
    }

}
