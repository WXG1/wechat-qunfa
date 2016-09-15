

a demo for using module iwechat


# 1.install

```
git clone https://github.com/yizhiren/wechat-qunfa.git
cd wechat-qunfa
npm install

```

# 2.diy

编辑diy.js, 把message替换成你想要的内容，@NAME@这个会被替换成备注名。这可以让看起来不是群发的。

edit diy.js

replace msg as you like, @NAME@ will replace to RemarkName when sending.

# 3.start

```
node app.js

```

# 4.login

待控制台显示url,你启动浏览器并扫描登录。

then open http://127.0.0.1:1234 in your browser. you will see a qrcode, scan it to make it work.

![demo snapshot](https://github.com/yizhiren/wechat-example/blob/master/snapshot/wechatExmple.jpg  "snapshot") 



# 5.trigger

send "qunfa" to yourself, it will start the broadcasting.

在通讯录中找到自己，给自己发送qunfa,它就会开始群发给你备注了昵称的好友消息。


