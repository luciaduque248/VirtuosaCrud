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
                <Route path='/' element={<Inicio />} ></Route>
                <Route path='/maquillaje' element={<Maquillaje />}></Route>
                <Route path='/moda' element={<Moda />}></Route>
                <Route path='/tips' element={<Tips />}></Route>
                <Route path='/experiencias' element={<Experiencias />}></Route>
                <Route path='/nosotros' element={<Nosotros />}></Route>
                <Route path='/contacto' element={<Contacto />}></Route>

                <Route path='/moda-vestidos' element={<Vestidos />}></Route>
                <Route path='/moda-descuentos' element={<Descuentos />}></Route>
                <Route path='/moda-diseña' element={<Diseña />}></Route>
                <Route path='/moda-tendencias' element={<Tendencias />}></Route>

                <Route path='/edit-vestidos' element={<AdmVS/>}></Route>
                <Route path='/form-vestidos' element={<FormVestido/>}></Route>
                <Route path='/edit-descuentos' element={<CardsDisc/>}></Route>
                <Route path='/form-descuentos' element={<FormVestido/>}></Route>

                <Route path='/edit-maquillaje' element={<EditMaquillaje />}></Route>

                <Route path='/edit-ojos' element={<CardsOjos />}></Route>
                <Route path='/form-ojos' element={<FormOjos />}></Route>
                <Route path='/edit-rostro' element={<CardsRostro />}></Route>
                <Route path='/form-rostro' element={<FormRostro />}></Route>
                <Route path='/edit-labios' element={<CardsLabios />}></Route>
                <Route path='/form-labios' element={<FormLabios />}></Route>
                <Route path='/edit-cuidadodelapiel' element={<CardsPiel />}></Route>
                <Route path='/form-cuidadodelapiel' element={<FormPiel />}></Route>
                
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/admin' element={<InicioAdmin/>}></Route>

                <Route path='/ojos' element={<Ojos/>}></Route>
                <Route path='/labios' element={<Labios/>}></Route>
                <Route path='/piel' element={<Piel/>}></Route>
                <Route path='/rostro' element={<Rostro/>}></Route>

                <Route path='/*' element={<Navigate to="/" />}></Route>

                <Route path='/home' element={<Navigate to={"/"} />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes