# gcal-line-notify

notify tomorrow's events to line talk

# How to use

## Get Line Notify token

https://notify-bot.line.me/

## Deploy Google Apps Script

- install clasp

```
npm install -g @google/clasp
```

- install node_modules

```
npm install
```

- create project and push sources

```
clasp login
clasp create
clasp push
```

## Configure Project

- add Script Properties
  - https://developers.google.com/apps-script/guides/properties#add_script_properties
  - set below properties
    - `id` : calendar id
    - `token` : Line Notify token
- setup trigger
  - https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually
