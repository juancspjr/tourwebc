# Guia Completa de Deployment - Rio Trip Vibes

## Opciones de Hosting (De Mas Facil a Mas Avanzado)

---

## OPCION 1: REPLIT (Recomendado - Ya Estas Aqui)

### Precio: Desde $0 hasta ~$7/mes

**Ventajas:**
- Ya tienes todo configurado
- Un solo click para publicar
- SSL incluido gratis
- Base de datos incluida

### Pasos:

1. **Click en el boton "Deploy"** en la esquina superior derecha de Replit
2. Selecciona **"Autoscale"** para sitios web
3. Confirma el deployment

### Costos Replit:
| Plan | Precio | Creditos Incluidos |
|------|--------|-------------------|
| Free | $0 | Limitado |
| Core | $25/mes | $25 creditos |
| Autoscale | ~$1-7/mes | Pago por uso |

**Calculo aproximado para tu sitio:**
- Base: $1/mes
- Compute: ~$2-5/mes (depende del trafico)
- **Total: ~$3-7/mes**

---

## OPCION 2: RAILWAY (Muy Facil - $5/mes)

### Precio: $5/mes (creditos incluidos)

**Ventajas:**
- Deploy automatico desde GitHub
- Base de datos PostgreSQL incluida
- SSL gratis
- No necesitas saber de servidores

### Pasos de Instalacion:

```bash
# 1. Primero, sube tu codigo a GitHub
# En tu terminal local:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/rio-trip-vibes.git
git push -u origin main
```

2. **Ve a [railway.app](https://railway.app)**

3. **Crea cuenta con GitHub**

4. **Click "New Project" > "Deploy from GitHub repo"**

5. **Selecciona tu repositorio**

6. **Configura las variables de entorno:**
   ```
   NODE_ENV=production
   DATABASE_URL=(Railway te da una automaticamente)
   ```

7. **Railway detecta que es Node.js y hace deploy automatico**

### Archivo necesario - railway.json:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100
  }
}
```

---

## OPCION 3: RENDER (Gratis con limitaciones)

### Precio: GRATIS (con spin-down) o $7/mes (siempre activo)

**Ventajas:**
- Tier gratis disponible
- Deploy desde GitHub
- SSL gratis

**Desventajas del tier gratis:**
- Se apaga despues de 15 min sin trafico
- Tarda ~50 segundos en despertar

### Pasos:

1. **Ve a [render.com](https://render.com)**

2. **Crea cuenta con GitHub**

3. **New > Web Service**

4. **Conecta tu repositorio**

5. **Configura:**
   ```
   Name: rio-trip-vibes
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm run start
   ```

6. **Variables de entorno:**
   ```
   NODE_ENV=production
   ```

### Archivo necesario - render.yaml:
```yaml
services:
  - type: web
    name: rio-trip-vibes
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm run start
    envVars:
      - key: NODE_ENV
        value: production
```

---

## OPCION 4: DIGITALOCEAN (Mas Control - $4-6/mes)

### Precio: $4-6/mes

**Ventajas:**
- Control total del servidor
- Muy confiable
- $200 creditos gratis para nuevos usuarios

### Pasos Detallados:

#### 1. Crear Droplet

1. Ve a [digitalocean.com](https://digitalocean.com)
2. Registrate (obtendras $200 en creditos gratis)
3. Create > Droplets
4. Selecciona:
   - **Image:** Ubuntu 22.04
   - **Plan:** Basic $4/mes (1 GB RAM)
   - **Region:** New York o el mas cercano a tus usuarios
   - **Authentication:** SSH Key (recomendado) o Password

#### 2. Conectar al Servidor

```bash
# Conectar via SSH
ssh root@TU_IP_DEL_SERVIDOR

# Actualizar sistema
apt update && apt upgrade -y
```

#### 3. Instalar Node.js

```bash
# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Verificar instalacion
node --version
npm --version
```

#### 4. Instalar PM2 (Gestor de Procesos)

```bash
npm install -g pm2
```

#### 5. Clonar y Configurar tu Proyecto

```bash
# Instalar git
apt install -y git

