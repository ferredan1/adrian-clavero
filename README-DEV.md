# Guía de Desarrollo - Visual Studio Code

## 🚀 Iniciar el Servidor de Desarrollo

### Opción 1: Terminal Integrada de VS Code (Recomendado)

1. Abre Visual Studio Code en la carpeta del proyecto
2. Presiona `Ctrl + Ñ` (o `Ctrl + J`) para abrir la terminal integrada
3. Ejecuta:
   ```bash
   npm run dev
   ```
4. El servidor se mantendrá corriendo mientras VS Code esté abierto

### Opción 2: Usar la Tarea Predefinida

1. Presiona `Ctrl + Shift + P` para abrir la paleta de comandos
2. Escribe: `Tasks: Run Task`
3. Selecciona: `Next.js: Dev Server`
4. El servidor se iniciará en una terminal nueva

### Opción 3: Debug (con breakpoints)

1. Ve a la pestaña "Run and Debug" (icono de play con bug)
2. Selecciona "Next.js: Debug Server"
3. Presiona F5 o el botón de play
4. El servidor iniciará y se abrirá automáticamente en el navegador

## 📝 Notas Importantes

- **El servidor se mantiene corriendo** mientras VS Code esté abierto
- Si cierras VS Code, el servidor se detendrá
- Para detener el servidor manualmente, presiona `Ctrl + C` en la terminal
- El servidor se recarga automáticamente cuando guardas cambios en los archivos

## 🌐 Acceder al Sitio

Una vez que el servidor esté corriendo, abre tu navegador en:
```
http://localhost:3000
```

## 🔧 Solución de Problemas

### El servidor no inicia
1. Verifica que Node.js esté instalado: `node --version`
2. Instala las dependencias: `npm install`
3. Verifica que el puerto 3000 esté libre

### El servidor se detiene
- Asegúrate de no cerrar la terminal donde está corriendo
- Si se cierra, simplemente ejecuta `npm run dev` nuevamente

### Cambios no se reflejan
- Guarda el archivo (Ctrl + S)
- El servidor debería recargar automáticamente
- Si no, recarga la página en el navegador (F5)

