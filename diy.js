
var msg = '亲爱的@NAME@,中秋快乐！[此为群发信息，打扰请屏蔽]'

module.exports = {
  filter:function(one){
    if(''===one.RemarkName){
      return false;
    }
    return true;
  }

  ,

  content:function(one){
    return msg.replace('@NAME@',one.RemarkName);
  }

}
