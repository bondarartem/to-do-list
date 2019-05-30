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
            this.createTodoItem("Выпить кофе"),
            this.createTodoItem("Сделать todo список"),
            this.createTodoItem("Выпить еще кофе"),
        ],
        term : '',
        status: 'All'
    };

    createTodoItem(label) {
        return {
            label, 
            important: false, 
            done: false,
            id: this.maxId++
        };
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newData = [ 
                ...todoData.slice(0, idx), 
                ...todoData.slice(idx + 1)
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
                done: false,
                id: this.maxId++
            };

        this.setState(({ todoData }) => {
            const newData = [
                ...todoData, 
                newItem
            ];

            return {
                todoData: newData
            }
        });
    }

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem,  [propName]: !oldItem[propName]};
        
        return [ 
            ...arr.slice(0, idx), 
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    }

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    } 

    onSearchChange = (term) => {
        this.setState({ term });
    }

    statusChange = (items, status) => {
        switch (status){
            case 'Active':  
                    return items.filter((item) => {
                        return !item.done;
                    });

            case 'Done':
                    return items.filter((item) => {
                        return item.done    ;
                    });

            default: return items;
        }
    }

    onStatusChange = (status) => {
        this.setState({ status });
    }

    render() {
        const { todoData, term, status } = this.state;

        const visibleItems = this.statusChange(this.search(todoData, term), status);

        const doneCount = todoData
                            .filter((el)=>el.done).length;
        const todoCount = todoData.length-doneCount;

        return (
            <div className='todo-app'>
                <AppHeader toDo={ todoCount } done={ doneCount } />
                <div className='top-panel d-flex'>
                    <SearchPanel 
                        onSearchChange={ this.onSearchChange }
                    />
                    <ItemStatusFilter 
                        onStatusChange={ this.onStatusChange }
                        status= { status }
                    />
                </div>
                <TodoList 
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone= { this.onToggleDone }
                    />
                <AddItem 
                    addItem={ this.addItem }/>
            </div>
        );
    }

}
