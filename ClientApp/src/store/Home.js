const POST_DATA_REQUEST = "POST_DATA_REQUEST";

function postDataRequest() {
    return {type: POST_DATA_REQUEST}
}

const POST_DATA_REQUEST_SUCCEED = "POST_DATA_REQUEST_SUCCEED";

function postDataRequestSucceed(data) {
    return {type: POST_DATA_REQUEST_SUCCEED, payload: data}
}

const POST_DATA_REQUEST_ERROR = "POST_DATA_REQUEST_ERROR";

function postDataRequestError(err) {
    return {type: POST_DATA_REQUEST_ERROR, payload: err}
}


const apiClient = {
    postData: async (data) => {
        return await fetch('api/title/postTitleData', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .catch((err) => console.log('Error:', err));
    },
};

export const actionCreators = {
    postData: (data) => (dispatch) => {
        dispatch(postDataRequest());
        apiClient.postData(data)
            .then((resp) => dispatch(postDataRequestSucceed(resp)))
            .catch((err) => dispatch(postDataRequestError(err)));
    },
};

const initialState = {
    response: [],
    isLoading: false,
    status: false,
};

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case POST_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case POST_DATA_REQUEST_SUCCEED:
            return {
                ...state,
                isLoading: false,
                response: action.payload,
            };
        case POST_DATA_REQUEST_ERROR:
            return {
                ...state,
                isLoading: false,
                status: 'ERROR'
            };
        default:
            return state;
    }

};