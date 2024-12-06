import React from 'react';
import {UserDisplaySmall} from '../components/UserDisplaySmall';

 export const User=(props)=> {
        return ( 
                <UserDisplaySmall 
                    id={props.id}
                    surname={props.surname}
                    lastname={props.lastname}
                    login={props.login}
                    pwd={props.pwd}
                    money={props.money}> 
                </UserDisplaySmall>
            );
    }
