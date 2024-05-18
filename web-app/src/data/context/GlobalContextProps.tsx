import React, { createContext, useState, ReactNode } from 'react';

interface GlobalContextProps {
    globalVariable: string;
    setGlobalVariable: (value: string) => void;
    //////////////////////////////////////////
    userId?: string;
    setUserId: (value: string | undefined) => void;
    //////////////////////////
    exercises?: ExerciseModel[]
    setExercises: (value: ExerciseModel[] | undefined) => void;
}

const defaultValue: GlobalContextProps = {
    globalVariable: 'initialValue',
    setGlobalVariable: () => {},
    setUserId: () => {},
    setExercises: () => {},
};

export const GlobalContext = createContext<GlobalContextProps>(defaultValue);
