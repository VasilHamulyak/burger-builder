import React from 'react';

import BuildControl from './BuilsControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price:></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    />
            ))}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
};

export default buildControls;