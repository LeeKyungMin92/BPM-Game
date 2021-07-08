import { thisExpression } from '@babel/types';
import React, { Component } from 'react';
import './TodoList.css'
import { NavLink } from 'react-router-dom';
import Todo from '../Todo/todo';
import TodoDetail from '../TodoDetail/TodoDetail';

class TodoList extends Component {
    state={
        todos: [
            { id: 1, title: 'SWPP', content: 'take swpp class', done: true},
            { id: 2, title: 'Movie', content: 'watch movie', done: false},
            { id: 3, title: 'Dinner', content: 'eat dinner', done: false},
        ],
        selectedTodo: null,
    }
    clickTodoHandler=td=>{
        if(this.state.selectedTodo===td){
            this.setState({...this.state, selectedTodo: null});
        } else {
            this.setState({...this.state, selectedTodo: td});
        }
    }
    render(){
        let todo=null;
        if(this.state.selectedTodo){
            todo=<TodoDetail title={this.state.selectedTodo.title} content={this.state.selectedTodo.content}/>
        }
        const todos=this.state.todos.map((td)=>{
            return(<Todo key={td.id} title={td.title} done={td.done} clicked={()=>this.clickTodoHandler(td)}/>);
        });
        return (
            <div className='TodoList'>
                <div className='title'>{this.props.title}</div>
                <div className='todos'>{todos}</div>
                {todo}
                <NavLink to='/new-todo' exact>New Todo</NavLink>
            </div>
        );
    }
}
export default TodoList;