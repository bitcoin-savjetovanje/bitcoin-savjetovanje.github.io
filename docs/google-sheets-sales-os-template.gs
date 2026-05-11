/**
 * Creates a lightweight Google Sheets CRM template for Bitcoin Savjetovanje.
 *
 * Usage:
 * 1. Open https://script.google.com/
 * 2. Create a new project.
 * 3. Paste this file.
 * 4. Run createBitcoinSavjetovanjeSalesOS().
 * 5. Open the generated spreadsheet URL from Apps Script logs.
 */
function createBitcoinSavjetovanjeSalesOS() {
  var spreadsheet = SpreadsheetApp.create('Bitcoin Savjetovanje — Sales OS');
  var defaultSheet = spreadsheet.getSheets()[0];
  defaultSheet.setName('Dashboard');

  var sheetNames = [
    'CRM',
    'Outreach',
    'Calls',
    'Follow-up',
    'Content ideas',
    'Referral sources',
    'Weekly review',
    'Lists',
    'README',
  ];

  sheetNames.forEach(function (name) {
    spreadsheet.insertSheet(name);
  });

  addLists(spreadsheet);
  addDashboard(spreadsheet);
  setupCrm(spreadsheet);
  setupOutreach(spreadsheet);
  setupCalls(spreadsheet);
  setupFollowUp(spreadsheet);
  setupContentIdeas(spreadsheet);
  setupReferralSources(spreadsheet);
  setupWeeklyReview(spreadsheet);
  addReadme(spreadsheet);
  addSampleRows(spreadsheet);

  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Dashboard'));
  PropertiesService.getScriptProperties().setProperty('SALES_OS_SPREADSHEET_ID', spreadsheet.getId());
  Logger.log('Bitcoin Savjetovanje — Sales OS created: ' + spreadsheet.getUrl());
  Logger.log('Run doGet as a web app, or open the Sales OS UI from the Apps Script project after adding SalesOsUi.html.');
}

