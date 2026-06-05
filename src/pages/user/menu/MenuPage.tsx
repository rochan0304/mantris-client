import { LuArrowDownUp } from "react-icons/lu";
import MyButton from "../../../components/ui/MyButton"
import { RxExit } from "react-icons/rx";
import { useAuth } from "../../../context/AuthContext";

function MenuPage() {
    const { logout } = useAuth();

    return (
        <div style={{
            padding: '20px'
        }}>
            <section style={{
                padding: '0 0 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                flexWrap: 'wrap'
            }}>
                <h2 style={{
                    color: '#535353',
                    fontSize: '16px'
                }}>
                    Gestión financiera
                </h2>
                <div>
                    <button style={{
                        backgroundColor: '#192126',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        border: 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        width: 'calc(50% - 5px)',
                        textAlign: 'start'
                    }}>
                        <LuArrowDownUp fontSize={'20px'}/> <p>Movimientos</p>
                    </button>
                </div>
            </section>
            <section style={{
                padding: '0 0 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                flexWrap: 'wrap'
            }}>
                <h2 style={{
                    color: '#535353',
                    fontSize: '16px'
                }}>
                    Cuenta
                </h2>
                <button style={{
                        backgroundColor: '#192126',
                        color: 'red',
                        padding: '20px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        border: 'none',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        width: 'calc(50% - 5px)',
                        textAlign: 'start'
                    }} onClick={logout}>
                        <RxExit fontSize={'20px'}/> <p>Salir</p>
                    </button>
            </section>
        </div>
    );
}

export default MenuPage;