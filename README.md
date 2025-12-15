🛍️ Shop Credits App

Aplicación web desarrollada en React que simula un sistema de canje de créditos por productos, con seguimiento de pedidos y recuperación de créditos mediante reseñas.

👉 Deploy: https://shop-credits-app-j6sl.vercel.app/

⸻

🚀 Tecnologías utilizadas
	•	React + Vite
	•	React Router DOM – navegación
	•	Context API – estado global
	•	Styled-components – estilos
	•	React Toastify – notificaciones
	•	React Helmet Async – SEO y metadata dinámica
	•	React Icons
	•	Bootstrap – base de estilos

⸻

📦 Funcionalidades principales

🛒 Productos
	•	Listado dinámico de productos desde API
	•	Canje de productos usando créditos
	•	Notificación (toast) al agregar productos al carrito
	•	SEO dinámico por página con Helmet

🧺 Carrito
	•	Visualización de productos seleccionados
	•	Eliminación de productos del carrito
	•	Cálculo automático de créditos consumidos

📦 Checkout
	•	Formulario de datos de envío
	•	Confirmación del pedido
	•	Generación de pedido activo

📍 Pedidos
	•	Visualización del pedido activo
	•	Timeline de estados:
	•	Confirmado
	•	En camino
	•	Reseña
	•	Estado vacío centrado cuando no hay pedidos activos
	•	Acceso a la reseña cuando el pedido finaliza

⭐ Reseñas
	•	Evaluación de productos
	•	Recuperación de créditos
	•	Estado vacío centrado cuando no hay créditos a recuperar

⸻

🔔 Notificaciones
	•	Toast al agregar productos al carrito
	•	Toast de error al fallar la carga de datos

⸻

🧠 Buenas prácticas aplicadas
	•	Componentes reutilizables
	•	Manejo de estado global con Context API
	•	Styled-components con props transitorias ($prop)
	•	Separación clara entre páginas y componentes
	•	Manejo explícito de empty states
	•	SEO dinámico por vista

⸻

▶️ Cómo ejecutar el proyecto
	1.	Instalar dependencias:

npm install


	2.	Ejecutar en entorno de desarrollo:

npm run dev


	3.	Abrir en el navegador:

http://localhost:5173



⸻

📌 Notas

Este proyecto forma parte de un entregable académico, priorizando:
	•	Buenas prácticas
	•	Claridad de código
	•	Experiencia de usuario

⸻

👨‍💻 Autor

Desarrollado con ❤️ usando React.
