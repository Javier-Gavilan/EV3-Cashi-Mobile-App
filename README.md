# Cashi Mobile App

Vídeo Demostrativo:
> OBS me dejó de funcionar y me lanza varios errores, así que no he podido grabar la explicación del código y no tengo otro programa de confianza para realizar la grabación. Solo se me ha ocurrido dejar la explicación general del funcionamiento. Lamento las molestias.

Aplicación de gestor de finanzas personales Cashi hecha con:

- Node
- React Native
- TypeScript
- Expo & Expo Router
- AsyncStorage
- Zod
- SafeAreaView
- Expo Image Picker
- Expo Location

Explicación general:
- El modelo de datos de las transacciones en *transaction.types.ts* fue ampliado para poder almacenar fotografías de comprobantes y una ubicación geográfica asociada. Para ello, aparte de los *types*, se modificaron los *hooks* y *storage* relacionados a las transacciones para permitir que se almacenen los nuevos datos y se recuperen con el resto de información mediante el *AsyncStorage*.
- Posteriormente se implementaron los hooks *useImagePicker* y *useLocation* para gestionar el acceso a la cámara, galería y GPS del dispositivo, así como la validación de los permisos necesarios. De esta forma, las pantallas únicamente muestran la información y ejecutan acciones, mientras que la lógica para acceder al hardware y persistencia de datos permanece separada en sus respectivas secciones de la aplicación.

Características:

- Login mediante credenciales predeterminadas con validación.
- Gestión completa de categorías y transacciones con persistencia de datos mediante AsyncStorage.
- Cálculo automático de ingresos, egresos y balance.
- Captura de fotografías meidnate cámara o selección desde la galería.
- Registro de ubicación GPS para cada transacción con sus respectivos permisos.

Instrucciones:

- Dirigirse al directorio *cd (Directorio)*
- Ejecutar *npx expo install*
- Ejecutar *npx expo start*
- Comprobar funcionamiento desde Expo
- Ingresar con *usuario@correo.com* y *1234* y comprobar el funcionamiento de los botones.

Uso de IA:

> Mediante *ChatGPT* me encargué de solucionar varios errores que iban surgiendo mientras modificaba los archivos ya existentes de código, sobretodo en *transaction/[id].tsx* en el que tuve unos cuantos inconvenientes por la implementación de nuevo código de por medio, así como la solución de problemas antiguos como que no implementé correctamente el SafeAreaView y la pantalla de edición/detalles quedaba bloqueada.