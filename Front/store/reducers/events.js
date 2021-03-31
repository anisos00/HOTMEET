import { SET_EVENTS, CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, LIKE_EVENT, UNLIKE_EVENT, COMMENT_EVENT, UNCOMMENT_EVENT, ADD_COMMENT_TEMP } from "../actions/event";

const initialState = {
    allEvents: [],
};

export default (state=initialState, action) => {
    switch(action.type){
        case SET_EVENTS:
            return {
                ...state,
                allEvents: action.events
            }

        case CREATE_EVENT:
            return{
                ...state,
                allEvents: [action.eventData, ...state.allEvents]
            }

        case UPDATE_EVENT:
            const eventIndex = state.allEvents.findIndex(event => event._id === action.updatedEventData._id);
            const updatedAllEvents = [...state.allEvents];
            updatedAllEvents[eventIndex] = action.updatedEventData;
            return {
                ...state,
                allEvents: updatedAllEvents
            }

        case DELETE_EVENT:
            return {
                ...state,
                allEvents: state.allEvents.filter(event => event._id !== action.pid)
            }

        case LIKE_EVENT:
            const eIndex = state.allEvents.findIndex(event => event._id === action.eventId);
            const updatedLikeEvents = [...state.allEvents];
            if(updatedLikeEvents[pIndex].likes.indexOf(action.userId) === -1){
                updatedLikeEvents[pIndex].likes = updatedLikeEvents[pIndex].likes.concat(action.userId);
            }
            return{
                ...state,
                allEvents: updatedLikeEvents
            }

        case UNLIKE_EVENT:
            const pInd = state.allEvents.findIndex(event => event._id === action.eventId);
            const updatedUnlikeEvents = [...state.allEvents];
            updatedUnlikeEvents[pInd].likes = updatedUnlikeEvents[pInd].likes.filter(x => x !== action.userId);
            return{
                ...state,
                allEvents: updatedUnlikeEvents
            }

        case COMMENT_EVENT:
            const index = state.allEvents.findIndex(event => event._id === action.eventId);
            const updatedCommentEvents = [...state.allEvents];
            updatedCommentEvents[index].comments = action.comments;
            return{
                ...state,
                allEvents: updatedCommentEvents
            }

            case UNCOMMENT_EVENT:
                const indx = state.allEvents.findIndex(event => event._id === action.eventtId);
                const updatedUncommentEvents = [...state.allEvents];
                updatedUncommentEvents[indx].comments = updatedUncommentEvents[indx].comments.filter(c => c._id !== action.commentId)
    
                return{
                    ...state,
                    allEvents: updatedUncommentEvents
                }
    
            case ADD_COMMENT_TEMP:
                const i = state.allEvents.findIndex(event => event._id === action.eventId);
                const updatedAddComment = [...state.allEvents];
                updatedAddComment[i].comments = updatedAddComment[i].comments.concat(action.comment)
                return{
                    ...state,
                    allEvents: updatedAddComment
                }
    
            default:
                return state;
        }
    }