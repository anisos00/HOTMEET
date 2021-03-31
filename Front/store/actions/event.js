import ENV from '../../env';

export const DELETE_EVENT = "DELETE_PRODUCT";
export const CREATE_EVENT = "CREATE_PRODUCT";
export const UPDATE_EVENT = "UPDATE_PRODUCT";
export const SET_EVENTS = 'SET_EVENTS';
export const LIKE_EVENT = 'LIKE_EVENT';
export const UNLIKE_EVENT = 'UNLIKE_EVENT';
export const COMMENT_EVENT = 'COMMENT_EVENT';
export const UNCOMMENT_EVENT = 'UNCOMMENT_EVENT';
export const ADD_COMMENT_TEMP = 'ADD_COMMENT_TEMP';

export const fetchEvents= () => {
    return async (dispatch, getState) => {
        const response = await fetch(`http://10.0.2.2:5000/rn/allevents`);

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        // console.log(resData[0]);
        dispatch({
            type: SET_EVENTS,
            events: resData
        })
    }
};

//actions and reducers


export const createEvent = (title, place, description, base64Data, imageType) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const eventData = { title, place, description,base64Data, imageType }
        // console.log(JSON.stringify(eventData))
        // any async code
        const response = await fetch(`${ENV.apiUrl}/rn/event/new/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(eventData)
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }

        dispatch({
            type: CREATE_EVENT,
            eventData: {
                _id: resData._id,
                title: resData.title,
                place : resData.place,
                description : resData.description,
                comments: resData.comments,
                created: new Date(resData.created),
                likes: resData.likes,
                postedBy: {
                    _id: resData.postedBy._id,
                    name: resData.postedBy.name
                }
            }
        });
    }
};


export const deleteEvent = (eventId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`http://10.0.2.2:5000/event/${eventId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        dispatch({
            type: DELETE_EVENT,
            pid: eventId
        })
    }
};


export const updateEvent = (eventId, title, place, description, base64Data, imageType) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        let eventData;
        const userId = getState().auth.user._id;
        if (!base64Data || !imageType || (base64Data === '' && imageType === '')) {
            eventData = { title, place, description }
        } else {
            eventData = { title, place, description , base64Data, imageType }
        }
        const response = await fetch(`http://10.0.2.2:5000/rn/event/${eventId}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(eventData)
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        dispatch({
            type: UPDATE_EVENT,
            updatedEventData: {
                _id: resData._id,
                title: resData.title,
                place : resData.place,
                description : resData.description,
                comments: resData.comments,
                created: new Date(resData.created),
                likes: resData.likes,
                postedBy: {
                    _id: resData.postedBy._id,
                    name: resData.postedBy.name
                },
                updated: new Date(resData.updated)
            }
        });
    }
};


export const likeEvent = (eventId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const events = getState().events.allEvents;
        const index = events.findIndex(p => p._id === eventId)
        if (events[index].likes.indexOf(userId) === -1) {
            dispatch({
                type: LIKE_EVENT,
                userId: userId,
                postId: postId
            });

            const response = await fetch(`http://10.0.2.2:5000/event/like`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ userId, eventId })
            });
            const resData = await response.json();
            if (resData.error) {
                throw new Error(resData.error);
            }
        }
    }
};


export const unlikeEvent = (eventId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;

        dispatch({
            type: UNLIKE_EVENT,
            userId: userId,
            eventId: eventId
        });
        const response = await fetch(`${ENV.apiUrl}/event/unlike`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, eventId })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
    }
};



export const commentEvent = (eventId, text) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const userName = getState().auth.user.name;

        const comment = { text };

        // dispatch({
        //     type: ADD_COMMENT_TEMP,
        //     eventId: eventId,
        //     comment: {
        //         text: text,
        //         edBy: {
        //             _id: userId,
        //             name: userName
        //         },
        //         created: new Date()
        //     }
        // });

        const response = await fetch(`http://10.0.2.2:5000/event/comment`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, eventId, comment })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
        dispatch({
            type: COMMENT_EVENT,
            eventId: eventId,
            comments: resData.comments
        });
    }
};


export const uncommentEvent = (eventId, comment) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.user._id;

        dispatch({
            type: UNCOMMENT_EVENT,
            eventId: eventId,
            commentId: comment._id
        });

        const response = await fetch(`${ENV.apiUrl}/event/uncomment`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId, eventId, comment })
        });
        const resData = await response.json();
        if (resData.error) {
            throw new Error(resData.error);
        }
    }
};