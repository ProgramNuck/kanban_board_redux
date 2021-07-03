import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from 'react';
import {deleteCard} from "./redux/actions";
import {connect} from "react-redux";

const DeleteCardModal = (props) => {

    let {task} = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    let [confirmValue, setConfirmValue] = useState('');

    const deleteCardButtonHandler = () => {
        props.deleteCard(task._id);
        toggle();
    };    
    
    
    return (
        <span>
    <Button onClick={toggle} outline color="danger">Delete</Button>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Are you sure you want to delete the <b>{task.name}</b> task?</ModalHeader>
        <ModalBody>
            This action <b>cannot</b> be undone. This will <b>permanently</b> delete the {task.name} task.
            <br/>
            <br/>
            Please type <b>{task.name}</b> to confirm
  <input type="text" className="form-control" placeholder="Enter here"
         aria-label="Recipient's username with two button addons" onChange={event => setConfirmValue(event.target.value)}/>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-outline-danger" type="button"
                    disabled={confirmValue !== task.name}
                    onClick={deleteCardButtonHandler}>Confirm
            </button>
            {' '}
            <button className="btn btn-outline-secondary" type="button" onClick={toggle}>Cancel</button>
        </ModalFooter>
    </Modal>
    </span>
    );
};

const mapDispatchToProps = (dispatch) => ({
    deleteCard: (cardId) => dispatch(
        deleteCard(cardId)
    )
});


export default connect(null, mapDispatchToProps)(DeleteCardModal);
