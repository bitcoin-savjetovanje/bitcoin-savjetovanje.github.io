# Bitcoin Savjetovanje — Sales OS setup

Ovo je ručni Google Apps Script setup za izradu Google Sheets CRM templatea.

1. Otvori <https://script.google.com/>.
2. Klikni **New project**.
3. Obriši postojeći sadržaj u editoru.
4. Zalijepi skriptu iz `docs/google-sheets-sales-os-template.gs` u `Code.gs`.
5. Klikni **+** pored Files i odaberi **HTML**.
6. Nazovi HTML file `SalesOsUi`.
7. Zalijepi sadržaj iz `docs/google-sheets-sales-os-ui.html`.
8. Spremi projekt.
9. Pokreni funkciju `createBitcoinSavjetovanjeSalesOS()`.
10. Odobri tražene permissions.
11. Otvori **Executions** ili **Logs** u Apps Scriptu.
12. Otvori generirani spreadsheet URL iz logova.
13. Počni koristiti spreadsheet.

## UI za unos podataka

Nakon što je spreadsheet kreiran, možeš koristiti isti Apps Script projekt kao mali UI za unos:

1. U Apps Scriptu klikni **Deploy**.
2. Odaberi **Test deployments** ili **New deployment**.
3. Kao type odaberi **Web app**.
4. Pokreni web app kao sebe.
5. Otvori web app URL.

UI zapisuje podatke u isti spreadsheet koji je kreirala funkcija `createBitcoinSavjetovanjeSalesOS()`.
Ne šalje poruke, ne automatizira outreach i ne koristi vanjske servise.

Ne treba service account, Google Cloud setup, Sheets API advanced service ni vanjske integracije. Skripta koristi `SpreadsheetApp`.

Primjer redovi u CRM sheetu jasno su označeni kao `Primjer 1`, `Primjer 2` i `Primjer 3`; možeš ih obrisati prije stvarnog rada.
