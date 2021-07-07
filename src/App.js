import {getStatuses, getCards} from "./redux/actions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import Column from "./Column";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTaskModal from "./AddTaskModal";
import {Button} from "reactstrap";
import ClearBinModal from "./ClearBinModal";


function App(props) {
    useEffect(() => {
        props.getStatuses();
        props.getCards();
    }, [])
    let [isTrash, setIsTrash] = useState(false);

    if(isTrash) if(props.cards.every(el => !el.status.includes('trash'))) setIsTrash(false);

    return (
        <div className='App'>
            <div className="container">
                <h1 className="display-2">Kanban board</h1>
                <ul className="nav nav-pills">
                    {!isTrash && <li className='nav-item'><AddTaskModal/></li>}
                    {isTrash && <li className='nav-item'><ClearBinModal isTrash={isTrash} setIsTrash={setIsTrash}/></li>}
                    <li className='nav-item'>{<Button disabled={props.cards.every(el => !el.status.includes('trash'))} style={{marginLeft: '10px'}} color="outline-secondary"
                                                      onClick={() => setIsTrash(!isTrash)}>{isTrash ? 'Return to List' : '🗑'}</Button>}</li>

                </ul>
                {!isTrash &&
                <div className="row align-items-start">
                    {props.statuses.map(el => <Column isTrash={isTrash} status={el} key={el}/>)}
                </div>}
                {isTrash && <div>
                    <Column isTrash={isTrash} key='trash' status='trash'/>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses.map(el => el.title),
    cards: state.cards,
});

const mapDispatchToProps = (dispatch) => ({
    getStatuses: () => dispatch(getStatuses()),
    getCards: () => dispatch(getCards()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
