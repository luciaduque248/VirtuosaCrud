import React from 'react'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import Experiencias from '../pages/Experiencias'
import Inicio from '../pages/Inicio'
import Maquillaje from '../pages/Maquillaje'
import Moda from '../pages/Moda'
import Nosotros from '../pages/Nosotros'
import Descuentos from '../pages/ropa/DescuentosRS'
import Tendencias from '../pages/ropa/TendenciasRS'
import Vestidos from '../pages/ropa/VestidosRS'
import Tips from '../pages/Tips'
import Contacto from '../pages/Contacto';
import Diseña from '../pages/ropa/DiseñaRS';
import AdmVS from '../components/Admin/AdmVS';
import FormVestido from '../components/Admin/vestidos/FormVestido';
import InicioAdmin from '../components/Admin/InicioAdmin';
import Login from '../pages/Login';

import Ojos from '../pages/maquillaje/ojos/Ojos'
import Labios from '../pages/maquillaje/labios/Labios'
import Piel from '../pages/maquillaje/cuidadoPiel/Piel'
import Rostro from '../pages/maquillaje/rostro/Rostro';

import CardsOjos from '../components/Admin/maquillaje/ojos/CardsOjos';
import FormOjos from '../components/Admin/maquillaje/ojos/FormOjos'
import CardsRostro from '../components/Admin/maquillaje/rostro/CardsRostro'
import FormRostro from '../components/Admin/maquillaje/rostro/FormRostro'
import CardsLabios from '../components/Admin/maquillaje/labios/CardsLabios'
import FormLabios from '../components/Admin/maquillaje/labios/FormLabios'
import CardsPiel from '../components/Admin/maquillaje/cuidadodelapiel/CardsPiel'
import FormPiel from '../components/Admin/maquillaje/cuidadodelapiel/FormPiel'
import EditMaquillaje from '../components/Admin/maquillaje/EditMaquillaje';
import CardsDisc from '../components/Admin/descuentos/CardsDisc';


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/VirtuosaCrud/' element={<Inicio />} ></Route>
                <Route path='/VirtuosaCrud/maquillaje' element={<Maquillaje />}></Route>
                <Route path='/VirtuosaCrud/moda' element={<Moda />}></Route>
                <Route path='/VirtuosaCrud/tips' element={<Tips />}></Route>
                <Route path='/VirtuosaCrud/experiencias' element={<Experiencias />}></Route>
                <Route path='/VirtuosaCrud/nosotros' element={<Nosotros />}></Route>
                <Route path='/VirtuosaCrud/contacto' element={<Contacto />}></Route>

                <Route path='/VirtuosaCrud/moda-vestidos' element={<Vestidos />}></Route>
                <Route path='/VirtuosaCrud/moda-descuentos' element={<Descuentos />}></Route>
                <Route path='/VirtuosaCrud/moda-diseña' element={<Diseña />}></Route>
                <Route path='/VirtuosaCrud/moda-tendencias' element={<Tendencias />}></Route>

                <Route path='/VirtuosaCrud/edit-vestidos' element={<AdmVS/>}></Route>
                <Route path='/VirtuosaCrud/form-vestidos' element={<FormVestido/>}></Route>
                <Route path='/VirtuosaCrud/edit-descuentos' element={<CardsDisc/>}></Route>
                <Route path='/VirtuosaCrud/form-descuentos' element={<FormVestido/>}></Route>

                <Route path='/VirtuosaCrud/edit-maquillaje' element={<EditMaquillaje />}></Route>

                <Route path='/VirtuosaCrud/edit-ojos' element={<CardsOjos />}></Route>
                <Route path='/VirtuosaCrud/form-ojos' element={<FormOjos />}></Route>
                <Route path='/VirtuosaCrud/edit-rostro' element={<CardsRostro />}></Route>
                <Route path='/VirtuosaCrud/form-rostro' element={<FormRostro />}></Route>
                <Route path='/VirtuosaCrud/edit-labios' element={<CardsLabios />}></Route>
                <Route path='/VirtuosaCrud/form-labios' element={<FormLabios />}></Route>
                <Route path='/VirtuosaCrud/edit-cuidadodelapiel' element={<CardsPiel />}></Route>
                <Route path='/VirtuosaCrud/form-cuidadodelapiel' element={<FormPiel />}></Route>
                
                <Route path='/VirtuosaCrud/login' element={<Login/>}></Route>
                <Route path='/VirtuosaCrud/admin' element={<InicioAdmin/>}></Route>

                <Route path='/VirtuosaCrud/ojos' element={<Ojos/>}></Route>
                <Route path='/VirtuosaCrud/labios' element={<Labios/>}></Route>
                <Route path='/VirtuosaCrud/piel' element={<Piel/>}></Route>
                <Route path='/VirtuosaCrud/rostro' element={<Rostro/>}></Route>

                <Route path='/VirtuosaCrud/*' element={<Navigate to="/" />}></Route>

                <Route path='/VirtuosaCrud/home' element={<Navigate to={"/"} />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes