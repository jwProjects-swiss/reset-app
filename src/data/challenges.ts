import type { Challenge } from '../types'

/**
 * Alle mitgelieferten Challenges.
 * Neue Challenge hinzufügen: einfach einen Eintrag mit eindeutiger id ergänzen.
 * {n} im Titel wird je nach Intensität durch amounts[leicht, mittel, stark] ersetzt.
 */
export const CHALLENGES: Challenge[] = [
  // Bewegung
  { id: 'b-liegestuetze', category: 'bewegung', title: 'Mache {n} Liegestütze', description: 'Auf den Knien zählt genauso. Hauptsache, du kommst in Bewegung.', amounts: [5, 10, 20], strenuous: true },
  { id: 'b-kniebeugen', category: 'bewegung', title: 'Mache {n} Kniebeugen', description: 'Langsam runter, langsam hoch. Die Fersen bleiben am Boden.', amounts: [8, 15, 25], strenuous: true },
  { id: 'b-hampelmann', category: 'bewegung', title: 'Mache {n} Hampelmänner', description: 'Bring deinen Puls kurz nach oben.', amounts: [10, 20, 40], strenuous: true },
  { id: 'b-plank', category: 'bewegung', title: 'Halte {n} Sekunden den Unterarmstütz', description: 'Körper gerade wie ein Brett, ruhig weiteratmen.', amounts: [15, 30, 60], amountIsSeconds: true, strenuous: true },
  { id: 'b-wandsitz', category: 'bewegung', title: 'Sitze {n} Sekunden an der Wand', description: 'Rücken an die Wand, Knie im rechten Winkel, als sässest du auf einem Stuhl.', amounts: [20, 40, 60], amountIsSeconds: true, strenuous: true },
  { id: 'b-ausfallschritte', category: 'bewegung', title: 'Mache {n} Ausfallschritte pro Seite', description: 'Grosser Schritt nach vorne, hinteres Knie Richtung Boden.', amounts: [5, 8, 12], strenuous: true },
  { id: 'b-spaziergang', category: 'bewegung', title: 'Geh 3 Minuten spazieren', description: 'Vor die Tür, um den Block oder einfach durch die Wohnung.', seconds: 180 },
  { id: 'b-treppe', category: 'bewegung', title: 'Geh {n} Mal eine Treppe hoch und runter', description: 'Keine Treppe in der Nähe? Dann geh einmal durch alle Räume.', amounts: [1, 2, 4] },
  { id: 'b-strecken', category: 'bewegung', title: 'Strecke dich 30 Sekunden', description: 'Arme über den Kopf, mach dich so lang wie möglich.', seconds: 30 },
  { id: 'b-schultern', category: 'bewegung', title: 'Kreise deine Schultern', description: 'Zehnmal nach hinten, zehnmal nach vorne. Schön langsam.' },
  { id: 'b-marschieren', category: 'bewegung', title: 'Marschiere {n} Sekunden auf der Stelle', description: 'Knie hoch, Arme schwingen mit.', amounts: [30, 60, 90], amountIsSeconds: true },
  { id: 'b-einbein', category: 'bewegung', title: 'Steh auf einem Bein', description: '30 Sekunden links, 30 Sekunden rechts. Such dir einen Punkt zum Fixieren.', seconds: 60 },
  { id: 'b-zehenstand', category: 'bewegung', title: 'Geh {n} Mal in den Zehenstand', description: 'Hoch auf die Zehenspitzen, kurz halten, langsam absenken.', amounts: [10, 15, 25] },
  { id: 'b-tanzen', category: 'bewegung', title: 'Tanze zu einem Lied', description: 'Mach ein Lied an, das du magst, und beweg dich, wie es gerade kommt.', seconds: 180 },

  // Achtsamkeit
  { id: 'a-atmen', category: 'achtsamkeit', title: 'Atme 60 Sekunden bewusst', description: 'Ein durch die Nase, aus durch den Mund. Mehr musst du nicht tun.', seconds: 60 },
  { id: 'a-54321', category: 'achtsamkeit', title: 'Mach die 5‑4‑3‑2‑1‑Übung', description: 'Nenne 5 Dinge, die du siehst, 4, die du spürst, 3, die du hörst, 2, die du riechst, und 1, das du schmeckst.' },
  { id: 'a-dankbar', category: 'achtsamkeit', title: 'Nenne 5 Dinge, für die du dankbar bist', description: 'Laut oder leise. Auch Kleinigkeiten zählen.' },
  { id: 'a-augen-zu', category: 'achtsamkeit', title: 'Schliesse die Augen und folge deinem Atem', description: 'Spür, wie sich dein Bauch hebt und senkt. Gedanken dürfen kommen und wieder gehen.', seconds: 90 },
  { id: 'a-welle', category: 'achtsamkeit', title: 'Beobachte den Drang wie eine Welle', description: 'Wo im Körper spürst du ihn? Schau ihm zu, ohne ihm zu folgen. Wellen werden grösser und flachen wieder ab.', seconds: 120 },
  { id: 'a-bodyscan', category: 'achtsamkeit', title: 'Wandere durch deinen Körper', description: 'Von den Füssen bis zum Kopf. Bleib bei jeder Stelle einen Atemzug lang.', seconds: 120 },
  { id: 'a-wasser', category: 'achtsamkeit', title: 'Trinke ein Glas Wasser', description: 'Langsam, Schluck für Schluck. Achte auf die Temperatur.' },
  { id: 'a-fenster', category: 'achtsamkeit', title: 'Schau eine Minute aus dem Fenster', description: 'Such dir etwas, das sich bewegt, und folge ihm mit den Augen.', seconds: 60 },
  { id: 'a-kaltes-wasser', category: 'achtsamkeit', title: 'Lass kaltes Wasser über deine Hände laufen', description: 'Spür 30 Sekunden lang nur die Kälte an Fingern und Handgelenken.', seconds: 30 },
  { id: 'a-gefuehl', category: 'achtsamkeit', title: 'Benenne dein Gefühl in einem Satz', description: 'Zum Beispiel: Ich bin gerade gelangweilt. Oder müde. Oder unruhig. Sag es einmal laut.' },
  { id: 'a-geraeusche', category: 'achtsamkeit', title: 'Zähle die Geräusche um dich herum', description: 'Schliess die Augen. Wie viele verschiedene Geräusche hörst du in einer Minute?', seconds: 60 },

  // Konzentration
  { id: 'k-rueckwaerts', category: 'konzentration', title: 'Zähle von 100 in 7er-Schritten rückwärts', description: '100, 93, 86 … Schau, wie weit du kommst.' },
  { id: 'k-alphabet', category: 'konzentration', title: 'Sag das Alphabet rückwärts auf', description: 'Z, Y, X … Es ist schwieriger, als es klingt.' },
  { id: 'k-hauptstaedte', category: 'konzentration', title: 'Nenne 10 Länder mit ihren Hauptstädten', description: 'Wenn es zu leicht ist: nur Länder ausserhalb Europas.' },
  { id: 'k-farbe', category: 'konzentration', title: 'Finde 10 blaue Dinge um dich herum', description: 'Schau dich um und zähle mit. Danach das Gleiche mit einer zweiten Farbe, wenn du magst.' },
  { id: 'k-rechnen', category: 'konzentration', title: 'Rechne drei Aufgaben im Kopf', description: '17 × 6, dann 144 ÷ 12, dann 23 + 48 + 19.' },
  { id: 'k-merken', category: 'konzentration', title: 'Präge dir 7 Gegenstände ein', description: 'Schau dich um, wähle sieben Dinge, schliess die Augen und zähle sie auf.' },
  { id: 'k-lesen', category: 'konzentration', title: 'Lies 3 Minuten in einem Buch', description: 'Nimm das nächste Buch oder Heft, das du findest. Papier, kein Bildschirm.', seconds: 180 },
  { id: 'k-tiere', category: 'konzentration', title: 'Finde ein Tier zu jedem Buchstaben von A bis J', description: 'Affe, Biber … weiter geht es bei C.' },
  { id: 'k-andere-hand', category: 'konzentration', title: 'Schreibe deinen Namen mit der anderen Hand', description: 'Dreimal untereinander. Wird es jedes Mal etwas besser?' },
  { id: 'k-punkt', category: 'konzentration', title: 'Fixiere 60 Sekunden einen Punkt', description: 'Such dir einen kleinen Punkt an der Wand und bleib mit dem Blick dort.', seconds: 60 },

  // Kreativität
  { id: 'c-zeichnen', category: 'kreativitaet', title: 'Zeichne, was vor dir liegt', description: 'Zwei Minuten, Stift und Papier. Es muss nicht schön werden.', seconds: 120 },
  { id: 'c-vierzeiler', category: 'kreativitaet', title: 'Schreibe einen Vierzeiler', description: 'Über deinen Tag, das Wetter oder das Erste, was du siehst. Reimen ist freiwillig.' },
  { id: 'c-bueroklammer', category: 'kreativitaet', title: 'Erfinde 10 Verwendungen für eine Büroklammer', description: 'Je absurder, desto besser.' },
  { id: 'c-kritzeln', category: 'kreativitaet', title: 'Kritzle eine Minute ohne abzusetzen', description: 'Der Stift bleibt auf dem Papier. Lass die Hand einfach machen.', seconds: 60 },
  { id: 'c-guter-tag', category: 'kreativitaet', title: 'Beschreibe einen guten Tag in einem Jahr', description: 'Drei Sätze reichen. Wo bist du, was tust du, wie fühlt es sich an?' },
  { id: 'c-melodie', category: 'kreativitaet', title: 'Summe eine Melodie, die es noch nicht gibt', description: '30 Sekunden lang. Niemand hört zu.', seconds: 30 },
  { id: 'c-falten', category: 'kreativitaet', title: 'Falte etwas aus einem Blatt Papier', description: 'Ein Flieger, ein Schiff oder etwas, das noch keinen Namen hat.' },
  { id: 'c-geschichte', category: 'kreativitaet', title: 'Erfinde die Geschichte eines Gegenstands', description: 'Nimm etwas in die Hand. Wem hat es früher gehört? Wo war es schon überall?' },
  { id: 'c-brief', category: 'kreativitaet', title: 'Schreibe drei Sätze an dein zukünftiges Ich', description: 'Was soll die Person, die du in einem Monat bist, über heute wissen?' },
  { id: 'c-stillleben', category: 'kreativitaet', title: 'Ordne 5 Gegenstände zu einem Stillleben', description: 'Stell sie so hin, dass es dir gefällt. Schau es dir danach einen Moment an.' },

  // Produktivität
  { id: 'p-aufraeumen', category: 'produktivitaet', title: 'Räume 5 Gegenstände auf', description: 'Fünf Dinge zurück an ihren Platz. Mehr nicht.' },
  { id: 'p-drei-aufgaben', category: 'produktivitaet', title: 'Schreibe deine 3 wichtigsten Aufgaben auf', description: 'Für heute oder morgen. Auf Papier, wenn möglich.' },
  { id: 'p-zwei-minuten', category: 'produktivitaet', title: 'Erledige eine Zwei-Minuten-Aufgabe', description: 'Etwas, das du schon länger vor dir herschiebst und das schnell getan ist.', seconds: 120 },
  { id: 'p-tisch', category: 'produktivitaet', title: 'Räume deinen Tisch frei', description: 'Oder mach dein Bett. Eine Fläche, die danach ordentlich ist.' },
  { id: 'p-abwasch', category: 'produktivitaet', title: 'Spüle 5 Teile ab', description: 'Oder räum fünf Teile in die Spülmaschine.' },
  { id: 'p-fuenf-minuten', category: 'produktivitaet', title: 'Fang 5 Minuten mit dem an, was du aufschiebst', description: 'Nur fünf Minuten. Danach darfst du aufhören.', seconds: 300 },
  { id: 'p-lueften', category: 'produktivitaet', title: 'Lüfte den Raum', description: 'Fenster ganz auf, zwei Minuten frische Luft. Bleib ruhig am Fenster stehen.', seconds: 120 },
  { id: 'p-nachricht', category: 'produktivitaet', title: 'Beantworte eine Nachricht, die wartet', description: 'Eine einzige. Danach legst du das Gerät wieder weg.' },
  { id: 'p-muell', category: 'produktivitaet', title: 'Bring den Müll raus', description: 'Oder das Altpapier. Ein kurzer Gang an die frische Luft inklusive.' },
  { id: 'p-flasche', category: 'produktivitaet', title: 'Fülle deine Wasserflasche auf', description: 'Stell sie dorthin, wo du sie den Rest des Tages siehst.' },
  { id: 'p-kleider', category: 'produktivitaet', title: 'Lege deine Kleider für morgen bereit', description: 'Eine Entscheidung weniger für dein morgiges Ich.' },

  // Entspannung
  { id: 'e-handy-weg', category: 'entspannung', title: 'Lege dein Smartphone 2 Minuten weg', description: 'Starte den Timer, leg es mit dem Display nach unten hin und geh einen Schritt weg.', seconds: 120 },
  { id: 'e-478', category: 'entspannung', title: 'Atme vier Runden im 4-7-8-Rhythmus', description: '4 Sekunden einatmen, 7 Sekunden halten, 8 Sekunden ausatmen.' },
  { id: 'e-faeuste', category: 'entspannung', title: 'Spanne deine Fäuste an und lass los', description: 'Fünf Sekunden fest anspannen, dann lösen. Wiederhole es eine Minute lang.', seconds: 60 },
  { id: 'e-nacken', category: 'entspannung', title: 'Dehne sanft deinen Nacken', description: 'Kopf langsam zur einen Seite neigen, halten, dann zur anderen. Ohne Druck.', seconds: 60 },
  { id: 'e-hinlegen', category: 'entspannung', title: 'Leg dich 3 Minuten hin', description: 'Augen zu, Hände auf den Bauch. Du musst nichts tun.', seconds: 180 },
  { id: 'e-gesicht', category: 'entspannung', title: 'Wasche dein Gesicht mit kaltem Wasser', description: 'Drei Hände voll. Trockne dich danach in Ruhe ab.' },
  { id: 'e-tee', category: 'entspannung', title: 'Mach dir etwas Warmes zu trinken', description: 'Tee, Kaffee oder heisses Wasser. Bleib dabei, während das Wasser kocht.' },
  { id: 'e-box', category: 'entspannung', title: 'Atme zwei Minuten im Quadrat', description: '4 Sekunden ein, 4 halten, 4 aus, 4 halten. Und wieder von vorne.', seconds: 120 },
  { id: 'e-schultern-fallen', category: 'entspannung', title: 'Zieh die Schultern hoch und lass sie fallen', description: 'Fünfmal. Beim Fallenlassen kräftig ausatmen.' },
  { id: 'e-augen-waermen', category: 'entspannung', title: 'Wärme deine Augen', description: 'Reib die Handflächen aneinander, bis sie warm sind, und leg sie 30 Sekunden auf die geschlossenen Augen.', seconds: 30 },
  { id: 'e-lied', category: 'entspannung', title: 'Höre ein Lied mit geschlossenen Augen', description: 'Ein ruhiges Lieblingslied. Hör nur zu, sonst nichts.', seconds: 180 },
]

/** Wird angeboten, wenn durch die Einstellungen keine Challenge mehr übrig bleibt. */
export const FALLBACK_CHALLENGE: Challenge = CHALLENGES.find((c) => c.id === 'a-atmen')!
