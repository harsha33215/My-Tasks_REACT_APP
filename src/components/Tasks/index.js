import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import TasksList from '../TasksList'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

class Tasks extends Component {
  state = {
    taskInput: '',
    selectedTag: tagsList[0].optionId,
    tasksList: [],
    activeTag: '',
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({selectedTag: event.target.value})
  }

  setActiveTag = tagId => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === tagId ? '' : tagId,
    }))
  }

  submitForm = event => {
    event.preventDefault()
    const {taskInput, selectedTag} = this.state
    const newTask = {id: uuidv4(), taskInput, selectedTag}
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      taskInput: '',
      selectedTag: tagsList[0].optionId,
    }))
  }

  render() {
    const {tasksList, taskInput, selectedTag, activeTag} = this.state
    const filteredTasksList =
      activeTag === ''
        ? tasksList
        : tasksList.filter(task => task.selectedTag === activeTag)

    return (
      <div className="app-container">
        <div className="task-container">
          <form onSubmit={this.submitForm} className="form-container">
            <h1 className="heading">Create a task!</h1>

            <label htmlFor="task" className="label-items">
              Task
            </label>
            <input
              id="task"
              className="input-text"
              type="text"
              value={taskInput}
              placeholder="Enter the task here"
              onChange={this.onChangeTask}
            />

            <label htmlFor="tags" className="label-items">
              Tags
            </label>
            <select
              id="tags"
              className="input-text"
              value={selectedTag}
              onChange={this.onChangeTag}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>

            <button type="submit" className="add-task-button">
              Add Task
            </button>
          </form>
        </div>

        <h1 className="heading">Tags</h1>
        <ul className="list-items-container">
          {tagsList.map(eachItem => (
            <li key={eachItem.optionId}>
              <button
                type="button"
                className={`button ${
                  activeTag === eachItem.optionId ? 'active' : ''
                }`}
                onClick={() => this.setActiveTag(eachItem.optionId)}
              >
                {eachItem.displayText}
              </button>
            </li>
          ))}
        </ul>

        <h1 className="heading">Tasks</h1>
        {tasksList.length === 0 ? (
          <p>No Tasks Added Yet</p>
        ) : (
          <ul>
            {filteredTasksList.map(eachTask => (
              <TasksList key={eachTask.id} TaskDetails={eachTask} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Tasks