# Clonar tu proyecto
cd /var/www
git clone https://github.com/TU_USUARIO/rio-trip-vibes.git
cd rio-trip-vibes

# Instalar dependencias
npm install

# Construir para produccion
npm run build
```

#### 6. Configurar Variables de Entorno

```bash
# Crear archivo .env
nano .env

# Agregar:
NODE_ENV=production
DATABASE_URL=tu_url_de_base_de_datos
PORT=5000
```

#### 7. Iniciar con PM2

```bash
# Iniciar aplicacion
pm2 start npm --name "rio-trip-vibes" -- run start

# Guardar configuracion para reinicio automatico
pm2 startup
pm2 save

# Ver logs
pm2 logs
```

#### 8. Instalar y Configurar Nginx

```bash
# Instalar Nginx
apt install -y nginx

# Crear configuracion
nano /etc/nginx/sites-available/rio-trip-vibes
```

Contenido del archivo:
```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar sitio
ln -s /etc/nginx/sites-available/rio-trip-vibes /etc/nginx/sites-enabled/

# Verificar configuracion
nginx -t

# Reiniciar Nginx
systemctl restart nginx
```

#### 9. Configurar SSL Gratis con Let's Encrypt

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Renovacion automatica (ya esta configurada)
certbot renew --dry-run
```

#### 10. Configurar Firewall

```bash
# Permitir SSH, HTTP y HTTPS
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

---

## OPCION 5: FLY.IO (Tier Gratis Generoso)

### Precio: GRATIS (hasta 3 VMs pequenas)

### Pasos:

```bash
# 1. Instalar Fly CLI
curl -L https://fly.io/install.sh | sh

# 2. Login
fly auth login

# 3. Crear app
fly launch

# 4. Configurar fly.toml (se crea automaticamente)

# 5. Deploy
fly deploy
```

### Archivo fly.toml:
```toml
app = "rio-trip-vibes"
primary_region = "mia"

[build]
  [build.args]
    NODE_VERSION = "20"

[http_service]
  internal_port = 5000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

---

## COMPARATIVA FINAL

| Opcion | Precio/mes | Dificultad | Siempre Activo | SSL Gratis |
|--------|------------|------------|----------------|------------|
| **Replit** | $3-7 | Muy Facil | Si | Si |
| **Railway** | $5 | Facil | Si | Si |
| **Render Free** | $0 | Facil | No (spin-down) | Si |
| **Render Paid** | $7 | Facil | Si | Si |
| **DigitalOcean** | $4-6 | Intermedio | Si | Si |
| **Fly.io** | $0-5 | Intermedio | Si | Si |

---

## MI RECOMENDACION

### Para Empezar (Mas Facil):
1. **Replit Deploy** - Ya lo tienes configurado, solo click en Deploy

### Opcion Economica Confiable:
2. **Railway $5/mes** - Muy facil, profesional, sin complicaciones

### Opcion Gratuita:
3. **Fly.io** - Gratis y no tiene spin-down como Render

### Maximo Control:
4. **DigitalOcean $4/mes** - Requiere mas conocimiento pero tienes control total

---

## DOMINIO PERSONALIZADO

Para tener tu propio dominio (ej: riotripvibes.com):

1. **Comprar dominio** (~$10-15/ano):
   - [Namecheap](https://namecheap.com) - Economico
   - [Cloudflare](https://cloudflare.com) - Sin markup
   - [Google Domains](https://domains.google) - Facil

2. **Configurar DNS** apuntando a tu servidor

3. **Configurar SSL** (gratis con Let's Encrypt o Cloudflare)

---

## CHECKLIST PRE-DEPLOYMENT

- [ ] Variables de entorno configuradas
- [ ] npm run build funciona sin errores
- [ ] npm run start funciona correctamente
- [ ] Base de datos configurada (si aplica)
- [ ] Dominio comprado (opcional)
- [ ] SSL configurado

---

## COMANDOS UTILES

```bash
# Ver logs en PM2
pm2 logs

# Reiniciar aplicacion
pm2 restart rio-trip-vibes

# Ver estado
pm2 status

# Actualizar codigo
cd /var/www/rio-trip-vibes
git pull
npm install
npm run build
pm2 restart rio-trip-vibes
```
