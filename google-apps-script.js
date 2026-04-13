/**
 * Google Apps Script — 관심고객 등록 시트 연동
 *
 * 스프레드시트 ID: 1HPA3ArBpQNmMhaakg22zaKcgP_EjBGFsTISfRVirfLVcQkM3CL5H_Ef-
 *
 * 사용법:
 * 1. https://script.google.com 에서 새 프로젝트를 만듭니다.
 * 2. 이 파일의 내용을 붙여넣고 저장합니다.
 * 3. 스프레드시트 첫 번째 행(헤더)에 다음을 입력합니다:
 *    A1: 등록일시 | B1: 이름 | C1: 연락처 | D1: 이메일 | E1: 마케팅동의
 * 4. [배포] → [새 배포]를 클릭합니다.
 * 5. 유형: "웹 앱", 실행 주체: "나", 액세스 권한: "모든 사용자"로 설정합니다.
 * 6. 배포 후 생성된 URL을 .env.local의 NEXT_PUBLIC_GOOGLE_SHEET_URL에 설정합니다.
 */

var SPREADSHEET_ID = "1HPA3ArBpQNmMhaakg22zaKcgP_EjBGFsTISfRVirfLVcQkM3CL5H_Ef-";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Sheet1") ||
                SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
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
