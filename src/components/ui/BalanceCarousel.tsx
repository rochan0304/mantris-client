import type React from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRates } from "../../context/ExchangeRatesContext";
import { useEffect, useState } from "react";
import { getBalanceSummary } from "../../api/account.api";
import type { BalanceSummary, ConvertedBalance, GetBalanceSummaryResponse } from "../../types/accounts.type";
import { useAuth } from "../../context/AuthContext";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
});

const BalanceCarousel: React.FC = () => {
    const { user } = useAuth();
    const exchangeRates = useRates();
    const [ totalByCurrency, setTotalByCurrency ] = useState<BalanceSummary[]>();
    
    const [ indice, setIndice ] = useState(0);
    const [ convertedBalances, setConvertedBalances ] = useState<ConvertedBalance[]>([]);

    const next = () => {
        if (convertedBalances.length > 0) {
            setIndice((prev) => (prev + 1) % convertedBalances.length);
        }
    };

    useEffect(() => {
        const balanceSummary = async () => {
            try {
                const response = await getBalanceSummary();
                const data = response.data;

                setTotalByCurrency(data);
                setConvertedBalances(data[indice].convertedBalance);
            } catch (error) {
                console.log(error);
            }
        };
        
        balanceSummary();
    }, []);

    if (!totalByCurrency) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
                <img src="/loader.svg" alt="Cargando" width={'80px'} />
            </div>
        )
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, EffectCards]}
            effect="cards"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            style={{ width: '100%', maxWidth: '500px', padding: '0 30px 40px', overflow: 'hidden' }}
            onClick={next}
        >
            { totalByCurrency && totalByCurrency.map(balance => {
                if (balance.currencyId === user?.baseCurrency.id) {
                    const currentConvertion = balance.convertedBalance[indice];
                    return (
                        <SwiperSlide 
                            style={{
                                padding: '60px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                background: 'linear-gradient(to top, rgb(120, 185, 0), #A6FF00, rgb(120, 185, 0))',
                                borderRadius: '20px',
                                color: 'black',
                                position: 'relative'
                            }}
                            key={balance.currencyId}
                        >
                                <div style={{
                                    background: 'rgb(0, 0, 0)',
                                    padding: '10px',
                                    minWidth: '60px',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    color: '#A6FF00',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px'
                                }}>
                                    { balance.currencyId }
                                </div>
                            <div>
                                <p style={{opacity: '0.5'}}>Tu balance</p>
                                <p style={{fontSize: '40px', fontFamily: 'Inter, sans-serif'}}>
                                    <span style={{opacity: '0.6', fontSize: '28px'}}>{ balance.currencySymbol }</span> <span style={{fontWeight: '700'}}>{ formatter.format(+balance.balance) }</span>
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#324D00', fontSize: '16px'}}>
                                <FaArrowRightArrowLeft fontSize={'12px'}/>
                                <p style={{fontSize: '16px', fontFamily: 'Inter, sans-serif'}}>
                                    <span style={{ opacity: '0.7'}}>{ exchangeRates?.currencies[currentConvertion.currencyId].id }</span> <span>{ formatter.format(+ balance.convertedBalance[indice].amount) }</span>
                                </p>
                            </div>
                        </SwiperSlide>
                    );
                }
            })}
            { totalByCurrency && totalByCurrency.map(balance => {
                const currentConvertion = balance.convertedBalance[indice];

                if (balance.currencyId === user?.baseCurrency.id) {
                    return;
                }

                return (
                    <SwiperSlide 
                        style={{
                            padding: '60px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            background: 'linear-gradient(to top, rgb(120, 185, 0), #A6FF00, rgb(120, 185, 0))',
                            borderRadius: '20px',
                            color: 'black',
                            position: 'relative'
                        }}
                        key={balance.currencyId}
                    >
                            <div style={{
                                background: 'rgb(0, 0, 0)',
                                padding: '10px',
                                minWidth: '60px',
                                textAlign: 'center',
                                borderRadius: '10px',
                                color: '#A6FF00',
                                fontWeight: '400',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                top: '20px',
                                right: '20px'
                            }}>
                                { balance.currencyId }
                            </div>
                        <div>
                            <p style={{opacity: '0.5'}}>Tu balance</p>
                            <p style={{fontSize: '40px', fontFamily: 'Inter, sans-serif'}}>
                                <span style={{opacity: '0.6', fontSize: '28px'}}>{ balance.currencySymbol }</span> <span style={{fontWeight: '700'}}>{ formatter.format(+balance.balance) }</span>
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#324D00', fontSize: '16px'}}>
                            <FaArrowRightArrowLeft fontSize={'12px'}/>
                            <p style={{fontSize: '16px', fontFamily: 'Inter, sans-serif'}}>
                                <span style={{ opacity: '0.7'}}>{ exchangeRates?.currencies[currentConvertion.currencyId].id }</span> <span>{ formatter.format(+ balance.convertedBalance[indice].amount) }</span>
                            </p>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}

export default BalanceCarousel;