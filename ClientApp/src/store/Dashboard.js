const GET_DATA_REQUEST = "GET_DATA_REQUEST";
function getDataRequest() {
    return {type: GET_DATA_REQUEST}
}

const GET_DATA_REQUEST_SUCCEED = "GET_DATA_REQUEST_SUCCEED";
function getDataRequestSucceed(data) {
    return {type: GET_DATA_REQUEST_SUCCEED, payload: data}
}

const GET_DATA_REQUEST_ERROR = "GET_DATA_REQUEST_ERROR";
function getDataRequestError(err) {
    return {type: GET_DATA_REQUEST_ERROR, payload: err}
}

const DELETE_DATA_REQUEST = "DELETE_DATA_REQUEST";
function deleteDataRequest() {
    return {type: DELETE_DATA_REQUEST}
}

const DELETE_DATA_REQUEST_SUCCEED = "DELETE_DATA_REQUEST_SUCCEED";
function deleteDataRequestSucceed(resp) {
    return {type: DELETE_DATA_REQUEST_SUCCEED, payload: resp}
}

const DELETE_DATA_REQUEST_ERROR = "DELETE_DATA_REQUEST_ERROR";
function deleteDataRequestError(err) {
    return {type: DELETE_DATA_REQUEST_ERROR, payload: err}
}

const apiClient = {
    getData: async () => {
        return await fetch('api/title/getAllTitleData')
            .then((response) => response.json())
            .catch((err) => console.log('Error:', err));
    },
    deleteData: async () => await fetch('api/title/ClearDb', {
        method: "DELETE",
    }),
};

export const actionCreators = {
    getAllData: () => (dispatch) => {
        dispatch(getDataRequest());
        apiClient.getData()
            .then((resp) => dispatch(getDataRequestSucceed(resp)))
            .catch((err) => dispatch(getDataRequestError(err)));
    },
    clearDb: () => (dispatch) =>{
        dispatch(deleteDataRequest());
        apiClient.deleteData()
            .then(resp => dispatch(deleteDataRequestSucceed(resp)))
            .catch(err => dispatch(deleteDataRequestError(err)));
    }
};

const initialState = {
    response: [],
    isLoading: false,
    status: false,
};

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case GET_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_DATA_REQUEST_SUCCEED:
            return {
                ...state, isLoading: false, response: action.payload,
            };
        case GET_DATA_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                status: false
            };
        case DELETE_DATA_REQUEST:
            return {...state,  isLoading: true};
        case DELETE_DATA_REQUEST_SUCCEED:
            return {
                ...state,
                response: [],
                isLoading: false,
                status: true,
            };
        case DELETE_DATA_REQUEST_ERROR:
            return {
                ...state,
                response: [],
                isLoading: false,
                status: false,
            };
        default:
            return state;
    }

};