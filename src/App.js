import {getStatuses, getCards} from "./redux/actions";
import {connect} from "react-redux";
import {useEffect} from "react";
import Column from "./Column";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTaskModal from "./AddTaskModal";
import TrashModal from "./TrashModal";


function App(props) {
    useEffect(() => {
        props.getStatuses();
        props.getCards();
    }, [])
    return (
        <div className='App'>
            <div className="container">
                    <h1 className="display-2">Kanban board</h1>
                    <TrashModal />
                    <AddTaskModal/>
                <div className="row align-items-start">
                    {props.statuses.map(el => <Column status={el} key={el}/>)}
                </div>
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
