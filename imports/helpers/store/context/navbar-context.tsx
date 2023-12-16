import React, {useState, createContext} from 'react';

export const NavbarsContext = createContext({
  mode: 'light',
  changeToDark: () => {},
  changeToLight: () => {},
});

export function NavbarsContextProvider({children}) {
  const [mode, setMode] = useState('light');

  function changeToDark() {
    setMode('dark');
  }

  function changeToLight() {
    setMode('light');
  }

  const value = {
    mode: mode,
    changeToDark: changeToDark,
    changeToLight: changeToLight,
  };

  return (
    <NavbarsContext.Provider value={value}>{children}</NavbarsContext.Provider>
  );
}

// export default NavbarsContextProvider;
