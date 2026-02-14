import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { IoIosLock } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import MyButton from "../../components/ui/MyButton";
import MyInput from "../../components/ui/MyInput";
import BackButton from "../../components/ui/BackButton";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/auth.api";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface LoginData {
    email: string;
    password: string;
    credentials: string;
}

function LoginPage() {
    const { register, handleSubmit, setError, formState: { errors }} = useForm<LoginData>()
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginData) => {
        try {
            const response = await loginUser(data);
            const token = response.data.acces_token;
            if (login) {
                login(token);
                navigate('/home');
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.status === 401) {
                const message: string = err.response?.data?.message;

                setError('credentials', { type: 'server', message});
            }

            if (axios.isAxiosError(err) && err.status === 400) {
                const serverErrors: string[] = err.response?.data?.message;
                
                serverErrors.forEach(msg => {
                    if (msg.toLowerCase().includes('correo')) {
                        setError('email', { type: 'server', message: msg });
                    }

                    if (msg.toLowerCase().includes('contraseña')) {
                        setError('password', { type: 'server', message: msg });
                    }
                });
            }
        }
    }
    return (
        <div style={{ padding: '0 20px'}}>
            <nav style={{display: 'flex', padding: '20px 0'}}>
                <BackButton />
            </nav>
            <div style={{padding: '30px 0', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <h1 style={{fontSize: '32px'}}>Tus cuentas al día.</h1>
                <h2 style={{fontSize: '24px', color: '#8C9092'}}>Bienvenido de nuevo</h2>
            </div>
            <form 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
                onSubmit={handleSubmit(onSubmit)}
                >
                { errors.credentials && <p style={{color: 'red', fontSize: '14px', fontWeight: '200', textAlign: 'center'}}>{errors.credentials.message}</p>}
                <div>
                    <MyInput 
                        icon={<IoIosMail />} 
                        placeholder="Correo"
                        { ...register('email')}
                    />
                    { errors.email && <p style={{color: 'red', fontSize: '14px', fontWeight: '200', paddingTop: '5px'}}>{errors.email.message}</p>}
                </div>
                
                <div>
                    <MyInput 
                        icon={<IoIosLock />} 
                        { ...register('password')}
                        placeholder="Contraseña"
                        type="password"
                    />
                    { errors.password && <p style={{color: 'red', fontSize: '14px', fontWeight: '200', paddingTop: '5px'}}>{errors.password.message}</p>}
                </div>

                <span style={{ width: '100%', textAlign: 'right', fontWeight: '500'}}>¿Olvidaste tu contraseña?</span>

                <MyButton variant="primary">Continuar</MyButton>

                <span style={{ width: '100%', textAlign: 'center', color: '#8C9092'}}>o continuar con</span>
                <MyButton variant="secondary" style={{ display: 'flex', justifyContent: 'center', gap: '10px'}}><span style={{ display: 'flex', fontSize: '18px'}}><FcGoogle /></span> Google</MyButton>

                <span style={{ width: '100%', textAlign: 'center', color: 'white'}}>¿No tienes cuenta? <Link to='/register' style={{color: 'white', textDecoration: 'none', fontWeight: '700'}}>Regístrate</Link></span>
            </form>
        </div>
    );
}

export default LoginPage;