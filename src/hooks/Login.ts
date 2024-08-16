import React, { createContext, useContext } from 'react';

type LoginType = {
    setIsFirstLaunch: (value : boolean)=> void;
    isFirstLaunch: boolean | null;
    color: string,
    setColor: (value: string)=> void;
    login: boolean;
    setLogin: (value : boolean)=> void;
}
 const Login = createContext< LoginType | null>(null);