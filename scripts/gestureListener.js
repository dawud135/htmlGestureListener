window.Code = (function(Code) {
	Code.GestureCatcher = function (targetEl) {
		try {
			var instance = {};

			//public member
			instance.targetElement = null,
			instance.eventInProgress = false,
			instance.firstX = 0,
			instance.firstY = 0,
			instance.lastX = 0,
			instance.lastY = 0,
			instance.start = null,
			instance.end = null,
			lastTapData = null;
			
			//private member
			var onhorizontalswipe = null,
				onverticalswipe = null,
				onmoveswipe = null,
				ontap = null,
				ondoubletap = null;

			var setTargetElement = function( element ) {
											instance.targetElement = element;
											
											// Event handlers for mouse interaction
											instance.targetElement.onmousedown = function(event) {
												event.preventDefault();
												doOnStart(event.clientX, event.clientY, "onmousedown");
											}
											instance.targetElement.onmousemove = function(event) {
												event.preventDefault();
												doOnMove(event.clientX, event.clientY, "onmousemove");
											}
											instance.targetElement.onmouseup = function(event) {
												event.preventDefault();
												doOnEnd(event.clientX, event.clientY, "onmouseup");
											}
											
											// Event handlers for touch screen interaction
											instance.targetElement.ontouchstart = function(event) {
												event.preventDefault();
												var touchEvent = event.changedTouches[0];
												doOnStart(touchEvent.pageX, touchEvent.pageY, "ontouchstart");
											}
											instance.targetElement.ontouchmove = function(event) {
												event.preventDefault();
												var touchEvent = event.changedTouches[0];
												doOnMove(touchEvent.pageX, touchEvent.pageY, "ontouchmove");
											}
											instance.targetElement.ontouchend = function(event) {
												event.preventDefault();
												var touchEvent = event.changedTouches[0];
												doOnEnd(touchEvent.pageX, touchEvent.pageY, "ontouchend");
											}
										};
				/**
				doOnStart - handler for both mousedown and touchstart events. 
					1) Record the starting position of the swipe.
				*/
				var doOnStart = function( x, y, eventname ) {
						//alert("doOnStart" + eventname + ": (x, y) = " + x + ", " + y );
						instance.eventInProgress = true;
						start = new Date();
						firstX = x;
						firstY = y;
						lastX = x;
						lastY = y;		
				};


				/**
				doOnMove - handler for both mousemove and touchmove events:
					1) Record the current position of an active swipe.
				*/
				var doOnMove = function ( x, y, eventname ) {
					if (instance.eventInProgress) {
						lastX = x;
						lastY = y;			
								
						if (instance.eventInProgress && onmoveswipe !== null) {
								var duration = 0;
								var dX = lastX - firstX;
								var dY = lastY - firstY;

								//var e = new gestureData((dX > 0 ? 1 : -1), dX, duration);
								var e = {'startX': firstX, 'startY': firstY, 'lastX': lastX, 'lastY': lastY};
								onmoveswipe(e);
						}
					}
				};

				/**
				doOnEnd - handler for both mouseup and touchend events:
					1) Caculate the change in X position and the change in Y position.
					2) Determine if swipe direction is horizontal or vertical.
					3) Determine if swipe distance exceeds a minimum threshold.
				*/
				var doOnEnd = function ( x, y, eventname ) {
									//Tune these values to your liking. This represents an appropriate minimum distance a swipe must travel before 
									//the event is determined to have occured.
									var thresholdX = screen.width * 0.03;	//3% of screen height/width is a good start
									var thresholdY = screen.height * 0.03;
									var tapDurationThreshold = 100; //duration between touch start and end in a tab
									var doubleTapDurationThreshold = 300; //duration betwen two tab

										//alert("doOnEnd", eventname + ": (x, y) = " + x + ", " + y, debug.info);
										instance.eventInProgress = false;
										end = new Date();
										var duration = end.getTime() - start.getTime();
										var dX = lastX - firstX;
										var dY = lastY - firstY;

										if (Math.abs(dX) > Math.abs(dY)) 
										{
											// If the change in the start/end X coordinates is greater than 
											//the change in start/end Y coordinates, this is a horizontal swipe
											if (Math.abs(dX) > thresholdX)
											{
												//An actual horizontal swipe occurs when the change in start/end X coordinates is greater than a minimum threshold
												
												if (onhorizontalswipe === null) { return false; }
												var e = new gestureData((dX > 0 ? 1 : -1), dX, duration);
												onhorizontalswipe(e);
												
											} else {
												//couse the dx is less than the threshodX then we assumed this is a tab action, the duration must be considered to
												if(duration < tapDurationThreshold ) {
													var ts = (new Date()).getTime();

													// if the duration between two last tab is closed enough then this is a double tab
													if (lastTapData !== null && (ts - lastTapData.ts < doubleTapDurationThreshold)) {
														if (ondoubletap === null) { return false; }
														var e = new gestureData((dY > 0 ? 1 : -1), dY, duration);
														ondoubletap(e);
													} else {
														if (ontap === null) { return false; }
														var e = new gestureData((dY > 0 ? 1 : -1), dY, duration);
														ontap(e);
													}
														
													lastTapData = {'data': e, 'ts': ts};				}
											}		
										} 
										else {
											// If the change in the start/end Y coordinates is greater than the change in start/end X coordinates, 
											// this is a vertical swipe
											if (Math.abs(dY) > thresholdY)
											{
												//An actual vertical swipe occurs when the change in start/end Y coordinates is greater than a minimum threshold
												//alert("doOnEnd", eventname + " :" + (dY > 0 ? "Down" : "Up") + " vertical swipe detected", debug.info);
												
												if (onverticalswipe === null) { return false; }
												var e = {};
												var e = new gestureData((dY > 0 ? 1 : -1), dY, duration);
												onverticalswipe(e);				
											} else {
												//couse the dY is less than the threshodY then we assumed this is a tab action, the duration must be considered to
												if(duration < tapDurationThreshold ) {

													var ts = (new Date()).getTime();

													// if the duration between two last tab is closed enough then this is a double tab
													if (lastTapData !== null && (ts - lastTapData.ts < doubleTapDurationThreshold)) {
														if (ondoubletap === null) { return false; }
														var e = new gestureData((dY > 0 ? 1 : -1), dY, duration);
														ondoubletap(e);
													} else {
														if (ontap === null) { return false; }
														var e = new gestureData((dY > 0 ? 1 : -1), dY, duration);
														ontap(e);
													}
														
													lastTapData = {'data': e, 'ts': ts};
												}
											}
										}
								};

	

				var gestureData = function(direction, distance, duration) {
					var instance = {};

					instance.direction = direction;
					instance.distance = distance;
					instance.duration = duration;

					return instance;
				};
				
				//public member
				instance.setHorizontalHandler = function( callback ) {
					onhorizontalswipe = callback;
				};

				instance.setVerticalHandler = function( callback ) {
					onverticalswipe = callback;
				};

				instance.setOnMoveHandler = function( callback ) {
					onmoveswipe = callback;
				};

				instance.setOnTapHandler = function( callback ) {
					ontap = callback;
				};

				instance.setOnDoubleTapHandler = function( callback ) {
					ondoubletap = callback;
				};
			
				setTargetElement(targetEl);
			return instance;
	 } catch(err) {
		alert(err);
	 }
	};

	return Code;
}(window.Code || {}));


/* 
 *	Supporting Horizontal & Vertical Swipe gestures in BlackBerry 6 or Taplet OS browser:
 *
 *	1) Include reference to "swipeevents.js" JavaScript library.
 *
 *  2) Define the target element to listen for swipe events using the setTargetElement method
 *
 *	3) Define local callback functions raised when vertical & horizontal swipe events occur
 *		These functions can have the following signature: function(e) { ... }
 *		The single parameter e has the following properties: direction, distance, duration
 */


function doTouch(e)
{
	/* block page scrolling so as not to interfere with the swipe gestures */
	e.preventDefault();
}

//document.addEventListener("touchstart", doTouch,  false);
document.addEventListener("touchmove",  doTouch,  false);
//document.addEventListener("touchend",   doTouch,  false);
