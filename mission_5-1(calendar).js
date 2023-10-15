const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month =["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得(31日などがない月があるため)
//現在の月の1日を取得
var monthFirstday = new Date(today.getFullYear(), today.getMonth(), 1);
// 当月表示
window.onload = function () {
    showCalendar(today);
};
// 前の月表示
function prev(){
    monthFirstday.setMonth(monthFirstday.getMonth() - 1);
    showCalendar(monthFirstday);
}

// 次の月表示
function next(){
    monthFirstday.setMonth(monthFirstday.getMonth() + 1);
    showCalendar(monthFirstday);
}

// カレンダー表示
function showCalendar(date) {
    var nowYear = date.getFullYear();
    var nowMonth = date.getMonth();
    //ヘッダー（id=”#header”）に年月を表示させる。
    document.querySelector('#header').innerHTML =month[nowMonth]+" "+nowYear;
    //カレンダー作成関数呼び出し
    var calendar = createCalendar(nowYear, nowMonth);
    document.querySelector('#calendar').innerHTML = calendar;
}

// カレンダー作成
//引数：year（年）、month（月）
//戻り値：作成したカレンダー
function createCalendar(nowYear, nowMonth) {
    // 曜日の行作成
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;//日付のカウント
    var startDayOfWeek = new Date(nowYear, nowMonth, 1).getDay();//表示する月の1日の曜日
    var endDate = new Date(nowYear, nowMonth + 1, 0).getDate();//表示する月の末日,引数を次の月の0にすることで当月の末日を取得
    var lastMonthEndDate = new Date(nowYear, nowMonth, 0).getDate();//表示する先月の末日
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);//カレンダー（日付部分）の行数、切り上げ

    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if(nowYear == today.getFullYear()
                  && nowMonth == (today.getMonth())
                  && count == today.getDate()){
                    calendar += "<td class='today'>" + count + "</td>";
                    //当日の場合はtodayの装飾を行うためにクラス付け
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}