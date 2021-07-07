import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from "react-redux";
import {createCard} from "./redux/actions";

    const AddTaskModal = (props) => {

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setName('');
        setDescription('');
        setPriority(1);
        setStatus('todo');
        setModal(!modal);
    }

    let [name, setName] = useState('');

    let [description, setDescription] = useState('');

    let [priority, setPriority] = useState(1);

    let [status, setStatus] = useState('todo');
    
    const addButtonHandler = () => {
        let newCard = {name, description, priority, status};
        setName('');
        setDescription('');
        setPriority(1);
        setStatus('todo');
        props.createCard(newCard);
        toggle();
    };    
    


    return (
        <div>
            <Button color="danger" onClick={toggle}>Add task</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Add task to list</ModalHeader>
                <ModalBody>
                                <span className="input-group">
                    <div className="input-group mb-3">
                          <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                    <input placeholder='Enter name of task here' value={name} type="text" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default" onChange={event => setName(event.target.value)}/> </div>
                    <div className="input-group mb-3">
                          <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
                    <input  placeholder='Enter description of task here' value={description} type="text" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default" onChange={event => setDescription(event.target.value)}/></div>
                    <select defaultValue={'DEFAULT'} onChange={event => setPriority(+event.target.value)} className="form-select" aria-label="Default select example">
                        <option value='DEFAULT'>Choose priority of task</option>
                        {props.priorities.map(el => <option value={el} key={el}>{el}</option>)}
                    </select>
                    <select defaultValue={'DEFAULT'} onChange={event => setStatus(event.target.value)} className="form-select" aria-label="Default select example">
                        <option value={'DEFAULT'}>Choose status of task</option>
                        {props.statuses.map(el => <option value={el.title} key={el.title}>{el.title}</option>)}
                    </select>
                                    </span>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={name === ''} color="primary" onClick={addButtonHandler}>Add</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
    priorities: state.priorities
});
    
const mapDispatchToProps = (dispatch) => ({
    createCard: (newCard) => dispatch(createCard(newCard))
});
    

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
