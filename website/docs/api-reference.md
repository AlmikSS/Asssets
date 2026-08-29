---
title: Справка API
sidebar_position: 6
---

# Справка API

API генерируется Doxygen из публичных типов C# в `Assets/_KofeyekToolkit/_Scripts`. Из него намеренно исключены Unity packages и TextMesh Pro.

Это общая техническая справка: она публикуется в одном, английском языке для обеих локалей. Откройте [сгенерированный API KofeyekToolkit](/Asssets/api/index.html), чтобы просмотреть пространства имён, типы, члены и XML-документацию.

> **Для локального запуска документации используйте именно `npm run docs:start` из каталога `website/`.** Не запускайте `docusaurus start` напрямую: скрипт `docs:start` сначала генерирует и проверяет API.

Чтобы обновить только API, запустите `npm run docs:api`. Скрипты `docs:start`, `docs:build` и `docs:check` также генерируют и проверяют его автоматически.
