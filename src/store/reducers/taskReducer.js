const initialState = {
    tasks: [],
    loading: false,
    error: null
}

const taskReducer = (state = initialState, action) => {
    console.log("taskReducer", state, action);
    switch (action.type) {
        case "SET_TASKS":
            return {
                ...state,
                tasks: action.payload
            }

        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }

        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
            }

        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }

        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default taskReducer;