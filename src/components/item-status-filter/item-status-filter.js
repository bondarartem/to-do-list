import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

        buttons = [
                {name: 'All'},
                {name: 'Active'},
                {name: 'Done'}
        ];

        render() { 

                const { status, onStatusChange } = this.props;

                const buttons = this.buttons.map(({ name }) => {
                        const isActive = status === name;

                        const className = isActive ? "btn btn-info" : "btn btn-outline-secondary";

                        return (<button type="button"
                                        className={ className }
                                        key={ name }
                                        onClick={ () => onStatusChange(name) }>{ name }</button>
                        );
                });
                
                return (
                        <div className="btn-group item-status-filter">
                                { buttons }
                        </div>
                        ); 
        }
}
