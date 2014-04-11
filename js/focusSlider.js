

function focus(){
	var auto=null;
	var timer=null;
	var aTime,sTime,target;
	var oImg;
	var oImgLi;
	this.init = function(){

		this.aTime = this.aTime || 10;
		this.sTime = this.sTime || 5000;
		this.target = 0;
		
		this.oImg=document.getElementById('focus_m').getElementsByTagName("ul")[0];
		this.oImgLi=this.oImg.getElementsByTagName("li");
		
		this.createTextDom();
		this.autoMove();
		this.oAction();
	};
	
	this.createTextDom = function(){
		this.oText=document.createElement("div");
		this.oText.className="dotstyle dotstyle-fillin";
		var ul=document.createElement('ul');
		var frag=document.createDocumentFragment();
		for (var i=0;i<this.oImgLi.length;i++) {
			var li=document.createElement("li");
			li.innerHTML='<b></b>';
			if (i==0) {
				li.className="current";
			};
			frag.appendChild(li);
		};
		ul.appendChild(frag);
		this.oText.appendChild(ul);
		this.o.insertBefore(this.oText,this.o.firstChild);

		this.oTextLi=this.oText.getElementsByTagName("li");		
	};
	
	this.autoMove = function(){
		var that = this;
		auto=setInterval(function(){that.goNext()},that.sTime);
	};
	
	this.goNext = function() {
		this.target=this.nowIndex();
		this.target==this.oTextLi.length-1 ? this.target=0:this.target++;
		this.aStep=(this.target-this.nowIndex())*this.step;
		this.removeClassName();
		this.oTextLi[this.target].className="current";
		this.startMove();
	};
	
	this.goPrev = function() {
		this.target=this.nowIndex();
		this.target==0 ? this.target=this.oTextLi.length-1 : this.target--;
		this.aStep=(this.target-this.nowIndex())*this.step;
		this.removeClassName();
		this.oTextLi[this.target].className="current";
		this.startMove();
	};
	
	this.startMove = function (){
		var that=this;
		var t=0;
		this.timer='';
		function set(){
			if (t>100) {
				clearInterval(that.timer);
			}else {
				for (var i=0;i<that.oImgLi.length;i++) {
					that.oImgLi[i].style.display='none';
				};
				that.oImgLi[that.target].style.display='block';
				that.setOpacity(that.oImg,t);
				t+=5;
			};
		};
		timer=setInterval(set,that.aTime);
	};
	
	this.setOpacity = function(elem,level){
		if(elem.filters){
			elem.style.filter = 'alpha(opacity=' + level + ')';
			elem.style.zoom = 1;
		} else {
			elem.style.opacity = level / 100;
		};
	};
	
	this.nowIndex = function(){
		for (var i=0;i<this.oTextLi.length;i++) {
			if (this.oTextLi[i].className=='current') {
				return i;
				break;
			}
		};
	};
	
	this.oAction = function(){
		var that=this;
		for (var i=0;i<this.oTextLi.length;i++) {
			this.oTextLi[i].index=i;
			this.oTextLi[i].onclick=function(){
				clearInterval(auto);
				clearInterval(timer);
				that.setOpacity(that.oImg,100);
				that.target=this.index;
				that.removeClassName();
				this.className='current';
				that.startMove();
			}
		};
		mouseEnter (that.o,'mouseleave',function(e){
				clearInterval(auto);
				that.autoMove();
			}
		);
		/*
		this.oL.onclick=function(){
			that.goPrev();
		};
		this.oR.onclick=function(){
			that.goNext();
		};*/
	};
	
	this.removeClassName = function(){
		for (var i=0;i<this.oTextLi.length;i++) {
			this.oTextLi[i].className=""
		};
	};
}

var focusRun=new focus();
focusRun.o=document.getElementById("focus");
function mouseEnter(ele,type,func){
	if(window.document.all)	
		ele.attachEvent('on'+type,func);
	else{//ff
		if(type==='mouseenter')
			ele.addEventListener('mouseover',this.withoutChildFunction(func),false);
		else if(type==='mouseleave')
			ele.addEventListener('mouseout',this.withoutChildFunction(func),false);
		else
			ele.addEventListener(type,func,false);		
	};
};
function withoutChildFunction(func){
	return function(e){
		var parent=e.relatedTarget;
		while(parent!=this&&parent){
			try{
				parent=parent.parentNode;}
			catch(e){
				break;
			}
		}
		if(parent!=this)
		func(e);
	};
};
