let initialState = {
    cards: [],
    statuses: [],
    priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    trash: []
}

const kanban = (state = initialState, action) => {
    switch(action.type){
        case 'GET_STATUSES':
            return {...state, statuses: action.payload}
        case 'GET_CARDS':
            return {...state, cards: action.payload}
        case 'TRASH_CARD':
            let newCards = [...state.cards];
            let newTrash = [...state.trash];
            let ind = newCards.indexOf(newCards.find(el => el._id === action.payload.id));
            newTrash.push(...(newCards.splice(ind, 1)));
            return {...state, cards: newCards, trash: newTrash};
        case 'RESTORE_CARD':
            let cardsToAddIn = [...state.cards];
            let restoredTrash = [...state.trash];
            let index = restoredTrash.indexOf(restoredTrash.find(el => el._id === action.payload.id));
            cardsToAddIn.push(...(restoredTrash.splice(index, 1)));
            return {...state, cards: cardsToAddIn, trash: restoredTrash};
        case 'DELETE_CARD_PERMANENTLY':
            let trashNew = state.trash.filter(el => el._id !== action.payload);
            return {...state, trash: trashNew};
        case 'CLEAR_BIN':
            return {...state, trash: []}
        default: return state;
    }
};

export default kanban;
