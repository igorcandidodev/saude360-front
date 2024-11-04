import React, { createContext, useContext, useState } from 'react';

const ProfessionalContext = createContext();

export const useProfessional = () => {
    return useContext(ProfessionalContext);
};

export const ProfessionalProvider = ({ children }) => {
    const [professional, setProfessional] = useState(null);

    return (
        <ProfessionalContext.Provider value={{ professional, setProfessional }}>
            {children}
        </ProfessionalContext.Provider>
    );
};
