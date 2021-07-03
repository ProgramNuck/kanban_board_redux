import {connect} from "react-redux";
import {changePriority, moveCard} from "./redux/actions";
import DeleteCardModal from "./DeleteCardModal";
import EditCardModal from "./EditCardModal";
import MoveToTrashModal from "./MoveToTrashModal";

function Task(props) {
    let {task} = props;
    return(
        <div>
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                    {task.description}
                    <br/>
                    Priority: {task.priority}{' '}
                    {task.priority < props.priorities[props.priorities.length - 1] &&
                    <button className="btn btn-outline-secondary" onClick={() => props.changePriority(task, 1)}>↑</button>}
                    {' '}
                    {task.priority > props.priorities[0] &&
                    <button className="btn btn-outline-secondary" onClick={() => props.changePriority(task, -1)}>↓</button>}
                    <hr/>
                    <b>{task.status}</b>
                    <hr/>
                    <EditCardModal task={task}/>{' '}
                    <MoveToTrashModal task={task}/>{' '}
                    <DeleteCardModal task={task}/>
                    <hr/>
                    {props.statuses.indexOf(task.status) > 0 &&
                    <button className="btn btn-outline-info" onClick={() => props.moveCard(task, props.statuses, -1)}>←</button>}{' '}
                    {props.statuses.indexOf(task.status) < props.statuses.length - 1 &&
                    <button onClick={() => props.moveCard(task, props.statuses, 1)} className="btn btn-outline-info">→</button>}
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses.map(el => el.title),
    priorities: state.priorities
});

const mapDispatchToProps = (dispatch) => ({
    moveCard: (card, statuses, dir) => dispatch(
        moveCard(card, statuses, dir)
),
    changePriority: (card, dir) => dispatch(
        changePriority(card, dir)
    )
});


export default connect(mapStateToProps, mapDispatchToProps)(Task);