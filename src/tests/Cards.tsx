import React from 'react';
// Importamos los componentes de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Importamos los módulos necesarios
import { Navigation, Pagination, EffectCoverflow, EffectCards } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const Cards: React.FC = () => {
  const cards = [
    { id: 1, color: "#FF5733", text: "Tarjeta A" },
    { id: 2, color: "#33FF57", text: "Tarjeta B" },
    { id: 3, color: "#3357FF", text: "Tarjeta C" },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <Swiper
        // 1. Configuración de módulos
        modules={[Navigation, Pagination, EffectCards]}
        
        // 2. Efecto visual (opcional, para que se vea premium)
        effect={'cards'}
        grabCursor={true}
        centeredSlides={true}
        
        // 3. Control de "Una por una"
        slidesPerView={1} 
        
        // 4. Navegación y paginación
        pagination={{ clickable: true,  }}
        
        style={{ padding: '20px 0 40px' }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div style={{
              height: '400px',
              backgroundColor: card.color,
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              {card.text}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cards;