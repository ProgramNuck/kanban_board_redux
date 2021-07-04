import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useState} from 'react';
import {clearTrashBin, deleteCard} from "./redux/actions";
import {connect} from "react-redux";

const ClearBinModal = (props) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    let [confirmValue, setConfirmValue] = useState('');

    const clearBinButtonHandler = () => {
        props.clearTrashBin(props.cards);
        props.setIsTrash(!props.isTrash);
    };


    return (
        <span>
    <Button disabled={props.cards.every(el => !el.status.includes('trash'))} color="danger" onClick={toggle}>Clear Bin</Button>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Are you sure you want to clean the bin?</ModalHeader>
        <ModalBody>
            This action <b>cannot</b> be undone. This will <b>permanently</b> delete all task in the bin.
            <br/>
            <br/>
            Please type <b>Clear bin</b> to confirm
  <input type="text" className="form-control" placeholder="Enter here"
         aria-label="Recipient's username with two button addons" onChange={event => setConfirmValue(event.target.value)}/>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-outline-danger" type="button"
                    disabled={confirmValue !== 'Clear bin'}
                    onClick={clearBinButtonHandler}>Confirm
            </button>
            {' '}
            <button className="btn btn-outline-secondary" type="button" onClick={toggle}>Cancel</button>
        </ModalFooter>
    </Modal>
    </span>
    );
};

const mapStateToProps = (state) => ({
    cards: state.cards,
});


const mapDispatchToProps = (dispatch) => ({
    deleteCard: (cardId) => dispatch(
        deleteCard(cardId)
    ),
    clearTrashBin: (cards) => dispatch(
        clearTrashBin(cards)
    )
});


export default connect(mapStateToProps, mapDispatchToProps)(ClearBinModal);
