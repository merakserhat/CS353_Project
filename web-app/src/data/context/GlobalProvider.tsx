import { ReactNode, useState } from "react";
import { GlobalContext } from "./GlobalContextProps";

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [globalVariable, setGlobalVariable] = useState<string>('initialValue');
    const [userId, setUserId] = useState<string>();
    const [exercises, setExercises] = useState<ExerciseModel[]>();

    return (
        <GlobalContext.Provider value={{ globalVariable, setGlobalVariable, setUserId, setExercises }}>
            {children}
        </GlobalContext.Provider>
    );
};
