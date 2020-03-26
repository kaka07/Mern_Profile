//Its gonna be a function that gonna take a state and an action

import {SET_ALERT,REMOVE_ALERT} from '../actions/types';

const initialState=[];//empty array

export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case SET_ALERT:
            return [...state,payload];
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id !==payload);
        default:
            return state;
    }
}