/**
 * Google Apps Script — apartment-promo 관심고객 등록
 *
 * 스프레드시트 ID: 1HPA3ArBpQNmMhaakg22zaKcgP_EjBGFsTISfRVirfLVcQkM3CL5H_Ef-
 * 대상: 2번째 시트
 *
 * 사용법:
 * 1. https://script.google.com 에서 새 프로젝트를 만듭니다.
 * 2. 이 파일의 내용을 붙여넣고 저장합니다.
 * 3. [배포] → [새 배포] → 웹 앱, 실행 주체: 나, 액세스: 모든 사용자
 * 4. 배포 후 생성된 URL로 RegistrationSection.tsx의 GAS_ENDPOINT를 교체합니다.
 */

var SPREADSHEET_ID = "1HPA3ArBpQNmMhaakg22zaKcgP_EjBGFsTISfRVirfLVcQkM3CL5H_Ef-";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[1]; // 2번째 시트

    if (!sheet) {
      sheet = ss.insertSheet("apartment-promo");
    }

    var p = e.parameter;

    // 헤더가 없으면 자동 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["등록일시", "이름", "연락처", "이메일", "마케팅동의"]);
    }

    sheet.appendRow([
      new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
      p.name || "",
      p.phone || "",
      p.email || "",
      p.marketingConsent || "미동의",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
