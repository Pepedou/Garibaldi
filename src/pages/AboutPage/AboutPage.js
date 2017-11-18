import React, {Component} from 'react';
import LoginNavbar from '../../components/partials/nav-bars/login-nav-bar/LoginNavbar'
import images from '../../content/images/exportImages'

require('./AboutPage.css')

class AboutPage extends Component {
    render() {
        return (
            <div className="col-xs col-md-12 AboutPage">
                <LoginNavbar selectedOption="aboutOption"/>
                <div className="row AboutPageContainer">
                    <div className="col-xs-0 col-md-2 col-lg-3"></div>
                    <div className="col-xs-12 col-md-8 col-lg-6">
                        <center>
                            <img src={images.gray_logo} id="registerLogo" alt=""/>
                            <div className="title">El archivero digital de arte para creadores. </div>
                            <p>
                                Surge de la observación de la necesidad generalizada por ordenar y poder mantener el control de la producción artística de manera práctica y eficiente. 
                            </p>
                            <p>
                                Es una herramienta fundamental pensada no solo para artistas, fotógrafos, arquitectos y diseñadores sino también para coleccionistas, galerías, gestores y centros culturales.
                            </p>
                            <p>
                                Bienvenidxs a Artchive. Esperamos que sea la herramienta de control interno y externo de cualquier colección de arte por antonomasia.
                            </p>
                        </center>
                    </div>
                    <div className="col-xs-0 col-md-2 col-lg-3"></div>
                </div>
            </div>
        )
    }
}

AboutPage.displayName = 'AboutPage'

export default AboutPage