# 🔄 Flujo de Trabajo - Actualizar el Sitio

## ¿Cómo funcionan los cambios automáticos?

### ✅ Sí, los cambios se despliegan automáticamente, PERO necesitas hacer 3 pasos:

1. **Hacer cambios en tu código** (en VS Code)
2. **Subir los cambios a GitHub** (con Git)
3. **Vercel detecta los cambios y despliega automáticamente**

---

## 📝 Proceso Completo Paso a Paso

### 1. Hacer cambios en VS Code
- Edita cualquier archivo
- Guarda los cambios (Ctrl + S)

### 2. Subir cambios a GitHub

En la terminal de VS Code, ejecuta estos comandos:

```bash
# Ver qué archivos cambiaron
git status

# Agregar todos los cambios
git add .

# Crear un "commit" (guardar los cambios con un mensaje)
git commit -m "Descripción de los cambios que hiciste"

# Subir a GitHub
git push
```

### 3. Vercel despliega automáticamente
- Vercel detecta el cambio en GitHub (en 10-30 segundos)
- Inicia el proceso de build automáticamente
- En 2-3 minutos, tu sitio estará actualizado con los cambios

---

## 🎯 Ejemplo Práctico

Imagina que quieres cambiar el teléfono en el sitio:

1. **Editas el archivo** `app/page.tsx` y cambias el número
2. **Guardas** el archivo
3. **En la terminal:**
   ```bash
   git add .
   git commit -m "Actualizar número de teléfono"
   git push
   ```
4. **Esperas 2-3 minutos** y tu sitio estará actualizado

---

## ⚡ Atajos Útiles

### Ver qué cambió antes de subir:
```bash
git status
```

### Ver los cambios específicos:
```bash
git diff
```

### Subir cambios rápidamente (todo en uno):
```bash
git add . && git commit -m "Descripción" && git push
```

---

## 🔔 Notificaciones de Vercel

Vercel te enviará un email cuando:
- ✅ El despliegue sea exitoso
- ❌ Haya algún error en el build

También puedes ver el estado en el dashboard de Vercel.

---

## 💡 Consejos

- **Haz commits frecuentes** con mensajes descriptivos
- **Revisa el build en Vercel** si algo falla
- **Prueba localmente primero** con `npm run dev` antes de subir

---

## 🆘 Si algo falla

1. Revisa los logs en Vercel
2. Verifica que `npm run build` funcione localmente
3. Revisa que no haya errores de sintaxis

---

¿Quieres que te muestre cómo hacer un cambio de prueba?

