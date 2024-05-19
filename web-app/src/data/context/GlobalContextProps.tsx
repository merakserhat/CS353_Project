import React, { createContext, useState, ReactNode } from 'react';

interface GlobalContextProps {
    globalVariable: string;
    setGlobalVariable: (value: string) => void;
    //////////////////////////////////////////
    user?: UserModel;
    setUser: (value: UserModel | undefined) => void;
    //////////////////////////
    exercises?: ExerciseModel[]
    setExercises: (value: ExerciseModel[]) => void;
}

const defaultValue: GlobalContextProps = {
    globalVariable: 'initialValue',
    setGlobalVariable: () => {},
    setUser: () => {},
    setExercises: () => {},
};

export const GlobalContext = createContext<GlobalContextProps>(defaultValue);
