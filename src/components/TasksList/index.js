import './index.css'

const TasksList = props => {
  const {TaskDetails} = props
  const {taskInput, selectedTag} = TaskDetails

  return (
    <li className="list-container">
      <p className="task">{taskInput}</p>
      <p className="tag">{selectedTag}</p>
    </li>
  )
}

export default TasksList