function doGet() {
  return HtmlService.createTemplateFromFile('SalesOsUi')
    .evaluate()
    .setTitle('Bitcoin Savjetovanje — Sales OS')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function showSalesOsUi() {
  var html = HtmlService.createTemplateFromFile('SalesOsUi')
    .evaluate()
    .setTitle('Bitcoin Savjetovanje — Sales OS')
    .setWidth(1180)
    .setHeight(760);
  SpreadsheetApp.getUi().showModalDialog(html, 'Bitcoin Savjetovanje — Sales OS');
}

function onOpen() {
  try {
    SpreadsheetApp.getUi().createMenu('Sales OS').addItem('Otvori UI za unos', 'showSalesOsUi').addToUi();
  } catch (error) {
    Logger.log('Sales OS menu skipped: ' + error);
  }
}

function getSalesOsUiState() {
  var spreadsheet = getSalesOsSpreadsheet();
  var dashboard = spreadsheet.getSheetByName('Dashboard');
  var crm = spreadsheet.getSheetByName('CRM');

  return {
    spreadsheetUrl: spreadsheet.getUrl(),
    metrics: {
      contacts: dashboard.getRange('B4').getDisplayValue(),
      contacted: dashboard.getRange('B5').getDisplayValue(),
      replies: dashboard.getRange('B6').getDisplayValue(),
      booked: dashboard.getRange('B7').getDisplayValue(),
      completed: dashboard.getRange('B8').getDisplayValue(),
      revenue: dashboard.getRange('B26').getDisplayValue(),
      bookedRate: dashboard.getRange('B17').getDisplayValue(),
      consultationRate: dashboard.getRange('B18').getDisplayValue(),
    },
    lists: getSalesOsLists(spreadsheet),
    contacts: getRecentSalesOsContacts(crm),
  };
}

function saveSalesOsEntry(type, payload) {
  var spreadsheet = getSalesOsSpreadsheet();
  payload = payload || {};
  assertNoSensitiveSalesOsData(payload);

  if (type === 'contact') {
    return appendSalesOsContact(spreadsheet, payload);
  }
  if (type === 'outreach') {
    return appendSalesOsOutreach(spreadsheet, payload);
  }
  if (type === 'call') {
    return appendSalesOsCall(spreadsheet, payload);
  }
  if (type === 'followUp') {
    return appendSalesOsFollowUp(spreadsheet, payload);
  }
  if (type === 'contentIdea') {
    return appendSalesOsContentIdea(spreadsheet, payload);
  }
  if (type === 'referral') {
    return appendSalesOsReferral(spreadsheet, payload);
  }
  if (type === 'weeklyReview') {
    return appendSalesOsWeeklyReview(spreadsheet, payload);
  }

  throw new Error('Nepoznata vrsta unosa: ' + type);
}

function appendSalesOsContact(spreadsheet, payload) {
  var sheet = spreadsheet.getSheetByName('CRM');
  var now = new Date();
  var row = [
    nextSalesOsId(sheet, 'CRM'),
    payload.firstName || '',
    payload.lastName || '',
    payload.organization || '',
    payload.segment || '',
    payload.source || '',
    payload.channel || '',
    payload.contactDetail || '',
    parseSalesOsDate(payload.firstContactDate) || now,
    payload.status || 'Novi kontakt',
    payload.mainQuestion || '',
    payload.mainTopic || '',
    payload.hasBitcoin || '',
    payload.withFamily || '',
    parseSalesOsDate(payload.introDate) || '',
    payload.introOutcome || '',
    payload.nextRecommendation || '',
    payload.consultationStatus || 'Nije predložena',
    payload.standardStatus || 'Nije predložen',
    Number(payload.revenue || 0),
    payload.nextStep || '',
    parseSalesOsDate(payload.followUpDate) || '',
    payload.referralPotential || '',
    payload.notes || '',
    now,
  ];
  sheet.appendRow(row);
  return successSalesOsResponse('Kontakt je dodan u CRM.', row[0]);
}

function appendSalesOsOutreach(spreadsheet, payload) {
  var sheet = spreadsheet.getSheetByName('Outreach');
  var row = [
    nextSalesOsId(sheet, 'OUT'),
    payload.contactId || '',
    payload.name || '',
    payload.segment || '',
    payload.channel || '',
    parseSalesOsDate(payload.sentDate) || new Date(),
    payload.messageType || 'Prva poruka',
    payload.sent || 'Da',
    payload.replied || 'Ne',
    parseSalesOsDate(payload.replyDate) || '',
    parseSalesOsDate(payload.nextFollowUpDate) || '',
    payload.outcome || 'Nema odgovora',
    payload.notes || '',
  ];
  sheet.appendRow(row);
  return successSalesOsResponse('Outreach je zabilježen.', row[0]);
}

function appendSalesOsCall(spreadsheet, payload) {
  var sheet = spreadsheet.getSheetByName('Calls');
  var row = [
    nextSalesOsId(sheet, 'CALL'),
    payload.contactId || '',
    payload.name || '',
    payload.callType || 'Uvodni razgovor',
    parseSalesOsDate(payload.callDate) || new Date(),
    payload.callStatus || 'Bookiran',
    payload.mainQuestion || '',
    payload.mainTopic || '',
    payload.situationSummary || '',
    payload.observation || '',
    payload.nextRecommendation || '',
    payload.priceProposed || 'Ne',
    Number(payload.amount || 0),
    payload.accepted || 'Neodlučeno',
    payload.followUpSent || 'Ne',
    payload.nextStep || '',
    payload.notes || '',
  ];
  sheet.appendRow(row);
  return successSalesOsResponse('Razgovor je zabilježen.', row[0]);
}

function appendSalesOsFollowUp(spreadsheet, payload) {
  var sheet = spreadsheet.getSheetByName('Follow-up');
  var row = [
    nextSalesOsId(sheet, 'FU'),
    payload.contactId || '',
    payload.name || '',
    parseSalesOsDate(payload.followUpDate) || new Date(),
    payload.status || 'Treba poslati',
    payload.followUpType || '',
    payload.suggestedText || '',
    payload.sent || 'Ne',
    parseSalesOsDate(payload.sentDate) || '',
    payload.outcome || '',
    payload.notes || '',
  ];
  sheet.appendRow(row);
  return successSalesOsResponse('Follow-up je dodan.', row[0]);
}

function appendSalesOsContentIdea(spreadsheet, payload) {
  var sheet = spreadsheet.getSheetByName('Content ideas');
  var row = [
    nextSalesOsId(sheet, 'CONTENT'),
    parseSalesOsDate(payload.date) || new Date(),
    payload.source || '',
    payload.topic || '',
    payload.category || '',
    Number(payload.repeats || 1),
    payload.format || '',
    payload.priority || 'Srednji',
    payload.status || 'Ideja',
    payload.notes || '',
  ];
  sheet.appendRow(row);
  return successSalesOsResponse('Content ideja je dodana.', row[0]);
}

function appendSalesOsReferral(spreadsheet, payload) {
  var sheet = spreadsheet.getSheetByName('Referral sources');
  var row = [
    nextSalesOsId(sheet, 'REF'),
    payload.firstName || '',
    payload.lastName || '',
    payload.segment || '',
    payload.relationship || '',
    payload.contact || '',
    parseSalesOsDate(payload.contactDate) || new Date(),
    payload.messageSent || 'Ne',
    Number(payload.leadCount || 0),
    payload.leadQuality || 'Nema još',
    parseSalesOsDate(payload.nextContactDate) || '',
    payload.notes || '',
  ];
  sheet.appendRow(row);
  return successSalesOsResponse('Referral izvor je dodan.', row[0]);
}

function appendSalesOsWeeklyReview(spreadsheet, payload) {
  var sheet = spreadsheet.getSheetByName('Weekly review');
  var row = [
    parseSalesOsDate(payload.week) || new Date(),
    Number(payload.personalMessages || 0),
    Number(payload.followUpMessages || 0),
    Number(payload.newReplies || 0),
    Number(payload.newBookings || 0),
    Number(payload.completedIntroCalls || 0),
    Number(payload.proposedConsultations || 0),
    Number(payload.acceptedConsultations || 0),
    Number(payload.proposedStandards || 0),
    Number(payload.acceptedStandards || 0),
    Number(payload.revenue || 0),
    payload.commonTopics || '',
    payload.learned || '',
    payload.helpedTooMuch || '',
    payload.offerClarity || '',
    payload.nextFocus || '',
  ];
  sheet.appendRow(row);
  return successSalesOsResponse('Tjedni pregled je spremljen.', 'Weekly review');
}

function getSalesOsSpreadsheet() {
  var id = PropertiesService.getScriptProperties().getProperty('SALES_OS_SPREADSHEET_ID');
  if (id) {
    return SpreadsheetApp.openById(id);
  }

  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    return active;
  }

  throw new Error('Nije pronađen Sales OS spreadsheet. Prvo pokreni createBitcoinSavjetovanjeSalesOS().');
}

function getSalesOsLists(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Lists');
  var values = sheet.getDataRange().getValues();
  var lists = {};
  values[0].forEach(function (name, index) {
    if (!name) {
      return;
    }
    lists[name] = [];
    for (var row = 1; row < values.length; row += 1) {
      if (values[row][index]) {
        lists[name].push(values[row][index]);
      }
    }
  });
  return lists;
}

