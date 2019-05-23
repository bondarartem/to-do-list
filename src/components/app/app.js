import React from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';

import './app.css';

const App = () => {
    
    const todoData = [
    	{label: 'Выпить кофе', important: false, id: 1},
    	{label: 'Сделать todo список', important: true, id: 2},
    	{label: 'Выпить еще кофе', important: false, id: 3}
    ];

    return (
        <div className='todo-app'>
            <AppHeader toDo={1} done={3} />
            <div className='top-panel d-flex'>
                <SearchPanel />
                <ItemStatusFilter />
            </div>
            <TodoList todos={ todoData }/>
        </div>
    );
}

export default App;