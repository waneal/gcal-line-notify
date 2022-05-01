function main() {
  const useProperties = PropertiesService.getScriptProperties();
  const id = useProperties.getProperty("id");

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const events = CalendarApp.getCalendarById(id).getEventsForDay(tomorrow);

  let msg = "\n" + "# 明日の予定";
  if (events.length == 0) {
    msg += "\n" + "なにもありません";
  } else {
    for (const event of events) {
      msg +=
        "\n" +
        event.getTitle() +
        ": " +
        Utilities.formatDate(event.getStartTime(), "JST", "HH:mm") +
        "-" +
        Utilities.formatDate(event.getEndTime(), "JST", "HH:mm");
      Logger.log(msg);
    }
  }
  sendLineMessage(msg);
}

function sendLineMessage(msg) {
  const useProperties = PropertiesService.getScriptProperties();
  const token = useProperties.getProperty("token");
  const options = {
    method: "post",
    "content-type": "	application/x-www-form-urlencoded",
    payload: "message=" + msg,
    headers: { Authorization: "Bearer " + token },
  };

  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}
