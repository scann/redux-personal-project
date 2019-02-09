// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    render () {
        const { actions, tasks } = this.props;

        const todoList = tasks.map((task) => (
            <Task
                completed = { task.completed }
                favorite = { task.favorite }
                id = { task.id }
                key = { task.id }
                message = { task.message }
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
                        <form>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                            />
                            <button>Добавить задачу</button>
                        </form>
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
