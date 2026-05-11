# Bitcoin Savjetovanje — Sales OS setup

Ovo je ručni Google Apps Script setup za izradu Google Sheets CRM templatea.

1. Otvori <https://script.google.com/>.
2. Klikni **New project**.
3. Obriši postojeći sadržaj u editoru.
4. Zalijepi skriptu iz `docs/google-sheets-sales-os-template.gs`.
5. Spremi projekt.
6. Pokreni funkciju `createBitcoinSavjetovanjeSalesOS()`.
7. Odobri tražene permissions.
8. Otvori **Executions** ili **Logs** u Apps Scriptu.
9. Otvori generirani spreadsheet URL iz logova.
10. Počni koristiti spreadsheet.

Ne treba service account, Google Cloud setup, Sheets API advanced service ni vanjske integracije. Skripta koristi `SpreadsheetApp`.

Primjer redovi u CRM sheetu jasno su označeni kao `Primjer 1`, `Primjer 2` i `Primjer 3`; možeš ih obrisati prije stvarnog rada.
