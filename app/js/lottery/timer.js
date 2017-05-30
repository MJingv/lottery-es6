class Timer{
	countdown(end,update,handle){
		const now=new Date().getTime();
		const self=this;
		if(now-end){
			//如果倒计时结束
			handle.call(self);

		}else {
			//如果没有倒计时结束
			let last_time=end-now; //剩余时间
			//变换常量d,h,m,s
			const px_d=1000*60*60*24;
			const px_h=1000*60*24;
			const px_m=1000*60;
			const px_s=1000;
			//动态计算剩余时间d,h,m,s
			let d=Math.floor(last_time/px_d);
			let h=Math.floor((last_time-d*px_d)/px_h);
			let m=Math.floor((last_time-d*px_d-h*px_h)/px_m);
			let s=Math.floor((last_time-d*px_d-h*px_h-m*px_m)/px_s);
			//保存结果到数组中
			let r=[];
			if (d>0) {
				r.push(`<em>${d}</em>天`);
			}
			if (r.length||(h>0)) {
				r.push(`<em>${h}</em>时`);
			}
			if (r.length||(m>0)) {
				r.push(`<em>${m}</em>分`);
			}
			if (r.length||(s>0)) {
				r.push(`<em>${s}</em>秒`);
			}

			self.last_time=r.join('');
			update.call(self,r.join(''));
			setTimeout(function(){
				self.countdown(end,update,handle)
			}, 1000);
			
		}
	}
}
export default Timer