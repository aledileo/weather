import React from "react";

export const defaultState = {
  enabledHours: [
    '8', '12', '16', '18', '19', '20' 
  ],
};

const SettingsContext = React.createContext(defaultState);
export default SettingsContext;
