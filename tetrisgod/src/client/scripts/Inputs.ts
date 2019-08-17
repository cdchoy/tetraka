// client/ts/Inputs.ts

// https://keycode.info/
document.onkeydown = function(event) {
	if (event.keyCode === 37)  // arrowLeft
		socket.emit('keyPress',{inputId:'left',state:true});
	else if (event.keyCode === 38)  // arrowUp
		socket.emit('keyPress',{inputId:'up',state:true});
	else if (event.keyCode === 39)  // arrowRight
		socket.emit('keyPress',{inputId:'right',state:true});
	else if (event.keyCode === 40)  // arrowDown
		socket.emit('keyPress',{inputId:'down',state:true});
	else if (event.keyCode === 32)  // spacebar
		socket.emit('keyPress',{inputId:'space',state:true});
	else if (event.keyCode === 16)  // shift
		socket.emit('keyPress',{inputId:'shift',state:true});
}

document.onkeyup = function(event) {
	if (event.keyCode === 37)  // arrowLeft
		socket.emit('keyPress',{inputId:'left',state:false});
	else if (event.keyCode === 38)  // arrowUp
		socket.emit('keyPress',{inputId:'up',state:false});
	else if (event.keyCode === 39)  // arrowRight
		socket.emit('keyPress',{inputId:'right',state:false});
	else if (event.keyCode === 40)  // arrowDown
		socket.emit('keyPress',{inputId:'down',state:false});
	else if (event.keyCode === 32)  // spacebar
		socket.emit('keyPress',{inputId:'space',state:false});
	else if (event.keyCode === 16)  // shift
		socket.emit('keyPress',{inputId:'shift',state:false});
}
