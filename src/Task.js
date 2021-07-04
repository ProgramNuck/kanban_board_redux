import {connect} from "react-redux";
import {changePriority, moveCard, restoreFromTrash} from "./redux/actions";
import DeleteCardModal from "./DeleteCardModal";
import EditCardModal from "./EditCardModal";
import MoveToTrashModal from "./MoveToTrashModal";
import {Button} from "reactstrap";

function Task(props) {
    let {task} = props;

    const restoreButton = () => {
        props.restoreFromTrash(task, task.status.replace(/ trash/g, ''));
    };

    return (
        <div>
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                    {task.description}
                    <br/>
                    Priority: {task.priority}{' '}
                    {!props.isTrash &&
                    <span>
                    {task.priority < props.priorities[props.priorities.length - 1] &&
                    <button className="btn btn-outline-secondary"
                            onClick={() => props.changePriority(task, 1)}>↑</button>}
                        {' '}
                        {task.priority > props.priorities[0] &&
                        <button className="btn btn-outline-secondary"
                                onClick={() => props.changePriority(task, -1)}>↓</button>}
                    </span>}
                    <hr/>
                    <b>{task.status.replace(/ trash/g, '')}</b>
                    <hr/>
                    {!props.isTrash && <span>
                    <EditCardModal task={task}/>{' '}
                        <MoveToTrashModal task={task}/>{' '}
                    </span>}
                    {props.isTrash &&
                    <Button
                        onClick={restoreButton} className="btn btn-outline-primary bth" color='light'>Restore</Button>}{' '}
                    <DeleteCardModal task={task}/>
                    {!props.isTrash &&
                       <span>
                    <hr/>
                        {props.statuses.indexOf(task.status) > 0 &&
                        <button className="btn btn-outline-info"
                                onClick={() => props.moveCard(task, props.statuses, -1)}>←</button>}{' '}
                        {props.statuses.indexOf(task.status) < props.statuses.length - 1 &&
                        <button onClick={() => props.moveCard(task, props.statuses, 1)}
                                className="btn btn-outline-info">→</button>}
                    </span>}
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
    ),
    restoreFromTrash: (card, status) => dispatch(
        restoreFromTrash(card, status)
    )
});


export default connect(mapStateToProps, mapDispatchToProps)(Task);