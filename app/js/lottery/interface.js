import $ from 'jquery';

//3个通信接口：获取遗漏数据，获取开奖号码，获取当前状态
class Interface{
	//期号issue

	//获取遗漏数据接口
	getOmit(issue){
		//获取当前对象
		let self=this;
		return new Promise((resolve, reject) => {
			$.ajax({
				url:'/get/omit',//接口地址
				data:{//参数
					issue:issue
				},
				dataType:'json',//数据类型
				success:function(res){//通信成功
					self.setOmit(res.data);//保存后台数据
					resolve.call(self,res)
				},
				error:function(err){//通信失败
					reject.call(err);

				}
			})
		});
	}
	//获取开奖号码接口
	getOpenCode(issue){
		//获取当前对象
		let self=this;
		return new Promise((resolve, reject) => {
			$.ajax({
				url:'/get/opencode',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(res){
					self.setOpenCode(res.data);
					resolve.call(self,res)
				},
				error:function(err){
					reject.call(err);
				}
			})
		});


	}
	//获取当前状态接口
	getState(issue){
		let self=this;
		return new Promise((resolve, reject) => {
			$.ajax({
				url:'/get/state',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(res){
					resolve.call(self,res)
				},
				error:function(err){
					reject.call(err);
				}
			})
		});


	}
}

export default Interface
