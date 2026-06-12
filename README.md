# Cashi Mobile App

Vídeo Demostrativo: https://www.youtube.com/watch?v=1rCccu-jbSA

Aplicación de gestor de finanzas personales Cashi hecha con:

- Node
- React Native
- TypeScript
- Expo & Expo Router
- Zod
- SecureStore
- Expo Image Picker
- Expo Location

Backend (API REST):

- Node.js
- Hono
- TypeScript
- Prisma ORM
- Zod
- JWT Auth
- bcrypt

Características:

- Register/Login conectados al Backend, con token y persistencia.
- Creación, edición y eliminación de transacciones y categorías.
- Sistema de adjuntar imagen y cálculo de coordenadas GPS.
- Integración con API REST desplegada en Render.

Instrucciones:

- Dirigirse al directorio *cd (Directorio)*
- Ejecutar *npx expo install*
- Ejecutar *npx expo start*
- Comprobar funcionamiento desde Expo
- Registrar usuario con *correo* y *contraseña* o realizar *login*.
- Comprobar funcionamiento de *Transacciones*, *Categorías* y *Balance*.

Uso de IA:

> Mediante *ChatGPT* me encargué de solucionar múltiples errores que me iban saltando al momento de alinear el Frontend con el Backend. Tuve múltiples errores que me llevaron a revisar múltiples veces el código con la IA debido a errores de servidor, respuestas JSON que rompían el sistema y demás.