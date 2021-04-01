/**验证码 */
var canvas = document.getElementById("canvas"); //获取canvas，以进行绘制
			var context = canvas.getContext("2d"); //舞台，getContext() 方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性。
			
			var arr = [] //定义一个数组用来一个一个的接收draw()函数中txt产生的1随机数
			draw();//直接调用绘制函数

			function getColor() {// 随机颜色函数
				var r = Math.floor(Math.random() * 256);
				var g = Math.floor(Math.random() * 256);
				var b = Math.floor(Math.random() * 256);
				return "rgb(" + r + "," + g + "," + b + ")";
			}
			function draw() {//绘制函数
				context.strokeRect(0, 0, 120, 40); //绘制矩形（无填充）(这里表示相对于canvas的0，0位置；宽120，高40处绘制像素)
				var aCode = ["0","1","2","3","4","5","6","7","8","9",
				"a","b","c","d","e","f","h","i","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z"];
				// 绘制的字母
				
				for (var i = 0; i < 4; i++) {//产生4个随机数
					var x = 20 + i * 20; //每个字母之间间隔20
					var y = 20 + 10 * Math.random(); //y轴方向位置为20-30随机
					var indexes = Math.floor(Math.random() * aCode.length); //产生随机索引值
					var txt = aCode[indexes];//根据随机索引值获取一个随机数
					
					context.font = "bold 20px 微软雅黑"; //设置或返回文本内容的当前字体属性
					context.fillStyle = getColor(); //设置或返回用于填充绘画的颜色、渐变或模式，随机
					context.translate(x, y); //重新映射画布上的 (0,0) 位置，字母不可以旋转移动，所以移动容器
					var deg = 90 * Math.random() * Math.PI / 180; //0-90度随机旋转
					context.rotate(deg); // 	旋转当前绘图
					context.fillText(txt, 0, 0); //在画布上绘制“被填充的”文本
					context.rotate(-deg); //将画布旋转回初始状态
					context.translate(-x, -y); //将画布移动回初始状态
					arr[i] = txt //1个1个的接收产生的随机数
				}
				for (var i = 0; i < 8; i++) {// 绘制干扰线条
					context.beginPath(); //起始一条路径，或重置当前路径
					context.moveTo(Math.random() * 120, Math.random() * 40); //把路径移动到画布中的随机点，不创建线条
					context.lineTo(Math.random() * 120, Math.random() * 40); //添加一个新点，然后在画布中创建从该点到最后指定点的线条
					context.strokeStyle = getColor(); //随机线条颜色
					context.stroke(); // 	绘制已定义的路径
				}
				for (var i = 0; i < 20; i++) {// 绘制干扰点，和上述步骤一样，此处用长度为1的线代替点
					context.beginPath();
					var x = Math.random() * 120;
					var y = Math.random() * 40;
					context.moveTo(x, y); //把路径移动到画布中的随机点，不创建线条
					context.lineTo(x + 1, y + 1);
					context.strokeStyle = getColor();
					context.stroke(); // 	绘制已定义的路径
				}
			}
			canvas.onclick = function() {//点击进行重画，即生成新的验证码
				context.clearRect(0, 0, 120, 40); //在给定的矩形内清除指定的像素(这里表示相对于canvas的0，0位置；宽120，高40处清除绘制像素)
				draw();//调用绘制函数进行绘制
            }
            





function checkVer() { //验证码是否正确的函数
    var ver = document.getElementById("ver-code").value; //获取输入框的值
	var num = arr[0] + arr[1] + arr[2] + arr[3] ////定义容器num接收验证码,将产生的验证码放入num;这里的arr数组就是login页面的arr[]数组
	console.log('ver'+ver);
	console.log('num'+num);
	
    if (ver == "") {
        document.getElementById("error-ver").innerHTML = "输入为空!!!";
		document.getElementById("error-ver").style = "color: red";
		return false;
	}
	if (ver != num) {
        document.getElementById("error-ver").innerHTML = "验证码错误!!!";
		document.getElementById("error-ver").style = "color: red";
		return false;
	} else {
		document.getElementById("error-ver").innerHTML = "输入正确";
		document.getElementById("error-ver").style = "color: green";
		return true;
	}

}


/**登录提交验证 */
function chekLogin() { //验证submit能否提交的函数
    var flag = checkVer();
    if( flag ) {
        return true;
    } else {
        return false;
    }
}








