//aonde minha pagina vai ser exibida
import { Outlet } from "react-router-dom";
//importando nosso componente
import { Header } from "../header";

export function Layout(){
    return(
        <>
        
        <Header/>
        <Outlet/>
        </>
    )
}