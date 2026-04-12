/**
 * Google Apps Script — 관심고객 등록 시트 연동
 *
 * 사용법:
 * 1. Google Sheets에서 새 스프레드시트를 만듭니다.
 * 2. 첫 번째 행(헤더)에 다음을 입력합니다:
 *    A1: 등록일시 | B1: 이름 | C1: 연락처 | D1: 이메일 | E1: 마케팅동의
 * 3. [확장 프로그램] → [Apps Script]를 클릭합니다.
 * 4. 이 파일의 내용을 붙여넣고 저장합니다.
 * 5. [배포] → [새 배포]를 클릭합니다.
 * 6. 유형: "웹 앱", 실행 주체: "나", 액세스 권한: "모든 사용자"로 설정합니다.
 * 7. 배포 후 생성된 URL을 .env.local의 NEXT_PUBLIC_GOOGLE_SHEET_URL에 설정합니다.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.marketingConsent ? "동의" : "미동의",
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
