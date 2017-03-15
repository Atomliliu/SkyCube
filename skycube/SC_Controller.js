

THREE.SC_Controller = function ( dom, css, width, height ) {
	var root = this;
	this.enabled = true;
	this.controllers = [];
	/* Outermost DOM Element*/
	this.domElement = document.createElement('div');
	dom.appendChild(this.domElement);
	setCSS(this.domElement,css);

	function setCSS(elem, css){
		if(css!=undefined && css!="") elem.setAttribute('class', css);
	}

	function addElement(parentDom, elemTag, elemType, eventType, options){
		var cb = document.createElement(elemTag);
    	cb.setAttribute('type', elemType);

    	//var precision = options.precision || 0;
    	var id = options.id;
    	var css = options.css;
	    var min = options.min;
	    var step = options.step;
	    var value = options.value;
	    var max = options.max;
	    var checked = options.checked;
	    //var eventType = options.eventType || 1;
	    var callBack = options.callBack;

	    setCSS(cb,css);

	    if (cb.value!=undefined) cb.value = value;
    	
    	//cb.precision = precision;
	    if (cb.min!=undefined) cb.min = min;
	    if (cb.step!=undefined) cb.step = step;
	    if (cb.max!=undefined) cb.max = max;
	    if (cb.checked!=undefined) cb.checked = checked;



    	if(id!=undefined && id!="" && id!=false) cb.id = id;

    	if(parentDom==undefined) parentDom = dom;
    	parentDom.appendChild(cb);
    	if (eventType==0) cb.onchange = callBack;
    	if (eventType==1) cb.onclick = callBack;
    	if (eventType==2) cb.oninput = callBack;
    	root.controllers.push(cb);
    	return cb;
	}

	this.addCheckBox = function (parentDom, options){
		return addElement(parentDom, "input", 'checkbox', 0, options);
		
	};

	/*this.addCheckBoxLabeled = function (parentDom, css, value, id, text, callBack){
		root.addLabel(parentDom, css, id, text);
		return addElement(parentDom, css, "input", 'checkbox', value, id, 0, callBack);
		
	};*/

	this.addButton = function (parentDom, options){
		return addElement(parentDom, "input", 'button', 1, options);
		
	};

	this.addRadio = function (parentDom, options){
		return addElement(parentDom, "input", 'radio', 0, options);
		
	};

	this.addNumber = function (parentDom, options){
		return addElement(parentDom, "input", 'number', 0, options);
		
	};

	this.addRange = function (parentDom, options){
		return addElement(parentDom, "input", 'range', 0, options);
		
	};

	this.addText = function (parentDom, options){
		return addElement(parentDom, "input", 'text', 0, options);
		
	};

	this.addLabel = function (parentDom, css, bound, text){
		var lb = document.createElement('label');
    	if(bound!=undefined && bound!="" && bound!=false) lb.setAttribute('for', bound);
    	setCSS(lb,css);
    	lb.innerHTML = text;

    	if(parentDom==undefined) parentDom = dom;
    	parentDom.appendChild(lb);
    	root.controllers.push(lb);
    	return lb;
	};

};

THREE.SC_Controller.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_Controller.prototype.constructor = THREE.SC_Controller;
