import $ from 'jquery';

class Interface{
	//期号issue

	//获取遗漏数据接口
	getOmit(issue){
		let self=this;
		return new Promise((resolve, reject) => {
			$.ajax({
				url:'/get/omit',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(res){
					self.setOmit(res.data);
					resolve.call(self,res)
				},
				error:function(err){
					reject.call(err);

				}
			})
		});
	}
	//获取开奖号码接口
	getOpenCode(issue){
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
