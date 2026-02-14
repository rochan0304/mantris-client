import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { BsWallet2 } from "react-icons/bs";
import { BsBarChartLine } from "react-icons/bs";
import { SlHome } from "react-icons/sl";
import { GiConcentrationOrb } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";
import { RxExit } from "react-icons/rx";

type Pages = '/home' | '/assignment' | '/account' | '/exit';

const Navbar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    console.log(logout);
    const isActive = (path: Pages) => location.pathname === path;

    return(
        <div className={ styles.navbarContainer}>
            <nav className={ styles.navbar }>
                <Link to='/home' className={ styles.navbarLink } style={{ color: isActive('/home') ? '#A6FF00' : '#8F9395' }}><SlHome /></Link>
                <Link to='/assignment' className={ styles.navbarLink } style={{ color: isActive('/assignment') ? '#A6FF00' : '#8F9395' }}><BsBarChartLine /></Link>
                <div className={ styles.navbarLink }>
                    <Link to='/income' className={ styles.navbarLinkMain }>
                        <GiConcentrationOrb />
                    </Link>
                </div>
                <Link to='/account' className={ styles.navbarLink } style={{ color: isActive('/account') ? '#A6FF00' : '#8F9395' }}><BsWallet2 /></Link>
                <div 
                    className={ styles.navbarLink } 
                    style={{ color: isActive('/exit') ? '#A6FF00' : '#8F9395' }}
                    onClick={logout}
                ><RxExit /></div>
            </nav>
        </div>
    );
};

export default Navbar;