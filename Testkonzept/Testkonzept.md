# Testkonzept: Huntly

## 1. Einleitung & Zielsetzung
Dieses Dokument beschreibt das manuelle Testverfahren für die Huntly-App. Ziel ist es, die korrekte Funktion der nativen Capacitor-Schnittstellen (Kamera, Standort, Sensorik) sowie die Logik des Belohnungssystems (Schnitzel/Kartoffeln) auf einem physischen Mobilgerät sicherzustellen.

---

## 2. Testumgebung
* **Hardware:** Physisches Smartphone (Android oder iOS)
* **Software:** Installierte App mit Capacitor.
* **Setup:** Kann im Readme angeschaut werden.
* **Voraussetzungen:** Aktive Internetverbindung, GPS aktiviert, Kamera funktionsfähig.

---

## 3. Funktionale Testfälle (Manual Testing)

### 3.1 Setup & Initialisierung
| ID        | Testfall | Prozess | Erwartetes Ergebnis                                                        |
|:----------| :--- | :--- |:---------------------------------------------------------------------------|
| **TC-01** | Namensprüfung | Start ohne Namenseingabe versuchen. | Schnitzeljagd starten kann nicht gedrückt werden; Start wird blockiert.    |
| **TC-02** | Spielstart | Namen eingeben und Start bestätigen. | Navigation zur ersten Aufgabe erfolgt.         
| **TC-03** | Berechtigungsflow | App zum ersten Mal starten. | System-Dialoge für Kamera & Standort erscheinen in Berechtigungspage.   | 
| **TC-04** | Permission-Lock | Berechtigungen ablehnen. | Schnitzeljagd startet nicht, solange Rechte fehlen.                        
### 3.2 Kern-Aufgaben (Native Funktionen)
| ID | Aufgabe            | Test-Aktion                                                            | Erwartetes Ergebnis                        |
| :--- |:-------------------|:-----------------------------------------------------------------------|:-------------------------------------------|
| **TC-05** | **Geolocation !!** | Zum Zielstandort bewegen.                                              | Erreichen des Umkreises wird erkannt.      |
| **TC-06** | **Schrittzahl**    | 15 Schritte gehen (TIPP: Handy schütteln um Testergebnis zu erreichen) | Zähler reagiert korrekt.                   |
| **TC-07** | **QR-Code !!**     | Falschen & richtigen QR-Code scannen.                                  | Nur der korrekte Inhalt löst die Aufgabe.  |
| **TC-08** | **WLAN**           | WLAN im Control Center aus/einschalten.                                | Statusänderung wird in Echtzeit erkannt.   |

### 3.3 Gameplay-Logik & Navigation
| ID | Testfall | Prozess | Erwartetes Ergebnis                                                             |
| :--- | :--- | :--- |:--------------------------------------------------------------------------------|
| **TC-09** | Haptik-Check | Aufgabe erfolgreich beenden. | Gerät vibriert kurz (Haptisches Feedback).                                      |
| **TC-10** | Skip-Funktion | Aufgabe überspringen wählen. | Nächste Aufgabe erscheint; keine Schnitzel-Punkte. + Kartoffel-Punkt            |
| **TC-11** | Abbruch-Logik | "Abbrechen" während einer Aufgabe klicken. | Navigation zurück zum Home; Kartoffel- und Schnitzelcounter wird zurückgesetzt. |

---

## 4. Test der Ergebnis-Logik (Punkte & Persistenz)

| ID        | Szenario | Erwartetes Ergebnis |
|:----------| :--- | :--- |
| **TC-12** | **Schnitzel-Logik** | Aufgabe innerhalb des Zeitlimits gelöst. | +1 Schnitzel (🥩). |
| **TC-13** | **Kartoffel-Logik** | Aufgabe gelöst, nachdem der Timer abgelaufen ist. | +1 Schnitzel UND +1 Kartoffel (🥔). |
| **TC-14** | **Reiner Zeit-Skip** | Timer abgelaufen, Aufgabe aber übersprungen. | Nur +1 Kartoffel |
| **TC-15** | **Zeitmessung** | Jagd abgeschlossen. | Zeit wird korrekt formatiert (mm:ss) gespeichert. |

---

## 5. Backend- & Schnittstellentests

| ID | Testfall | Erwartetes Ergebnis |
| :--- | :--- | :--- |
| **TC-16** | Google Forms API | Jagd beenden und Leaderboard prüfen. | Daten werden per `fetch` (POST) erfolgreich gesendet. |
| **TC-17** | Lokale History | App komplett schließen und neu öffnen. | Letzte 10 Durchführungen sind im Verlauf sichtbar. |

---

## 6. Nicht-funktionale Kriterien (UI/UX)

* [ ] **UI-Performance:** Kein Flackern beim Wechsel der Aufgaben.
* [ ] **Standard-Komponenten:** Sichtbare Verwendung von `ion-card`, `ion-button`, `ion-spinner`.
* [ ] **Design:** Texte sind auf kleinen Displays lesbar; Icons sind einheitlich.
* [ ] **Clean Code:** Code-Struktur folgt Angular-Best-Practices (Separation of Concerns).

---

## 7. Fehlerprotokoll (Muster)
| Datum | Test-ID | Status (Pass/Fail) | Bemerkung / Fehlermeldung |
| :--- | :--- | :--- | :--- |
| | | | |
