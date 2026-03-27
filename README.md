# 📱 Pragma ToDo App

## 🧾 Descripción del proyecto

Aplicación móvil desarrollada con Ionic + Angular que permite la gestión de tareas con funcionalidades de creación, edición, eliminación y categorización.

La aplicación sigue buenas prácticas de desarrollo como arquitectura modular, programación reactiva y principios SOLID.

---

## ⚙️ Tecnologías utilizadas

- Ionic + Angular (Standalone Components)
- TypeScript
- RxJS
- Capacitor
- Android (APK)
- iOS (Build en CI con Codemagic)
- Git (GitFlow básico)

---

## 🚀 Ejecución del proyecto

```bash
npm install
ionic serve
```

## 📱 Build Android

Para generar el APK:

```bash
ionic build
npx cap sync android
npx cap open android
```

Luego desde Android Studio:

Build → Build APK

## 🍏 Build iOS

La aplicación fue configurada para compilar en iOS utilizando Codemagic (entorno macOS en la nube).

Se implementó un pipeline de CI/CD que:

- Genera la plataforma iOS dinámicamente
- Compila la aplicación
- Genera artefactos de build

## ⚠️ Nota sobre el archivo IPA

La generación de un archivo .ipa instalable requiere:

- Cuenta activa de Apple Developer
- Certificados de firma
- Provisioning profiles

Debido a estas restricciones externas, se generó un build para simulador (.app) como evidencia de compilación exitosa.

El proyecto queda completamente configurado para generar un .ipa en caso de contar con las credenciales necesarias.

## 🧠 Enfoque técnico

Durante el desarrollo se priorizó:

- Separación de responsabilidades
- Manejo reactivo del estado con RxJS
- Optimización de renderizado (trackBy)
- Escalabilidad del código
- Buenas prácticas de versionamiento

## 🔀 Estrategia de ramas

Se utilizó una estrategia basada en feature branches:

- main: rama principal
- feature/*: desarrollo de funcionalidades

Ejemplo:

- feature/tasks
- feature/categories

## 📦 Entregables
- Código fuente en repositorio Git
- APK funcional
- Pipeline CI/CD para iOS (Codemagic)
- Artefactos de build iOS