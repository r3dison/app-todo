import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos} from './use-cases';

const elementIds = {
    TodoList : '.todo-list',
    NewTodoInput: '#new-todo-input'
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurentFilter() );
        renderTodos( elementIds.TodoList, todos );
    }
    // Crear el elemento HTML, cuando la función es invocada
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();


    // Referencias HTML
    const newDescriptionInput = document.querySelector( elementIds.NewTodoInput );
    const todoListUl = document.querySelector( elementIds.TodoList );

    newDescriptionInput.addEventListener('keyup', ( event) => {
        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();

        event.target.value = '';
    });

    todoListUl.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoListUl.addEventListener('click', ( event ) => {
        const isDestroyBtn = event.target.className === 'destroy';
        if( !isDestroyBtn ) return;

        const element = event.target.closest('[data-id]');
        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });
}