const express = require('express'),
  path = require('path'),
  router = express.Router(),
  ueditor = require('ueditor');

router.use("/ue",ueditor(path.resolve(__dirname, '../../dist'),function (req,res,next){
  //客户端上传文件设置
  let ActionType = req.query.action;
  if(ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo'){
    let file_url = '/image/ueditor/';//默认图片上传地址
    /*其他上传格式的地址*/
    if(ActionType === 'uploadfile'){
      file_url = '/file/ueditor/'; //附件
    }
    if(ActionType === 'uploadvideo'){
      file_url = '/video/ueditor/'; //视频
    }
    res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    res.setHeader('Content-Type','text/html');
  }
  //  客户端发起图片列表请求
  else if(req.query.action === 'listimage'){
    let dir_url = '/image/ueditor/';
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }else if(req.query.action === 'listfile'){
    let dir_url = '/file/ueditor/';
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else{
    res.setHeader('Content-Type','application/json');
    res.redirect('/static/ueditor/nodejs/config.json');
  }
}));

module.exports = router;