function getRecentSalesOsContacts(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return [];
  }

  var start = Math.max(2, lastRow - 24);
  var rows = sheet.getRange(start, 1, lastRow - start + 1, 10).getDisplayValues();
  return rows
    .filter(function (row) {
      return row[0] || row[1];
    })
    .map(function (row) {
      return {
        id: row[0],
        name: [row[1], row[2]].filter(Boolean).join(' ') || row[1] || row[0],
        segment: row[4],
        status: row[9],
      };
    })
    .reverse();
}

function nextSalesOsId(sheet, prefix) {
  var count = Math.max(1, sheet.getLastRow());
  return prefix + '-' + Utilities.formatString('%03d', count);
}

function parseSalesOsDate(value) {
  if (!value) {
    return '';
  }
  var parsed = new Date(value);
  if (isNaN(parsed.getTime())) {
    return '';
  }
  return parsed;
}

function successSalesOsResponse(message, id) {
  return {
    ok: true,
    message: message,
    id: id,
  };
}

function assertNoSensitiveSalesOsData(payload) {
  var text = JSON.stringify(payload).toLowerCase();
  var forbidden = [
    'seed phrase',
    'private key',
    'privatni ključ',
    'privatne ključeve',
    'lozinka',
    'password',
    'screenshot novčanika',
    'screenshotove novčanika',
    'wallet screenshot',
    'točan iznos bitcoina',
    'exact bitcoin holdings',
    'exchange login',
    'pristup burzi',
    'pristup burzama',
  ];

  forbidden.forEach(function (term) {
    if (text.indexOf(term) !== -1) {
      throw new Error(
        'Sigurnosno pravilo: ne unositi seed phrase, privatne ključeve, lozinke, screenshotove novčanika, točne iznose Bitcoina, pristup burzama ili osjetljive dokumente.'
      );
    }
  });
}

