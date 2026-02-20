<h1 align="center">Mantris | Gestor de Finanzas Multidivisa</h1>

<p align="center">
  <strong>La solución definitiva a la fragmentación económica en Venezuela.</strong><br />
  Controla tus finanzas en VES, BCV, USDT y EUR desde un solo lugar.
</p>

<p align="center">
  <a href="https://mantris.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Ver_Demo_En_Vivo-brightgreen?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-En%20Desarrollo-green?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

---

## 📌 Descripción del Proyecto

**Mantris** nace para resolver un problema crítico en la economía venezolana: la **fragmentación del dinero**. Debido a la convivencia de múltiples tasas de cambio y monedas, llevar un control del patrimonio neto real es una tarea compleja.

Esta aplicación permite centralizar cuentas en diferentes divisas, aplicando conversiones automáticas según las tasas del día para ofrecer una visión clara y unificada del capital disponible. Además, implementa la metodología de **Presupuesto Base Cero** para garantizar que cada centavo tenga un propósito.

---

## ✨ Funcionalidades Clave

- 💱 **Gestión Multidivisa:** Soporte nativo para Bolívares (VES), Tasa BCV, Dólar paralelo (USDT) y Euros (EUR).
- 📉 **Presupuesto Base Cero:** Asignación inteligente de fondos en categorías de Gastos Fijos, Variables, Ahorros y Extras.
- 📊 **Tasas en Tiempo Real:** Visualización y actualización de las tasas de cambio más utilizadas en el mercado nacional.
- 💸 **Registro de Flujos:** Control detallado de ingresos y egresos vinculados a cuentas específicas.
- 📱 **Diseño Mobile-First:** Interfaz optimizada para el uso diario desde dispositivos móviles.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Frontend** | React.js |
| **Backend** | NestJS |
| **Base de Datos** | PostgreSQL |
| **ORM** | TypeORM |
| **Despliegue** | Vercel (Frontend) |

---

## 🚀 Instalación y Uso

El proyecto está dividido en dos repositorios (Frontend y Backend). Sigue estos pasos para correrlo localmente:

```bash
# Clonar el repositorio
git clone https://github.com/rochan0304/mantris-client

# Instalar dependencias
npm install

#Configurar variables de entorno (.env)
# VITE_BASE_URL

# Iniciar en modo desarrollo
npm run dev 
