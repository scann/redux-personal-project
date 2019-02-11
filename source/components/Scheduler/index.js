// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Control } from 'react-redux-form';

// Instruments
import Styles from './styles.m.css';
import { tasksActions } from '../../bus/tasks/actions';

// Components
import Task from '../Task';
import Spinner from '../Spinner';
import Checkbox from '../../theme/assets/Checkbox';

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            fetchTasksAsync: tasksActions.fetchTasksAsync,
            createTaskAsync: tasksActions.createTaskAsync,
            removeTaskAsync: tasksActions.removeTaskAsync,
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

    _createTask = ({ newTaskMessage }) => {
        if (!newTaskMessage) {
            return null;
        }
        this.props.actions.createTaskAsync(newTaskMessage);
    };

    render () {
        const { actions, tasks } = this.props;

        const todoList = tasks.map((task) => (
            <Task
                actions = { actions }
                completed = { task.get('completed') }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                key = { task.get('id') }
                message = { task.get('message') }
                { ...task }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
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
                            <ul>{todoList}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked color1 = '#363636' color2 = '#fff' />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
