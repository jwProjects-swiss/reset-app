# RESET

Ein Knopf für den Moment, in dem ein Drang kommt. RESET zeigt eine kleine, zufällige Challenge und hilft, die Aufmerksamkeit umzulenken. Kostenlos, ohne Konto, alle Daten bleiben auf dem Gerät.

## Lokal starten

Voraussetzung: [Node.js](https://nodejs.org) ab Version 20.

```bash
npm install
npm run dev
```

Danach die angezeigte Adresse im Browser öffnen (meist http://localhost:5173).

Auf dem Handy testen (gleiches WLAN): `npm run dev -- --host` und die angezeigte Netzwerk-Adresse am Handy öffnen.

Die installierbare Version (mit Offline-Modus) lokal prüfen:

```bash
npm run build
npm run preview
```

## Kostenlos veröffentlichen

**GitHub Pages**

1. Neues Repository auf GitHub anlegen und dieses Projekt hochladen (Branch `main`).
2. Im Repository unter Settings > Pages bei "Source" den Eintrag "GitHub Actions" wählen.
3. Fertig. Der mitgelieferte Workflow (`.github/workflows/deploy.yml`) baut und veröffentlicht bei jedem Push.

**Cloudflare Pages**

1. Repository mit Cloudflare Pages verbinden.
2. Build-Befehl: `npm run build`, Ausgabeordner: `dist`.

Die App nutzt relative Pfade und läuft deshalb in jedem Unterordner.

## Auf dem Handy installieren

- iPhone: Seite in Safari öffnen, Teilen-Symbol, "Zum Home-Bildschirm".
- Android: Seite in Chrome öffnen, Menü, "App installieren".

## Aufbau

```
src/
  data/         Inhalte: Challenges, Kategorien, Achievements, Texte
  lib/          Logik: Speicher, Zustand, Zufallsauswahl, Statistik, Ton/Vibration
  components/   Bausteine: RESET-Ablauf, Timer, Tab-Leiste, Bedienelemente
  screens/      Seiten: Start, Verlauf, Einstellungen, Challenges verwalten/erstellen
  types.ts      Datentypen
```

- Neue Challenge: Eintrag in `src/data/challenges.ts` ergänzen.
- Neues Achievement: Eintrag in `src/data/achievements.ts`.
- Farben und Schriften: oben in `src/index.css`.
- Gespeichert wird im LocalStorage unter `reset.state.v1` (`src/lib/storage.ts`).

## Weitere Befehle

- `npm run build:single` baut die ganze App als eine einzige HTML-Datei (`dist-single/`), praktisch zum Weitergeben.
- `python3 scripts/make-icons.py` erzeugt die App-Icons neu.
