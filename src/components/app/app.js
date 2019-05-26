import React, { Component } from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import AddItem from '../add-item/';

import './app.css';

export default class App extends Component {
    
    maxId = 100;

    state = {
        todoData : [
            {label: 'Выпить кофе', important: false, id: 1},
            {label: 'Сделать todo список', important: true, id: 2},
            {label: 'Выпить еще кофе', important: false, id: 3}
        ]
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newData = [ 
                ... todoData.slice(0, idx), 
                ... todoData.slice(idx + 1)
            ];

            return {
                todoData: newData
            };
        })
    };

    addItem = (text) => {
        
        const newItem = {
                label: text, 
                important: false, 
                id: this.maxId++
            };

        this.setState(({ todoData }) => {
            const newData = [
                ... todoData, 
                newItem
            ];

            return {
                todoData: newData
            }
        });
    }

    render() {
        return (
            <div className='todo-app'>
                <AppHeader toDo={1} done={3} />
                <div className='top-panel d-flex'>
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>
                <TodoList 
                    todos={ this.state.todoData }
                    onDeleted={ this.deleteItem }/>
                <AddItem 
                    addItem={ this.addItem }/>
            </div>
        );
    }

}
