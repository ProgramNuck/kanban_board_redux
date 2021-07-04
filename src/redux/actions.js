import axios from 'axios';

export function getCards(){
    return (dispatch) =>
        axios
            .get('https://nazarov-kanban-server.herokuapp.com/card')
            .then(res => dispatch({
                type: 'GET_CARDS',
                payload: res.data}))
            .catch(e => console.log(e))
}

export function getStatuses(){
    return (dispatch) =>
        axios
        .get('https://nazarov-kanban-server.herokuapp.com/column')
            .then(res => dispatch({
                type: 'GET_STATUSES',
                payload: res.data}))
            .catch(e => console.log(e))
}

export function createCard(newCard) {
    return (dispatch) =>
        axios
            .post('https://nazarov-kanban-server.herokuapp.com/card', newCard)
            .then(() => dispatch(
                getCards()
            ))
            .catch(e => console.log(e))
}

export function moveCard(card, statuses,  dir){
    let status = statuses[statuses.indexOf(card.status) + dir]
    return (dispatch) =>
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {...card, status})
            .then(() => dispatch(
                getCards()
            ))
            .catch(e => console.log(e))
}

export function changePriority(card, dir){
    let priority = card.priority + dir;
    return (dispatch) =>
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {...card, priority})
            .then(() => dispatch(
                getCards()
            ))
            .catch(e => console.log(e))
}

export function deleteCard(cardId){
    return (dispatch) =>
        axios
            .delete(`https://nazarov-kanban-server.herokuapp.com/card/${cardId}`)
            .then(() => dispatch(
                getCards()
            ))
            .catch(e => console.log(e))
}

export function editCard(taskId, updatedCard) {
    return (dispatch) =>
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${taskId}`, updatedCard)
            .then(() => dispatch(
                getCards()
            ))
            .catch(e => console.log(e))
}

export function clearTrashBin(cards){
    return (dispatch) =>
       cards = cards.map(el => el.status.includes('trash') ?
        axios
            .delete(`https://nazarov-kanban-server.herokuapp.com/card/${el._id}`)
            .then(() => dispatch(
                getCards()
            ))
            .catch(e => console.log(e)) : el)
}

export function moveToTrash(card) {
    return (dispatch) =>
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {...card, status: card.status+' trash'})
            .then(() => dispatch(
                getCards()
            ))
            .catch(e => console.log(e))
}

export function restoreFromTrash(card, status) {
    return (dispatch) =>
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {...card, status})
            .then(() => dispatch(
                getCards()
            ))
            .catch(e => console.log(e))
}
