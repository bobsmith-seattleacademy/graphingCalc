var k = 25, ctx, a = 0, b = 0, c = 0, vX = 0, vY = 0, r = 0, w, h;
function init() {
  canvas= document.getElementById("mycanvas");
  ctx = canvas.getContext("2d");
  w = canvas.width = 600;
  h = canvas.height = 400;

  console.log('canvas is loaded into context',w);
  
  graphpaper(0);
  //window.onload = setInterval(graphpaper,40);

}

function zoom() {
	ctx.clearRect(0, 0, w, h);
	if(k-5 < h/2)
	{
		k += 10;
	}	
	graphpaper(0);
	results();
	
}

function zoomout() {
	ctx.clearRect(0, 0, w, h);
	if(k-5 > 0)
	{
		k -= 5;
	}	
	graphpaper(0);
	results();
}

function results() {
  // finding vertext and displaying symline and yint results
  ctx.lineWidth = 3;
  vX = -(b*1)/(2*a);
  vX = vX.toFixed(2);
  vY = plugX(vX);
  vY = vY.toFixed(2);
  console.log(vY,vX);
  $("#vertex").text("Vertex is at (" + vX+","+vY+")");
  $("#symLine").text("Symmetry line is at x="+vX);
  $("#yint").text("The y-intercept is at (0,"+ c +")");

  d = b**2-4*a*c;
  x1 = (-b+Math.sqrt(d))/(2*a);
  x1 = Math.round(x1*100)/100;
  $("#solution1").text("The X intercept is at ("+x1+",0)");

  x2 = (-b-Math.sqrt(d))/(2*a);
  x2 = Math.round(x2*100)/100;
  $("#solution2").text("The Second X intercept is at ("+x2+",0)");

  ctx.strokeStyle= "rgb(0,0,0)";
  graphQuad();
  
  graphpaper(0);

  symline(vX);


  ctx.beginPath();
  ctx.arc(scaledX(0),scaledY(plugX(0)),4,0,6.28);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(scaledX(vX),scaledY(vY),4,0,6.28);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(scaledX(2*vX),scaledY(c),4,0,6.28);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(scaledX(x1),scaledY(0),4,0,6.28);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(scaledX(x2),scaledY(0),4,0,6.28);
  ctx.fill();

  

}

function graphQuad () {

  ctx.lineWidth = 1;

	ctx.clearRect(0, 0, w, h);
  for (var i = 0; i < w; i++) {
  	
    x = (w/2-i)/k;
    nx = (w/2-(i+1))/k;

    ctx.beginPath();
    
    ctx.moveTo(scaledX(x),scaledY(plugX(x)));
    ctx.lineTo(scaledX(nx),scaledY(plugX(nx)));
    ctx.stroke();

    



  } // end for loop
}  // end graphQuad

function symline (s) {
  ctx.lineWidth= 4;
  ctx.strokeStyle= "rgba(100,200,255)";
  ctx.setLineDash([10,5]);
  ctx.beginPath();
  ctx.moveTo(w/2+(s*k),0);
  ctx.lineTo(w/2+(s*k),h);
  ctx.stroke();
  ctx.setLineDash([0]);
}

function scaledX(x) {
	newx = w/2+x*k;
	return newx;
}

function scaledY(y) {
	newy = h/2-y*k;
	return newy;
}

function QF() {
  // getting values to do quadratic formula
  a = $("#quadA").val();
  b = $("#linB").val();
  c = $("#constant").val();
  console.log(a,b,c);
  results();
  
}

function plugX(x) {
	y = a*Math.pow(x,2)+b*x+c*1;
	return y;
}

function lines(x, x2, y, y2, rotat)
{
ctx.beginPath();
ctx.moveTo(x+rotat, y+rotat);
ctx.lineTo(x2, y2);
ctx.stroke();
}

function graphpaper(rotatl) {
  // the x and y axis drawn
  
  ctx.beginPath();
  ctx.moveTo(w/2, 0);
  ctx.lineTo(w/2, h)
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, h/2);
  ctx.lineTo(w, h/2);
  ctx.stroke();


for(i=0; i<w/(2*k); i++)
{
lines(w/2+i*k, w/2+i*k, 0, h, rotatl);
lines(w/2-i*k, w/2-i*k, 0, h, rotatl);
}



for(i=0; i<h/(2*k); i++)
{
lines( 0, w,h/2+i*k, h/2+i*k, rotatl);
lines( 0, w,h/2-i*k, h/2-i*k, rotatl);
}





}

function reset() {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle= "rgba(0,0,0)";
  ctx.lineWidth= 1;
  graphpaper(0);
}

//var reotat = 0;
//setInterval(function() { 


//graphpaper(reotat);

//reotat++;

//}, 50);