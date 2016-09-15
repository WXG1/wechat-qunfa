
var msg = '亲爱的@NAME@,中秋快乐！'

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
