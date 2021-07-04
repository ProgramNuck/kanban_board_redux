import {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import {moveToTrash} from "./redux/actions";

const MoveToTrashModal = (props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    let {task} = props;


    const trashCardButtonHandler = () => {
        props.moveToTrash(task);
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
                    <Button color="danger" onClick={trashCardButtonHandler}>Move</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </span>
    );

};




const mapDispatchToProps = (dispatch) => ({
    moveToTrash: (card) => dispatch(moveToTrash(card))
});


export default connect(null, mapDispatchToProps)(MoveToTrashModal);