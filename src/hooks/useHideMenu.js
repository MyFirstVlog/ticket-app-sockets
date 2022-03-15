import React, { useContext, useEffect } from 'react'
import { uiContext } from '../context/UiContext'

export const useHideMenu = (ocultar) => {

    const {showMenu,hideMenu} = useContext(uiContext);

    useEffect(() => {
      if(ocultar){
          hideMenu();
      }else{
         showMenu(); 
      }
    }, [ocultar, hideMenu, showMenu])
}
