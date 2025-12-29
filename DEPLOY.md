# 🚀 Guía de Despliegue - Hacer el Sitio Público

## Opción 1: Vercel (RECOMENDADO) ⭐

Vercel es la plataforma creada por los mismos desarrolladores de Next.js. Es la opción más fácil y rápida.

### Pasos para desplegar en Vercel:

1. **Crear cuenta en Vercel**
   - Ve a: https://vercel.com
   - Regístrate con GitHub, GitLab o email

2. **Preparar el proyecto para Git**
   ```bash
   # En la terminal de VS Code, ejecuta:
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Subir a GitHub** (si no tienes cuenta, créala en github.com)
   - Crea un nuevo repositorio en GitHub
   - Sigue las instrucciones para subir tu código:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

4. **Conectar con Vercel**
   - En Vercel, haz clic en "Add New Project"
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente que es Next.js
   - Haz clic en "Deploy"

5. **¡Listo!**
   - En 2-3 minutos tendrás tu sitio en línea
   - URL tipo: `tu-proyecto.vercel.app`
   - Puedes agregar tu dominio personalizado después

### Ventajas de Vercel:
- ✅ Gratis para proyectos personales
- ✅ Despliegue automático al hacer cambios
- ✅ SSL/HTTPS incluido
- ✅ Optimizado para Next.js
- ✅ CDN global (sitio rápido en todo el mundo)
- ✅ Dominio personalizado gratis

---

## Opción 2: Netlify

Similar a Vercel, también muy fácil.

### Pasos:
1. Ve a: https://netlify.com
2. Arrastra y suelta la carpeta del proyecto (o conecta con GitHub)
3. Netlify detectará Next.js automáticamente
4. ¡Listo!

---

## Opción 3: Servidor propio (VPS)

Si tienes un servidor propio, puedes:

1. **Construir el proyecto:**
   ```bash
   npm run build
   ```

2. **Iniciar el servidor de producción:**
   ```bash
   npm start
   ```

3. **Configurar un proxy reverso** (nginx, Apache, etc.)

---

## 📋 Checklist antes de desplegar:

- [ ] Verificar que `npm run build` funciona sin errores
- [ ] Revisar que todas las imágenes estén en `public/`
- [ ] Verificar que las URLs en `sitemap.ts` y `robots.ts` sean correctas
- [ ] Probar el sitio en modo producción localmente:
  ```bash
  npm run build
  npm start
  ```

---

## 🔧 Configuración del dominio personalizado

Una vez desplegado, puedes agregar tu dominio:

1. En Vercel/Netlify, ve a "Settings" → "Domains"
2. Agrega tu dominio (ej: `adrianclavero.com`)
3. Sigue las instrucciones para configurar los DNS
4. Espera a que se propague (puede tardar hasta 24 horas)

---

## 📊 Monitoreo y Analytics

Ya tienes Vercel Analytics configurado. Una vez desplegado, podrás ver:
- Visitantes
- Páginas más visitadas
- Rendimiento del sitio

---

## 🆘 Solución de problemas

### Error al hacer build:
```bash
npm run build
```
Si hay errores, corrígelos antes de desplegar.

### El sitio no carga:
- Verifica que el build fue exitoso
- Revisa los logs en Vercel/Netlify
- Asegúrate de que todas las dependencias estén en `package.json`

### Imágenes no aparecen:
- Verifica que las imágenes estén en `public/`
- Usa rutas relativas: `/imagen.jpg` (no `./imagen.jpg`)

---

¿Necesitas ayuda con algún paso específico? ¡Avísame!

