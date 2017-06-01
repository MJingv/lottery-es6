import 'babel-polyfill';
import Base from '../js/lottery/base.js';
import Calculate from '../js/lottery/calculate.js';
import Interface from '../js/lottery/interface';
import Timer from '../js/lottery/timer.js';
import $ from 'jquery';

//实现多重继承
const copyProperties=function(target,source){
	//深度拷贝(目标，原对象)
	for(let key of Reflect.ownKeys(source)){
		//ownKeys拿到所有属性
		if (key!=='constructor'&&key!=='prototype'&&key!=='name') {
			//选择性拷贝:有构造函数，原型，name
			let desc=Object.getOwnPropertyDescriptor(source,key);
			Object.defineProperty(target, key, desc);

		}
	}
}

const mix=function (...mixins) {
	class Mix{}
	for(let mixin of mixins){
		copyProperties(Mix,mixin);//深度拷贝类
		copyProperties(Mix.prototype,mixin.prototype);//拷贝原型
	
		}
		return Mix;

 	}
class Lottery extends mix (Base,Calculate,Interface,Timer){
 		constructor(name='syy',cname='11选5',issue='**',state='**') {
 			super();
 			this.name=name;
 			this.cname=cname;
 			this.issue=issue;
 			this.state=state;
 			this.el='';//选择器
 			this.omit=new Map();
 			this.open_code=new Set();
 			this.open_code_list=new Set();
 			this.play_list=new Map();
 			this.number=new Set();
 			this.issue_el="#curr_issue";//期号选择器
 			this.countdown_el='#countdown';
 			this.state_el='.state_el';
 			this.cart_el='.codelist';
 			this.omit_el='';
 			this.cur_play='r5';
 			this.initPlayList();
 			this.initNumber();
 			this.updateState();
 			this.initEvent();
 		}
 		//状态更新
 		updateState(){
 			let self=this;
 			this.getState().then(function  (res) {
 				//用then实现异步操作
 				self.issue=res.issue;//当前期号
 				self.end_time=res.end_time;//当前截止时间
 				self.state=res.state;//当前状态
 				$(self.issue_el).text(res.issue);//在页面中显示更新的期号
 				$(self.state_el).text(res.state);
 				self.countdown(res.end_time,function (time) {
 					$(self.countdown_el).html(time);//在页面中显示更新的倒计时
 				},function(){
 					setTimeout(function(){
 						self.updateState();//获取最新状态

 						self.getOmit(self.issue).then(function(res){
 							//获取最新遗漏

 						});
 						self.getOpenCode(self.issue).then(function(res){
 							//获取最新开奖号
 						})

 					} ,500)
 				})
 			})

 		}
 		//初始化事件
 		initEvent(){
 			let self=this;
 			//玩法切换
 			$('#plays').on('click','li',self.changePlayNav.bind(self));//用bind 改变this指向
 			//号码选中
 			$('.boll-list').on('click','.btn-boll',self.toggleCodeActive.bind(self));
 			//添加号码
 			$('#confirm_sel_code').on('click',self.addCode.bind(self));
 			//操作区大小奇偶
 			$('.dxjo').on('click','li',self.assistHandle.bind(self) );
 			//随机号码(机选)
 			$('.qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self));

 		}
 	}
export default Lottery;
