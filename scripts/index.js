
require(["gestureListener"], function(util) {});

var gestureListener1; 
var gestureListener2;

function do_onload() {
try {
	gestureListener1 = window.Code.GestureCatcher(document.getElementById('gestureListener1'));
	gestureListener2 = window.Code.GestureCatcher(document.getElementById('gestureListener2'));

	gestureListener1.setHorizontalHandler(functionHorizontalHandler1);
	gestureListener1.setVerticalHandler(functionVerticalHandler1);
	gestureListener1.setOnMoveHandler(functionOnMoveHandler1);
	gestureListener1.setOnTapHandler(functionOnTapHandler1);
	gestureListener1.setOnDoubleTapHandler(functionOnDoubleTapHandler1);
	
	gestureListener2.setHorizontalHandler(functionHorizontalHandler2);
	gestureListener2.setVerticalHandler(functionVerticalHandler2);
	gestureListener2.setOnMoveHandler(functionOnMoveHandler2);
	gestureListener2.setOnTapHandler(functionOnTapHandler2);
	gestureListener2.setOnDoubleTapHandler(functionOnDoubleTapHandler2);

} catch(err) {
	alert(err);
}

}

function functionHorizontalHandler1(data){
	var infoDiv = document.getElementById('info1');

	infoDiv.innerHTML = "horizontal swipe " + gestureListener1.eventInProgress;
}
function functionVerticalHandler1(data){
	var infoDiv = document.getElementById('info1');

	infoDiv.innerHTML = "vertical swipe" + gestureListener1.eventInProgress;
}
function functionOnMoveHandler1(data){
	var infoDiv = document.getElementById('info1');

	infoDiv.innerHTML = "move from " + data.startX + ', ' + data.startY + ' into ' + data.lastX + ', ' + data.lastY + '  '  + gestureListener1.eventInProgress;
}
function functionOnTapHandler1(data){	
	var infoDiv = document.getElementById('info1');

	infoDiv.innerHTML = "tap click " + gestureListener1.eventInProgress;
}
function functionOnDoubleTapHandler1(data){	
	var infoDiv = document.getElementById('info1');

	infoDiv.innerHTML = "double tap click " + gestureListener1.eventInProgress;
}


function functionHorizontalHandler2(data){
	var infoDiv = document.getElementById('info2');

	infoDiv.innerHTML = "horizontal swipe";
}
function functionVerticalHandler2(data){
	var infoDiv = document.getElementById('info2');

	infoDiv.innerHTML = "vertical swipe";
}
function functionOnMoveHandler2(data){
	var infoDiv = document.getElementById('info2');

	infoDiv.innerHTML = "move from " + data.startX + ', ' + data.startY + ' into ' + data.lastX + ', ' + data.lastY;
}
function functionOnTapHandler2(data){	
	var infoDiv = document.getElementById('info2');

	infoDiv.innerHTML = "tap click";
}
function functionOnDoubleTapHandler2(data){	
	var infoDiv = document.getElementById('info2');

	infoDiv.innerHTML = "double tap click";
}
