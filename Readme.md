### What is it?

It's a node express server and Chrome extention bunble that show your internet reminded quota over the chrome extension as couter badge.

### How to use it

1) Run `adsl-stats-server` using `manual_run.sh`. if you plan to run it as service install `pm2` and run `pm2 install` in `adsl-stats-server` directory.

2) Set `serverAddr` variable in `background.js` in Chrome extesion directory to server address from above.

3) Enable developer mode in Chrome extesions and install chrome extesion by clicking on `Load unpacked` and select chrome extention directory.

5) Login to `https://adsl.tci.ir/panel/`. Extention automaticaly grab needed sessionid. session id will be valid until your wan ip changes.

6) You should see reminded value as badge over ther browser icon.