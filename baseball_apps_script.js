// ⚾ Baseball Game Tracker — Google Apps Script
// Paste this entire script into your Google Sheet's Apps Script editor.
// Extensions → Apps Script → delete existing code → paste this → Save → Deploy
//
// !! IMPORTANT: Change the token below to match what you set in the app !!

var SECRET_TOKEN = "CHANGE_THIS_TO_YOUR_TOKEN"; // e.g. "jake2026tigers"

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // ── TOKEN CHECK ──────────────────────────────────────
    if (!data.token || data.token !== SECRET_TOKEN) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date", "Player", "Opponent",
        "AB", "H", "2B", "3B", "HR", "RBI", "Runs", "BB", "K", "HBP", "SAC", "SB",
        "AVG", "OBP", "SLG",
        "Pitches", "Strikes", "Balls", "K (P)", "BB (P)", "H (P)", "IP"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 25);
      headerRange.setBackground("#1B2A4A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Append the game row
    sheet.appendRow([
      data.date      || "",
      data.player    || "",
      data.opponent  || "",
      data.ab        || 0,
      data.h         || 0,
      data.doubles   || 0,
      data.triples   || 0,
      data.hr        || 0,
      data.rbi       || 0,
      data.r         || 0,
      data.bb        || 0,
      data.k         || 0,
      data.hbp       || 0,
      data.sac       || 0,
      data.sb        || 0,
      data.avg       || ".000",
      data.obp       || ".000",
      data.slg       || ".000",
      data.pitches   || 0,
      data.pStrikes  || 0,
      data.pBalls    || 0,
      data.pK        || 0,
      data.pBB       || 0,
      data.pH        || 0,
      data.ip        || "0.0"
    ]);

    sheet.autoResizeColumns(1, 25);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("⚾ Baseball Tracker script is running!")
    .setMimeType(ContentService.MimeType.TEXT);
}
