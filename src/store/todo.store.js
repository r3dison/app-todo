import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
}
const state = {
    todos: [
        new Todo('Aprender JavaScript'),
        new Todo('Aprender Vue.js'),
        new Todo('Aprender Node.js'),
        new Todo('Aprender React.js'),
        new Todo('Aprender Angular.js'),
    ],
    filter: Filters.All,
}

const initStore = () => {

    console.log(state);
    console.log('Init Store 📙');
}

const loadStore = () => {
    throw new Error('Function not implemented.');
}

const getTodos = ( filter = Filters.All ) => {
    switch( filter ) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error(`Option ${ filter } is not valid`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    if ( !description ) throw new Error('Description is required');

    state.todos.push( new Todo( description ) );
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );
}

const deleteCompleted = () => {
        state.todos = state.todos.filter( todo => todo.done );
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
    if ( !Object.keys( Filters ).includes( newFilter ) ) {
        throw new Error(`Option ${ newFilter } is not valid`);
    }
    state.filter = newFilter;
}

const getCurentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}