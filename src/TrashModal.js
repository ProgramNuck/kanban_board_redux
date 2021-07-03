import {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import {clearTrashBin, deleteCard, getCards} from "./redux/actions";

const TrashModal = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const restoreButtonHandler = (id, name, description, priority, status) => {
        props.restoreContact(id, name, description, priority, status);
        props.getCards();
    };

    const deletePermanentlyButtonHandler = (id) => {
        props.deletePermanently(id);
        props.deleteCard(id);
    };

    const clearBinButtonHandler = () => {
        props.clearTrashBin(props.trash);
        props.clearBin();
        toggle();
    };



    return (
        <div>
            {props.trash.length > 0 && <Button style={{'float': 'right', 'marginRight': '790px'}} color="outline-secondary"
                    onClick={toggle}>🗑</Button>}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Tasks in bin</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="col">
                            {props.trash.map(el => <div className="card text-center"
                                                        style={{width: '400px', marginLeft: '20px'}}>
                                <div className="card-body">
                                    <h5 className="card-title">{el.name}</h5>
                                    {el.description} <br/>
                                    Priority: {el.priority}
                                    <hr/>
                                    <b>{el.status}</b>
                                    <hr/>
                                    <Button
                                        onClick={() => restoreButtonHandler(el._id, el.name, el.description, el.priority, el.status)}
                                        className="btn btn-outline-primary bth" color='light'>Restore</Button>{' '}
                                    <Button onClick={() => deletePermanentlyButtonHandler(el._id)}
                                            className="btn btn-outline-danger btn" color='light'>Delete</Button>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={!props.trash.length} onClick={clearBinButtonHandler} style={{'marginRight': '299px'}} color='outline-danger'>Clear
                        bin</Button>
                    <Button color="outline-secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

};

const mapStateToProps = (state) => ({
    trash: state.trash,
});

const mapDispatchToProps = (dispatch) => ({
    getCards: getCards(),
    restoreContact: (id, name, description, priority, status) => {
        dispatch({
            type: 'RESTORE_CARD',
            payload: {id, name, description, priority, status}
        })
    },
    deletePermanently: (id) => {
        dispatch({
            type: 'DELETE_CARD_PERMANENTLY',
            payload: id
        })
    },
    deleteCard: (cardId) => dispatch(
        deleteCard(cardId)
    ),
    clearBin: () => {
        dispatch({
            type: 'CLEAR_BIN'
        })
    },
    clearTrashBin: (trashTasks) => dispatch(
        clearTrashBin(trashTasks)
    )

});


export default connect(mapStateToProps, mapDispatchToProps)(TrashModal);