function setupCrm(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('CRM');
  var headers = [
    'ID',
    'Ime',
    'Prezime',
    'Tvrtka / organizacija',
    'Segment',
    'Izvor',
    'Kanal kontakta',
    'Kontakt podatak',
    'Datum prvog kontakta',
    'Status',
    'Glavno pitanje',
    'Glavna tema',
    'Ima Bitcoin?',
    'Dolazi s partnerom/obitelji?',
    'Uvodni razgovor datum',
    'Ishod uvodnog razgovora',
    'Preporučeni nastavak',
    'Bitcoin konzultacija status',
    'Osobni Bitcoin standard status',
    'Iznos prihoda',
    'Sljedeći korak',
    'Follow-up datum',
    'Referral potencijal',
    'Bilješke',
    'Zadnje ažuriranje',
  ];

  setupSheet(sheet, headers, 100);
  setColumnWidths(sheet, {
    1: 90,
    2: 130,
    3: 130,
    4: 190,
    5: 180,
    6: 140,
    7: 140,
    8: 180,
    9: 130,
    10: 210,
    11: 260,
    12: 170,
    13: 120,
    14: 190,
    15: 160,
    16: 190,
    17: 190,
    18: 190,
    19: 220,
    20: 130,
    21: 230,
    22: 130,
    23: 150,
    24: 320,
    25: 150,
  });

  applyValidation(spreadsheet, sheet, 5, 'Segmenti');
  applyValidation(spreadsheet, sheet, 6, 'Izvori');
  applyValidation(spreadsheet, sheet, 7, 'Kanali');
  applyValidation(spreadsheet, sheet, 10, 'Statusi CRM');
  applyValidation(spreadsheet, sheet, 12, 'Glavne teme');
  applyValidation(spreadsheet, sheet, 13, 'Da/Ne/Razmislja');
  applyValidation(spreadsheet, sheet, 14, 'Da/Ne/Mozda');
  applyValidation(spreadsheet, sheet, 16, 'Ishodi uvodnog razgovora');
  applyValidation(spreadsheet, sheet, 17, 'Nastavci');
  applyValidation(spreadsheet, sheet, 18, 'Bitcoin konzultacija statusi');
  applyValidation(spreadsheet, sheet, 19, 'Osobni Bitcoin standard statusi');
  applyValidation(spreadsheet, sheet, 23, 'Da/Ne/MozdaBezNeZnam');

  sheet.getRange('I2:I101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('O2:O101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('T2:T101').setNumberFormat('€#,##0.00');
  sheet.getRange('V2:V101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('Y2:Y101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('K2:K101').setWrap(true);
  sheet.getRange('U2:U101').setWrap(true);
  sheet.getRange('X2:X101').setWrap(true);
  sheet
    .getRange('A1')
    .setNote(
      'Sigurnosno pravilo: ne unositi seed phrase, privatne ključeve, lozinke, screenshotove novčanika, točne iznose Bitcoina, pristup burzama ili osjetljive dokumente.'
    );
}

function setupOutreach(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Outreach');
  var headers = [
    'ID',
    'Kontakt ID',
    'Ime',
    'Segment',
    'Kanal',
    'Datum slanja',
    'Tip poruke',
    'Poruka poslana?',
    'Odgovor?',
    'Datum odgovora',
    'Sljedeći follow-up datum',
    'Ishod',
    'Bilješke',
  ];

  setupSheet(sheet, headers, 100);
  setColumnWidths(sheet, {
    1: 90,
    2: 110,
    3: 140,
    4: 180,
    5: 140,
    6: 130,
    7: 190,
    8: 140,
    9: 110,
    10: 130,
    11: 170,
    12: 160,
    13: 330,
  });

  applyValidation(spreadsheet, sheet, 4, 'Segmenti');
  applyValidation(spreadsheet, sheet, 5, 'Kanali');
  applyValidation(spreadsheet, sheet, 7, 'Tipovi poruka');
  applyValidation(spreadsheet, sheet, 8, 'Da/Ne');
  applyValidation(spreadsheet, sheet, 9, 'Da/Ne');
  applyValidation(spreadsheet, sheet, 12, 'Ishodi outreacha');

  sheet.getRange('F2:F101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('J2:K101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('M2:M101').setWrap(true);
}

function setupCalls(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Calls');
  var headers = [
    'ID',
    'Kontakt ID',
    'Ime',
    'Tip razgovora',
    'Datum',
    'Status razgovora',
    'Glavno pitanje',
    'Glavna tema',
    'Sažetak situacije',
    'Što sam uočio?',
    'Preporučeni nastavak',
    'Cijena predložena?',
    'Iznos',
    'Prihvaćeno?',
    'Follow-up poslan?',
    'Sljedeći korak',
    'Bilješke',
  ];

  setupSheet(sheet, headers, 100);
  setColumnWidths(sheet, {
    1: 90,
    2: 110,
    3: 140,
    4: 190,
    5: 130,
    6: 160,
    7: 240,
    8: 170,
    9: 300,
    10: 280,
    11: 190,
    12: 150,
    13: 120,
    14: 130,
    15: 150,
    16: 230,
    17: 320,
  });

  applyValidation(spreadsheet, sheet, 4, 'Tipovi razgovora');
  applyValidation(spreadsheet, sheet, 6, 'Statusi razgovora');
  applyValidation(spreadsheet, sheet, 8, 'Glavne teme');
  applyValidation(spreadsheet, sheet, 11, 'Nastavci');
  applyValidation(spreadsheet, sheet, 12, 'Da/Ne');
  applyValidation(spreadsheet, sheet, 14, 'Prihvaceno');
  applyValidation(spreadsheet, sheet, 15, 'Da/Ne');

  sheet.getRange('E2:E101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('M2:M101').setNumberFormat('€#,##0.00');
  sheet.getRange('G2:J101').setWrap(true);
  sheet.getRange('P2:Q101').setWrap(true);
}

function setupFollowUp(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Follow-up');
  var headers = [
    'ID',
    'Kontakt ID',
    'Ime',
    'Follow-up datum',
    'Status',
    'Tip follow-upa',
    'Predloženi tekst',
    'Poslano?',
    'Datum slanja',
    'Ishod',
    'Bilješke',
  ];

  setupSheet(sheet, headers, 100);
  setColumnWidths(sheet, {
    1: 90,
    2: 110,
    3: 140,
    4: 140,
    5: 150,
    6: 280,
    7: 360,
    8: 110,
    9: 130,
    10: 150,
    11: 320,
  });

  applyValidation(spreadsheet, sheet, 5, 'Statusi follow-upa');
  applyValidation(spreadsheet, sheet, 6, 'Follow-up tipovi');
  applyValidation(spreadsheet, sheet, 8, 'Da/Ne');
  applyValidation(spreadsheet, sheet, 10, 'Ishodi follow-upa');

  sheet.getRange('D2:D101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('I2:I101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('G2:G101').setWrap(true);
  sheet.getRange('K2:K101').setWrap(true);
}

function setupContentIdeas(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Content ideas');
  var headers = [
    'ID',
    'Datum',
    'Izvor',
    'Pitanje / tema',
    'Kategorija',
    'Koliko se puta ponovilo?',
    'Format sadržaja',
    'Prioritet',
    'Status',
    'Link / bilješke',
  ];

  setupSheet(sheet, headers, 100);
  setColumnWidths(sheet, {
    1: 90,
    2: 130,
    3: 160,
    4: 340,
    5: 170,
    6: 190,
    7: 170,
    8: 120,
    9: 130,
    10: 330,
  });

  applyValidation(spreadsheet, sheet, 5, 'Kategorije sadržaja');
  applyValidation(spreadsheet, sheet, 7, 'Content formati');
  applyValidation(spreadsheet, sheet, 8, 'Prioriteti');
  applyValidation(spreadsheet, sheet, 9, 'Statusi sadržaja');

  sheet.getRange('B2:B101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('D2:D101').setWrap(true);
  sheet.getRange('J2:J101').setWrap(true);
}

function setupReferralSources(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Referral sources');
  var headers = [
    'ID',
    'Ime',
    'Prezime',
    'Segment',
    'Odnos',
    'Kontakt',
    'Datum kontakta',
    'Poslana referral poruka?',
    'Broj referral leadova',
    'Kvaliteta referral leadova',
    'Sljedeći kontakt',
    'Bilješke',
  ];

  setupSheet(sheet, headers, 100);
  setColumnWidths(sheet, {
    1: 90,
    2: 130,
    3: 130,
    4: 190,
    5: 150,
    6: 180,
    7: 140,
    8: 190,
    9: 160,
    10: 190,
    11: 140,
    12: 330,
  });

  applyValidation(spreadsheet, sheet, 4, 'Referral segmenti');
  applyValidation(spreadsheet, sheet, 5, 'Odnosi');
  applyValidation(spreadsheet, sheet, 8, 'Da/Ne');
  applyValidation(spreadsheet, sheet, 10, 'Kvaliteta referral leadova');

  sheet.getRange('G2:G101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('K2:K101').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('L2:L101').setWrap(true);
}

function setupWeeklyReview(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Weekly review');
  var headers = [
    'Tjedan',
    'Poslanih osobnih poruka',
    'Follow-up poruka',
    'Novi odgovori',
    'Novi bookinzi',
    'Odrađenih uvodnih razgovora',
    'Predložene Bitcoin konzultacije',
    'Prihvaćene Bitcoin konzultacije',
    'Predloženi Osobni Bitcoin standardi',
    'Prihvaćeni Osobni Bitcoin standardi',
    'Prihod',
    'Najčešće teme',
    'Što sam naučio?',
    'Gdje sam previše pomagao besplatno?',
    'Gdje nisam dovoljno jasno ponudio nastavak?',
    'Fokus za sljedeći tjedan',
  ];

  setupSheet(sheet, headers, 60);
  setColumnWidths(sheet, {
    1: 120,
    2: 180,
    3: 140,
    4: 130,
    5: 130,
    6: 190,
    7: 220,
    8: 220,
    9: 250,
    10: 250,
    11: 120,
    12: 240,
    13: 300,
    14: 310,
    15: 330,
    16: 300,
  });

  sheet.getRange('A2:A61').setNumberFormat('dd.mm.yyyy');
  sheet.getRange('K2:K61').setNumberFormat('€#,##0.00');
  sheet.getRange('L2:P61').setWrap(true);
}

function addDashboard(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Dashboard');
  sheet.clear();
  sheet.setHiddenGridlines(true);

  sheet.getRange('A1').setValue('Bitcoin Savjetovanje — Sales OS');
  sheet.getRange('A1:D1').merge();
  sheet.getRange('A1').setFontSize(20).setFontWeight('bold').setFontColor('#1f2937');

  sheet.getRange('A3').setValue('Glavni brojevi');
  sheet.getRange('A16').setValue('Konverzije');
  sheet.getRange('A25').setValue('Prihod');
  sheet.getRange('A32').setValue('Najčešće teme');
  sheet.getRangeList(['A3', 'A16', 'A25', 'A32']).setFontSize(13).setFontWeight('bold').setFontColor('#0f172a');

  var metrics = [
    ['Ukupno kontakata', '=COUNTA(CRM!B2:B)'],
    [
      'Kontakti kontaktirani',
      '=COUNTIF(CRM!J:J,"Kontaktiran")+COUNTIF(CRM!J:J,"Odgovorio")+COUNTIF(CRM!J:J,"Bookirao uvodni razgovor")+COUNTIF(CRM!J:J,"Uvodni razgovor odrađen")+COUNTIF(CRM!J:J,"Follow-up poslan")+COUNTIF(CRM!J:J,"Bitcoin konzultacija predložena")+COUNTIF(CRM!J:J,"Bitcoin konzultacija prihvaćena")+COUNTIF(CRM!J:J,"Bitcoin konzultacija odrađena")+COUNTIF(CRM!J:J,"Osobni Bitcoin standard predložen")+COUNTIF(CRM!J:J,"Osobni Bitcoin standard prihvaćen")+COUNTIF(CRM!J:J,"Nije fit")+COUNTIF(CRM!J:J,"Neaktivan")+COUNTIF(CRM!J:J,"Završeno")',
    ],
    [
      'Odgovori',
      '=COUNTIF(CRM!J:J,"Odgovorio")+COUNTIF(CRM!J:J,"Bookirao uvodni razgovor")+COUNTIF(CRM!J:J,"Uvodni razgovor odrađen")+COUNTIF(CRM!J:J,"Follow-up poslan")+COUNTIF(CRM!J:J,"Bitcoin konzultacija predložena")+COUNTIF(CRM!J:J,"Bitcoin konzultacija prihvaćena")+COUNTIF(CRM!J:J,"Bitcoin konzultacija odrađena")+COUNTIF(CRM!J:J,"Osobni Bitcoin standard predložen")+COUNTIF(CRM!J:J,"Osobni Bitcoin standard prihvaćen")+COUNTIF(CRM!J:J,"Završeno")',
    ],
    [
      'Uvodni razgovori bookirani',
      '=COUNTIF(CRM!J:J,"Bookirao uvodni razgovor")+COUNTIF(CRM!J:J,"Uvodni razgovor odrađen")+COUNTIF(CRM!J:J,"Bitcoin konzultacija predložena")+COUNTIF(CRM!J:J,"Bitcoin konzultacija prihvaćena")+COUNTIF(CRM!J:J,"Bitcoin konzultacija odrađena")+COUNTIF(CRM!J:J,"Osobni Bitcoin standard predložen")+COUNTIF(CRM!J:J,"Osobni Bitcoin standard prihvaćen")+COUNTIF(CRM!J:J,"Završeno")',
    ],
    ['Uvodni razgovori odrađeni', '=COUNTIF(CRM!J:J,"Uvodni razgovor odrađen")+COUNTIF(Calls!D:D,"Uvodni razgovor")'],
    [
      'Bitcoin konzultacija predložena',
      '=COUNTIF(CRM!R:R,"Predložena")+COUNTIF(CRM!R:R,"Prihvaćena")+COUNTIF(CRM!R:R,"Odrađena")+COUNTIF(CRM!R:R,"Plaćeno")',
    ],
    ['Bitcoin konzultacija prihvaćena', '=COUNTIF(CRM!R:R,"Prihvaćena")+COUNTIF(CRM!R:R,"Odrađena")+COUNTIF(CRM!R:R,"Plaćeno")'],
    [
      'Osobni Bitcoin standard predložen',
      '=COUNTIF(CRM!S:S,"Predložen")+COUNTIF(CRM!S:S,"Prihvaćen")+COUNTIF(CRM!S:S,"U tijeku")+COUNTIF(CRM!S:S,"Završeno")',
    ],
    ['Osobni Bitcoin standard prihvaćen', '=COUNTIF(CRM!S:S,"Prihvaćen")+COUNTIF(CRM!S:S,"U tijeku")+COUNTIF(CRM!S:S,"Završeno")'],
  ];

  sheet.getRange(4, 1, metrics.length, 2).setValues(metrics);

  var conversions = [
    ['Kontaktiran -> bookiran', '=IFERROR(B7/B5,0)'],
    ['Odrađen uvodni -> Bitcoin konzultacija', '=IFERROR(B9/B8,0)'],
    ['Odrađen uvodni -> Osobni Bitcoin standard', '=IFERROR(B11/B8,0)'],
  ];
  sheet.getRange(17, 1, conversions.length, 2).setValues(conversions);
  sheet.getRange('B17:B19').setNumberFormat('0.0%');

  sheet.getRange('A26').setValue('Ukupni prihod');
  sheet.getRange('B26').setFormula('=SUM(CRM!T:T)');
  sheet.getRange('B26').setNumberFormat('€#,##0.00');

  var topics = [
    ['Bitcoin teza', '=COUNTIF(CRM!L:L,"Bitcoin teza")+COUNTIF(Calls!H:H,"Bitcoin teza")'],
    ['Cijena / volatilnost', '=COUNTIF(CRM!L:L,"Cijena / volatilnost")+COUNTIF(Calls!H:H,"Cijena / volatilnost")'],
    ['Dug', '=COUNTIF(CRM!L:L,"Dug")+COUNTIF(Calls!H:H,"Dug")'],
    ['Sigurnost', '=COUNTIF(CRM!L:L,"Sigurnost")+COUNTIF(Calls!H:H,"Sigurnost")'],
    ['Obitelj', '=COUNTIF(CRM!L:L,"Obitelj")+COUNTIF(Calls!H:H,"Obitelj")'],
    ['Uloga Bitcoina u imovini', '=COUNTIF(CRM!L:L,"Uloga Bitcoina u imovini")+COUNTIF(Calls!H:H,"Uloga Bitcoina u imovini")'],
    ['Proračun', '=COUNTIF(CRM!L:L,"Proračun")+COUNTIF(Calls!H:H,"Proračun")'],
    ['Neto imovina', '=COUNTIF(CRM!L:L,"Neto imovina")+COUNTIF(Calls!H:H,"Neto imovina")'],
    ['Davanje', '=COUNTIF(CRM!L:L,"Davanje")+COUNTIF(Calls!H:H,"Davanje")'],
  ];
  sheet.getRange(33, 1, topics.length, 2).setValues(topics);

  sheet.getRange('A4:A12').setFontWeight('bold').setBackground('#f8fafc');
  sheet.getRange('A17:A19').setFontWeight('bold').setBackground('#f8fafc');
  sheet.getRange('A26').setFontWeight('bold').setBackground('#f8fafc');
  sheet.getRange('A33:A41').setFontWeight('bold').setBackground('#f8fafc');
  sheet.getRangeList(['B4:B12', 'B26', 'B33:B41']).setFontWeight('bold');
  sheet.getRange('A:B').setVerticalAlignment('middle');
  sheet.setColumnWidth(1, 330);
  sheet.setColumnWidth(2, 150);
  sheet.setFrozenRows(1);
}

function addLists(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Lists');
  sheet.clear();

  var lists = {
    Segmenti: [
      '21 zajednica',
      'Stemi / poduzetnička mreža',
      'LinkedIn',
      'Bitcoin poznanik',
      'Referral',
      'Obitelj / prijatelj',
      'Hrvatski profesionalac',
      'Hrvat u inozemstvu',
      'Drugo',
    ],
    Izvori: ['LinkedIn', 'DvadesetJedan', 'Telegram', 'YouTube', 'Stemi', 'Referral', 'Direktno', 'Web stranica', 'Drugo'],
    Kanali: ['LinkedIn DM', 'Telegram', 'Email', 'WhatsApp', 'Signal', 'Telefon', 'Uživo', 'Drugo'],
    'Statusi CRM': [
      'Novi kontakt',
      'Kontaktiran',
      'Odgovorio',
      'Bookirao uvodni razgovor',
      'Uvodni razgovor odrađen',
      'Follow-up poslan',
      'Bitcoin konzultacija predložena',
      'Bitcoin konzultacija prihvaćena',
      'Bitcoin konzultacija odrađena',
      'Osobni Bitcoin standard predložen',
      'Osobni Bitcoin standard prihvaćen',
      'Nije fit',
      'Neaktivan',
      'Završeno',
    ],
    'Glavne teme': [
      'Bitcoin teza',
      'Cijena / volatilnost',
      'Dug',
      'Sigurnost',
      'Obitelj',
      'Uloga Bitcoina u imovini',
      'Proračun',
      'Neto imovina',
      'Davanje',
      'Drugo',
    ],
    'Da/Ne/Razmislja': ['Da', 'Ne', 'Razmišlja', 'Ne znam'],
    'Da/Ne/Mozda': ['Da', 'Ne', 'Možda', 'Ne znam'],
    'Da/Ne/MozdaBezNeZnam': ['Da', 'Ne', 'Možda'],
    'Da/Ne': ['Da', 'Ne'],
    'Ishodi uvodnog razgovora': ['Kratak odgovor dovoljan', 'Bitcoin konzultacija', 'Osobni Bitcoin standard', 'Nije fit', 'Kasnije', 'Neodlučeno'],
    Nastavci: ['Ništa', 'Bitcoin konzultacija', 'Osobni Bitcoin standard', 'Poslati vodič', 'Follow-up kasnije', 'Drugo'],
    'Bitcoin konzultacija statusi': ['Nije predložena', 'Predložena', 'Prihvaćena', 'Odbijena', 'Odrađena', 'Plaćeno', 'Kasnije'],
    'Osobni Bitcoin standard statusi': ['Nije predložen', 'Predložen', 'Prihvaćen', 'Odbijen', 'U tijeku', 'Završeno', 'Kasnije'],
    'Tipovi poruka': ['Prva poruka', 'Follow-up 1', 'Follow-up 2', 'Referral upit', 'Nakon livestreama', 'LinkedIn komentar -> DM', 'Drugo'],
    'Ishodi outreacha': ['Nema odgovora', 'Odgovorio', 'Bookirao razgovor', 'Nije fit', 'Kasnije', 'Referral', 'Završeno'],
    'Tipovi razgovora': ['Uvodni razgovor', 'Bitcoin konzultacija', 'Osobni Bitcoin standard', 'Referral razgovor', 'Drugo'],
    'Statusi razgovora': ['Bookiran', 'Odrađen', 'Otkazan', 'No-show', 'Prebačen termin'],
    Prihvaceno: ['Da', 'Ne', 'Kasnije', 'Neodlučeno'],
    'Statusi follow-upa': ['Treba poslati', 'Poslano', 'Čeka odgovor', 'Odgovorio', 'Nije potrebno', 'Završeno'],
    'Follow-up tipovi': [
      'Nakon uvodnog razgovora — bez nastavka',
      'Nakon uvodnog razgovora — Bitcoin konzultacija',
      'Nakon uvodnog razgovora — Osobni Bitcoin standard',
      'Nakon Bitcoin konzultacije',
      'Referral upit',
      'Kasniji check-in',
      'Drugo',
    ],
    'Ishodi follow-upa': ['Nema odgovora', 'Bookirao', 'Prihvatio', 'Odbio', 'Kasnije', 'Završeno'],
    'Kategorije sadržaja': [
      'Bitcoin teza',
      'Cijena / volatilnost',
      'Dug',
      'Sigurnost',
      'Obitelj',
      'Proračun',
      'Neto imovina',
      'Davanje',
      'Prodaja / FAQ',
      'Drugo',
    ],
    'Content formati': ['LinkedIn post', 'Livestream tema', 'Vodič', 'FAQ', 'Telegram post', 'Newsletter', 'Drugo'],
    Prioriteti: ['Visok', 'Srednji', 'Nizak'],
    'Statusi sadržaja': ['Ideja', 'U pripremi', 'Objavljeno', 'Odgođeno', 'Arhiva'],
    'Referral segmenti': ['21 zajednica', 'Stemi / poduzetnička mreža', 'LinkedIn', 'Bitcoin poznanik', 'Profesionalni partner', 'Prijatelj', 'Drugo'],
    Odnosi: ['Topao kontakt', 'Blizak kontakt', 'Poznanik', 'Klijent', 'Partner', 'Drugo'],
    'Kvaliteta referral leadova': ['Visoka', 'Srednja', 'Niska', 'Nema još'],
  };

  var column = 1;
  Object.keys(lists).forEach(function (name) {
    var values = lists[name];
    sheet.getRange(1, column).setValue(name);
    sheet.getRange(2, column, values.length, 1).setValues(
      values.map(function (value) {
        return [value];
      })
    );
    spreadsheet.setNamedRange(name.replace(/[^A-Za-z0-9]/g, '_'), sheet.getRange(2, column, values.length, 1));
    column += 1;
  });

  setupSheetLook(sheet, Math.max(1, column - 1));
  sheet.setFrozenRows(1);
  sheet.hideSheet();
}

function addReadme(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('README');
  sheet.clear();
  sheet.setHiddenGridlines(true);
  sheet.setColumnWidth(1, 240);
  sheet.setColumnWidth(2, 760);

  var rows = [
    ['Kako koristiti ovaj Sales OS', 'Jedan red u CRM-u predstavlja jednu osobu. Primjer redovi u CRM-u mogu se obrisati prije stvarnog rada.'],
    ['', 'Cilj tablice nije automatizirati odnos s klijentom. Cilj je ne izgubiti kontekst, ne zaboraviti follow-up i prepoznati obrasce iz prvih razgovora.'],
    ['', 'Prvi cilj: 30 dana, 10 uvodnih razgovora, 3 Bitcoin konzultacije.'],
    ['Dnevni ritam', 'Dodaj nove kontakte u CRM, zabilježi poslane osobne poruke u Outreach, ažuriraj status i postavi follow-up datum čim postoji sljedeći korak.'],
    ['Nakon svakog uvodnog razgovora', 'Ažuriraj CRM, dodaj red u Calls, upiši glavno pitanje, glavnu temu, preporučeni nastavak i sljedeći follow-up. Ako se pitanje ponavlja, dodaj ga u Content ideas.'],
    ['Tjedni pregled', 'Jednom tjedno ispuni Weekly review: poslane poruke, follow-up poruke, novi odgovori, bookinzi, odrađeni uvodni razgovori, predložene i prihvaćene konzultacije, prihod i najčešće teme.'],
    ['', 'Pitanja za pregled: Što sam naučio? Gdje sam previše pomagao besplatno? Gdje nisam dovoljno jasno ponudio nastavak? Koji je fokus za sljedeći tjedan?'],
    ['Pravila sigurnosti', 'Koristi široke kategorije i poslovni kontekst. Ne zapisuj osjetljive financijske detalje ni podatke koji bi nekoga mogli sigurnosno ugroziti.'],
    ['Što ne unositi u tablicu', 'Ne unosite seed phrase, privatne ključeve, lozinke, screenshotove novčanika, točne iznose Bitcoina, pristup burzama ili osjetljive dokumente.'],
    ['', 'Ne unositi: seed phrase, private keys, passwords, screenshots of wallets, exact Bitcoin holdings, exchange login info, sensitive documents or full personal financial documents.'],
    ['', 'Koristi samo široke kategorije kao: ima Bitcoin, razmišlja, sigurnost tema, dug tema, obitelj tema.'],
    ['Osnovni funnel', 'Funnel: kontakt -> uvodni razgovor -> Bitcoin konzultacija -> Osobni Bitcoin standard.'],
    ['', 'Homepage -> /razgovor/ -> opcionalna Bitcoin konzultacija 200 € -> opcionalni Osobni Bitcoin standard 1.500 €.'],
  ];

  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange('A:A').setFontWeight('bold').setFontColor('#0f172a');
  sheet.getRange('A1:B1').setBackground('#e0f2fe');
  sheet.getRange('A1:B13').setWrap(true).setVerticalAlignment('top');
  sheet.getRange('A1:B13').setFontSize(11);
  sheet.getRange('B:B').setFontColor('#334155');
}

function addSampleRows(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('CRM');
  var today = new Date();
  var rows = [
    [
      'EX-001',
      'Primjer 1',
      'LinkedIn',
      'Primjer tvrtka',
      'LinkedIn',
      'LinkedIn',
      'LinkedIn DM',
      'primjer1@example.com',
      today,
      'Kontaktiran',
      'Kako sigurno čuvati Bitcoin bez nepotrebne kompleksnosti?',
      'Sigurnost',
      'Razmišlja',
      'Ne znam',
      '',
      '',
      'Poslati vodič',
      'Nije predložena',
      'Nije predložen',
      0,
      'Poslati osobni follow-up',
      '',
      'Možda',
      'Fiktivni primjer. Obriši prije stvarnog rada.',
      today,
    ],
    [
      'EX-002',
      'Primjer 2',
      'Zajednica',
      '21 zajednica',
      '21 zajednica',
      'DvadesetJedan',
      'Telegram',
      'primjer2@example.com',
      today,
      'Bookirao uvodni razgovor',
      'Kako uključiti partnera i obitelj u razgovor o Bitcoinu?',
      'Obitelj',
      'Da',
      'Da',
      today,
      'Neodlučeno',
      'Bitcoin konzultacija',
      'Predložena',
      'Nije predložen',
      0,
      'Odrađivanje uvodnog razgovora',
      today,
      'Da',
      'Fiktivni primjer. Ne unositi osjetljive detalje.',
      today,
    ],
    [
      'EX-003',
      'Primjer 3',
      'Stemi',
      'Stemi mreža',
      'Stemi / poduzetnička mreža',
      'Stemi',
      'Email',
      'primjer3@example.com',
      today,
      'Uvodni razgovor odrađen',
      'Želi razumjeti dugoročnu Bitcoin tezu prije prve odluke.',
      'Bitcoin teza',
      'Ne',
      'Možda',
      today,
      'Bitcoin konzultacija',
      'Bitcoin konzultacija',
      'Prihvaćena',
      'Nije predložen',
      200,
      'Dogovoriti termin konzultacije',
      today,
      'Možda',
      'Fiktivni primjer s prihvaćenom konzultacijom.',
      today,
    ],
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

function setupSheet(sheet, headers, dataRows) {
  sheet.clear();
  setHeaders(sheet, headers);
  setupSheetLook(sheet, headers.length);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, dataRows + 1, headers.length).createFilter();
  if (sheet.getMaxRows() < dataRows + 1) {
    sheet.insertRowsAfter(sheet.getMaxRows(), dataRows + 1 - sheet.getMaxRows());
  }
}

function setHeaders(sheet, headers) {
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  applyHeaderStyle(sheet, headers.length);
}

function applyHeaderStyle(sheet, columnCount) {
  sheet
    .getRange(1, 1, 1, columnCount)
    .setFontWeight('bold')
    .setFontColor('#0f172a')
    .setBackground('#dbeafe')
    .setVerticalAlignment('middle')
    .setWrap(true);
}

function setupSheetLook(sheet, columnCount) {
  applyHeaderStyle(sheet, columnCount);
  sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), columnCount).setVerticalAlignment('top');
  try {
    sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), columnCount).applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
  } catch (error) {
    Logger.log('Row banding skipped for ' + sheet.getName() + ': ' + error);
  }
}

function setColumnWidths(sheet, widths) {
  Object.keys(widths).forEach(function (column) {
    sheet.setColumnWidth(Number(column), widths[column]);
  });
}

function applyValidation(spreadsheet, sheet, column, listName) {
  var range = getNamedListRange(spreadsheet, listName);
  var rule = SpreadsheetApp.newDataValidation().requireValueInRange(range, true).setAllowInvalid(false).build();
  sheet.getRange(2, column, 100, 1).setDataValidation(rule);
}

function getNamedListRange(spreadsheet, listName) {
  var listsSheet = spreadsheet.getSheetByName('Lists');
  var headers = listsSheet.getRange(1, 1, 1, listsSheet.getLastColumn()).getValues()[0];
  var index = headers.indexOf(listName);
  if (index === -1) {
    throw new Error('Missing list: ' + listName);
  }

  var column = index + 1;
  var values = listsSheet.getRange(2, column, listsSheet.getMaxRows() - 1, 1).getValues();
  var lastRow = 1;
  values.forEach(function (row, rowIndex) {
    if (row[0]) {
      lastRow = rowIndex + 2;
    }
  });

  return listsSheet.getRange(2, column, lastRow - 1, 1);
}
