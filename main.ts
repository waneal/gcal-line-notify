function main() {
  const useProperties = PropertiesService.getScriptProperties();
  const id = useProperties.getProperty("id");
  if (!id) {
    throw new Error("Calendar ID is not set in script properties");
  }

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

function sendLineMessage(msg: string) {
  const useProperties = PropertiesService.getScriptProperties();
  const token = useProperties.getProperty("token");
  const groupId = useProperties.getProperty("groupId");

  if (!token || !groupId) {
    throw new Error("LINE token or groupId is not set in script properties");
  }

  const payload = {
    to: groupId,
    messages: [
      {
        type: "text",
        text: msg
      }
    ]
  };

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post" as const,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + token
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push", options);
}
