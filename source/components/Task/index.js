// Core
import React, { PureComponent, createRef } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

export default class Task extends PureComponent {
    _getTaskShape = ({
        id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    taskInput = createRef();

    componentDidUpdate () {
        this.taskInput.current.focus();
    }
    _removeTask = () => {
        const { removeTaskAsync, id } = this.props;

        removeTaskAsync(id);
    };

    _toggleTaskEditingState = () => {
        const { startEditingTask, resetEditingTask, editTask, id, message } = this.props;

        if (editTask.get('id') === id) {
            resetEditingTask();
        } else {
            startEditingTask(id, message);
        }
    };

    _editNewTaskMessage = (event) => {
        const { updateTaskMessage } = this.props;
        const newMessage = event.target.value;

        if (newMessage.length < 50) {
            updateTaskMessage(newMessage);
        }
    };

    _updateTaskMessageOnKeyDown = (event) => {
        const { id, updateTaskAsync, resetEditingTask, confirmEditingTask, editTask } = this.props;

        const newMessage = editTask.get('newMessage');

        if (!newMessage) {
            return null;
        }

        if (event.key === 'Enter') {
            updateTaskAsync(this._getTaskShape({ id, message: newMessage }));
            confirmEditingTask(id, newMessage);
            resetEditingTask();
        } else if (event.key === 'Escape') {
            resetEditingTask();
        }
    };

    _toggleTaskCompletedState = () => {
        const { updateTaskAsync, id, completed } = this.props;

        updateTaskAsync(this._getTaskShape({ id, completed: !completed }));
    };

    _toggleTaskFavoriteState = () => {
        const { updateTaskAsync, id, favorite } = this.props;

        updateTaskAsync(this._getTaskShape({ id, favorite: !favorite }));
    };

    render () {
        const { message, completed, favorite, id, editTask } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        let currentMessage = message;

        const isTaskEditing = editTask.get('id') === id;

        if (isTaskEditing) {
            currentMessage = editTask.get('newMessage');
        }

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        inlineBlock
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { !isTaskEditing }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { currentMessage }
                        onChange = { this._editNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        inlineBlock
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleTaskEditingState }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
