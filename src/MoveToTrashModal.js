import {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import {getCards} from "./redux/actions";

const MoveToTrashModal = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    let {task} = props;


    const trashContactButtonHandler = () => {
        props.trashContact(task._id, task.name, task.description, task.priority, task.status);
        toggle();
    };


    return (
        <span>
            <Button  color="outline-secondary" onClick={toggle}>🗑</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Moving <b>{task.name}</b> contact to bin</ModalHeader>
                <ModalBody>
                    Are you sure you want to move <b>{task.name}</b> contact to bin?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={trashContactButtonHandler}>Move</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </span>
    );

};




const mapDispatchToProps = (dispatch) => ({
    trashContact: (id, name, description, priority, status) => {
        dispatch({
            type: 'TRASH_CARD',
            payload: {id, name, description, priority, status}
        })
    },
    getCards: getCards()
});


export default connect(null, mapDispatchToProps)(MoveToTrashModal);