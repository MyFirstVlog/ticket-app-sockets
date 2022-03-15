import React, {createContext, useState} from 'react'

export const uiContext = createContext();

export const UiProvider = ({children}) => {

    const [ocultarMenu, setOcultarMenu] = useState(false);

    const showMenu = () => {
        setOcultarMenu(false);
    };

    const hideMenu = () => {
        setOcultarMenu(true);
    }

  return (
    <uiContext.Provider value={{
        ocultarMenu,
        showMenu,
        hideMenu
    }}>
        {children}
    </uiContext.Provider>
  )
}
