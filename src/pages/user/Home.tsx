import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";
import { useEffect } from "react";
import { useTitleContext } from "../../layouts/ModuleLayout";
import BalanceCarousel from "../../components/ui/BalanceCarousel";
import { useRates } from "../../context/ExchangeRatesContext";

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
});


function Home() {
    const exchangeRates = useRates();

    const setTitle = useTitleContext();

    useEffect(()=> {
        setTitle('Inicio')
    }, [])

    return(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <BalanceCarousel />
            <section style={{display: 'flex', flexDirection: 'column', gap: '15px', padding: '0 20px'}}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to='/income' 
                        style={{ 
                            color: '#A6FF00', 
                            textDecoration: 'none', 
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px',
                            padding: '15px',
                            flex: '1',
                            backgroundColor: '#192126',
                            borderRadius: '1000px',
                            fontSize: '16px'
                        }}>
                        <GoArrowUpRight fontSize={'24px'}/> Ingreso
                    </Link>
                    <Link to='/spent' 
                        style={{ 
                            color: 'white', 
                            textDecoration: 'none', 
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px',
                            padding: '15px',
                            flex: '1',
                            backgroundColor: '#192126',
                            borderRadius: '1000px',
                            fontSize: '16px'
                        }}>
                        <GoArrowDownRight fontSize={'24px'}/> Gasto
                    </Link>
                </div>
            </section>
            <section style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
                <h3 style={{ color: '#535353' }}>Tasas de cambio</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    { exchangeRates && Object.entries(exchangeRates.rates).map(([currency]) => (
                        <div key={currency} 
                            style={{ 
                                backgroundColor: '#192126', 
                                padding: '20px 20px', 
                                borderRadius: '20px',
                                flex: '0 0 100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                                gap: '10px',
                                fontSize: '16px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '400', flex: '1'}}>{currency}</div>
                            <div style={{ textAlign: 'center', flex: '1', opacity: '0.5' }}>
                                <FaArrowRightArrowLeft fontSize={'12px'}/>
                            </div>
                            <p style={{ fontFamily: 'Inter, sans-serif', opacity: '0.5', display: 'flex', gap: '10px', alignItems: 'center', flex: '1', justifyContent: 'end'}}> Bs {exchangeRates.convert(1, currency, 'VES')}</p>
                        </div>
                    )) }
                </div>
            </section>
        </div>
    );
}

export default Home;