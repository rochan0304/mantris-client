import { IoIosMail } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import MyButton from "../../components/ui/MyButton";
import MyInput from "../../components/ui/MyInput";
import BackButton from "../../components/ui/BackButton";
import { IoIosLock } from "react-icons/io";
import { registerUser } from "../../api/auth.api";
import { useForm } from "react-hook-form";
import axios from "axios";

interface RegisterForm {
    email: string;
    password: string;
}

function RegisterPage() {
    const {register, handleSubmit, setError, formState: {errors} } = useForm<RegisterForm>()
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterForm ) => {
        try {
            await registerUser(data);
            navigate('/login');
        } catch (err) {
            if (axios.isAxiosError(err) && err.status === 400) {
                const serverErrors: string[] = err.response?.data.message;
                serverErrors.forEach(msg => {
                    if (msg.toLowerCase().includes('contraseña')) {
                        setError('password', { type: 'server', message: msg})
                    }

                    if (msg.toLowerCase().includes('correo')) {
                        setError('email', { type: 'server', message: msg})
                    }
                });
            }

            if (axios.isAxiosError(err) && err.response?.status === 409) {
                const msg: string = err.response.data.message;
                setError('email', {type: 'server', message: msg });
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
                <h2 style={{fontSize: '24px', color: '#8C9092'}}>Crea tu cuenta Mantris</h2>
            </div>
            <form 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <MyInput 
                        icon={<IoIosMail />} 
                        placeholder="Correo" 
                        {...register('email')}
                    />
                    { errors.email && <p style={{color: 'red', fontSize: '14px', fontWeight: '200', paddingTop: '5px'}}>{errors.email.message}</p>}
                </div>

                <div>
                    <MyInput 
                        icon={<IoIosLock />} 
                        placeholder="Contraseña" 
                        type="password" 
                        { ...register('password')}
                    />
                    { errors.password && <p style={{color: 'red', fontSize: '14px', fontWeight: '200', paddingTop: '5px'}}>{errors.password.message}</p>}
                </div>

                <MyButton variant="primary" type="submit">Continuar</MyButton>

                <span style={{ width: '100%', textAlign: 'center', color: '#8C9092'}}>o continuar con</span>
                <MyButton variant="secondary" style={{ display: 'flex', justifyContent: 'center', gap: '10px'}}><span style={{ display: 'flex', fontSize: '18px'}}><FcGoogle /></span> Google</MyButton>

                <span style={{ width: '100%', textAlign: 'center', color: 'white'}}>¿Ya tienes una cuenta? <Link to='/login' style={{color: 'white', textDecoration: 'none', fontWeight: '700'}}>Inicia sesión</Link></span>
            </form>
        </div>
    );
}

export default RegisterPage;