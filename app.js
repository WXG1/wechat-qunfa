var iWechat = require('iwechat');
var wechat = new iWechat()
var minirequest = require('poorequest');
var request = new minirequest();
var fs=require('fs');
var path = require('path')
var express = require('express')
var app =  express.createServer();
var DIY = require('./diy.js')
var async = require('./async')

app.use(express.static(path.join(__dirname, '')));
wechat.start();

wechat.on('uuid', function(uuid)  {
	var qrcodeUrl = 'https://login.weixin.qq.com/qrcode/' + uuid;
	console.log('Get QRCode from:',qrcodeUrl);
	request.get(qrcodeUrl, function(err,res){
		if(err){
			console.log(err);
		}else{
			fs.writeFileSync('qrcode.jpg',res.raw);
			console.log('open http://127.0.0.1:1234 in your browser.')
			app.listen(1234)
		}
	})
})



var mycontacts;


wechat.on('scan', function()  {
	//console.log('scan ok.');
})
wechat.on('confirm', function (){
	//console.log('confirm ok!')
})
wechat.on('login', function(memberList)  {
  // memberlist[0] gong zong hao
  // memberlist[1] special contact
  // memberlist[2] group
  // memberlist[3] friend contact
  mycontacts = memberList[3].list;

	for(var i=0;i<mycontacts.length;i++){
		console.log(mycontacts[i].UserName, "|" ,
                mycontacts[i].NickName, "|" ,
                mycontacts[i].RemarkName,"<<")
	}


	console.log('login succeed!, my contacts munber =', mycontacts.length);

})

wechat.on('logout', function(fmsg) {
	console.log('logout:',fmsg);
})

wechat.on('error', function(err){
	console.log('error:',err);
});

wechat.on('init-message', function(){
	//console.log('init-message');
})
wechat.on('text-message', function(msg) {

  if(msg.FromUserName !== msg.ToUserName)
    return;

  console.log('recv command from self:',msg.Content);
  if('qunfa' === msg.Content){
      console.log('command qunfa recognize.')
      var name = '';
      async.forEachSeries(mycontacts,function(one,callback){
        if(!DIY.filter(one))
          return callback();

        console.log('processing ',one.RemarkName);
        name += ' | ' + one.RemarkName;

        //console.log(DIY.content(one),one.UserName);callback();
        wechat.sendMsg(DIY.content(one),one.UserName,callback);
      },function(err){ })

  }
})

wechat.on('picture-message', function(msg) {
	console.log('picture-message');
})

wechat.on('voice-message', function(msg) {
	console.log('voice-message');
})

wechat.on('emoticon-message', function(msg) {
	console.log('emoticon-message');
})

wechat.on('verify-message', function(msg) {
	console.log('verify-message');
})


////////////////////////////////////////////////















