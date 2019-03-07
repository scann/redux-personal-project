// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Control } from 'react-redux-form';
import FlipMove from 'react-flip-move';

// Instruments
import Styles from './styles.m.css';
import { tasksActions } from '../../bus/tasks/actions';
import { uiActions } from '../../bus/ui/actions';
import { sortTasksByGroup } from '../../instruments';
import { createSelector } from 'reselect';

// Components
import Task from '../Task';
import Spinner from '../Spinner';
import Checkbox from '../../theme/assets/Checkbox';

const getTasks = (state) => state.tasks;

const sortedTasks = createSelector(getTasks, (tasks) => sortTasksByGroup(tasks));

const mapStateToProps = (state) => {
    return {
        tasks: sortedTasks(state),
        isTasksFetching: state.ui.get('isTasksFetching'),
        tasksFilter: state.ui.get('tasksFilter'),
        editTask: state.ui.get('editTask'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchTasksAsync:        tasksActions.fetchTasksAsync,
            createTaskAsync:        tasksActions.createTaskAsync,
            removeTaskAsync:        tasksActions.removeTaskAsync,
            completeAllTasksAsync:  tasksActions.completeAllTasksAsync,
            updateTaskAsync:        tasksActions.updateTaskAsync,
            updateTasksFilter:      uiActions.updateTasksFilter,
            startEditingTask:       uiActions.startEditingTask,
            resetEditingTask:       uiActions.resetEditingTask,
            updateTaskMessage:      uiActions.updateTaskMessage,
            confirmEditingTask:     uiActions.confirmEditingTask,
        }, dispatch),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Scheduler extends Component {
    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    _getAllCompleted = () => this.props.tasks.every((task) => task.get('completed'));

    _createTask = ({ newTaskMessage }) => {
        if (!newTaskMessage) {
            return null;
        }
        this.props.actions.createTaskAsync(newTaskMessage);
    };

    _updateTasksFilter = (event) => {
        this.props.actions.updateTasksFilter(event.target.value.toLowerCase());
    };

    render () {
        const { actions, tasks, isTasksFetching, tasksFilter, editTask } = this.props;

        const allTasksCompleted = this._getAllCompleted();

        const todoList = tasks
            .filter((task) =>
                task.get('message').toLowerCase().includes(tasksFilter))
            .map((task) => (
            <Task
                completed = { task.get('completed') }
                confirmEditingTask = { actions.confirmEditingTask }
                editTask = { editTask }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                key = { task.get('id') }
                message = { task.get('message') }
                removeTaskAsync = { actions.removeTaskAsync }
                resetEditingTask = { actions.resetEditingTask }
                startEditingTask = { actions.startEditingTask }
                updateTaskAsync = { actions.updateTaskAsync }
                updateTaskMessage = { actions.updateTaskMessage }
                { ...task }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Spinner isSpinning = { isTasksFetching }/>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }/>
                    </header>
                    <section>
                        <Form model = 'form.scheduler' onSubmit = { this._createTask }>
                            <Control.text model = 'form.scheduler.newTaskMessage'
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                            />
                            <button>Добавить задачу</button>
                        </Form>
                        <div className = { Styles.overlay }>
                            <div>
                                <ul>
                                    <FlipMove
                                        enterAnimation = { {
                                            from: {
                                                transform: 'rotateX(180deg)',
                                                opacity:   0.1,
                                            },
                                            to: {
                                                transform: '',
                                            },
                                        } }
                                        leaveAnimation = { {
                                            from: {
                                                transform: '',
                                            },
                                            to: {
                                                transform: 'rotateX(-120deg)',
                                                opacity:   0.1,
                                            },
                                        } }
                                        staggerDelayBy = { 100 }>
                                        { todoList }
                                    </FlipMove>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked = { allTasksCompleted }
                                  color1 = '#363636'
                                  color2 = '#fff'
                                  onClick = { !allTasksCompleted && actions.completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
