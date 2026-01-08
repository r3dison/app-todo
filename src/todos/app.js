import html from './app.html?raw';
/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId) => {
    // Crear el elemento HTML, cuando la función es invocada
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
    })();
}