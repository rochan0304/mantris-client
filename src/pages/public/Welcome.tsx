import { Link } from "react-router-dom";
import MyButton from "../../components/ui/MyButton";

function WelcomePage() {
    return(
        <div style={{ 
            background: 'url("/fondo.jpg")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            minHeight: '100dvh',
            margin: '0'
        }}>
            <div style={{ 
                height: '100dvh', 
                padding: '40px 20px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'end',
                gap: '30px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '10px'}}>Gestiona tus finanzas <br /> con Mantris.</h1>
                    <p style={{ fontSize: '16px', color: '#7e7e7e'}}>Entra para mantener tus cuentas al día.</p>
                </div>
                <div>
                    <Link to='/login' style={{ textDecoration: 'none', color: 'black', fontWeight: '500'}}>
                        <MyButton style={{ marginBottom: '10px', padding: '15px'}}>
                            Iniciar Sesión
                        </MyButton>
                    </Link>
                    <Link to='/register' style={{ textDecoration: 'none', color: 'white'}}>
                        <MyButton variant="secondary" style={{ padding: '15px'}}>
                            Crear Cuenta
                        </MyButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;