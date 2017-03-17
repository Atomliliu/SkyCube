//

SCFL_CubeViewportHUD = function ( width, height, imgFile, renderer ) {
	//this.img = imgFile;
	this.enabled = false;
	this.console = undefined;

	this.uiCubeFormat;
	this.uiFlipULabel;
	this.uiFlipU;
	this.uiExport;
	this.uiRotateU;
	this.uiRotateV;

	//var imgWidth = this.img.width;
	//var imgHeight = this.img.height;
	var divMenu = undefined;
	var enabledMenu = false;

	var root = this; 
	this.width;
	this.height;
	if(width == undefined){
		this.width = window.innerWidth;
	}
	else{
		this.width = width;
	}

	if(height == undefined){
		this.height = window.innerHeight;
	}
	else{
		this.height = height;
	}


	function setupMenuTab() {
		divMenu = document.createElement("div");
		divMenu.id = "cubeMenu";
		divMenu.setAttribute("class", "menu");

		var divIcon = document.createElement("div");
		divIcon.setAttribute("class", "menu_icon");
		divIcon.onclick=function(){
			this.classList.toggle("change"); 
			if (enabledMenu) {closeMenu();}
			else {openMenu();}
		};

		var divIcon1 = document.createElement("div");
		var divIcon2 = document.createElement("div");
		var divIcon3 = document.createElement("div");

		divIcon1.setAttribute("class", "bar1");
		divIcon2.setAttribute("class", "bar2");
		divIcon3.setAttribute("class", "bar3");

		divIcon.appendChild(divIcon1);
		divIcon.appendChild(divIcon2);
		divIcon.appendChild(divIcon3);

		divMenu.appendChild(divIcon);
		
		document.body.appendChild(divMenu);

		
	}

	function setupBlock(css){
		var divBlock = document.createElement("div");
		
		if(css) divBlock.setAttribute("class", css);
		divMenu.appendChild(divBlock);
		return divBlock;
	}

	function setupMenu() {
		if(divMenu === undefined) return false;
		root.console = new THREE.SC_Controller(divMenu, "menu_console");


		//root.uiCubeFormat = root.console.addList(divMenu,{id: "flip", "menu_content _inline"})
		//root.console.addSpace(divMenu,2);

		root.uiFlipULabel = root.console.addLabel(divMenu,"menu_content _inline", "flip", "Flip" );
		root.uiFlipU = root.console.addCheckBox(divMenu, {id: "flip", css: "menu_content _inline", checked: false, callBack: function(){console.log("chk");}});
		root.console.addSpace(divMenu,2);
		
		root.uiRotateULabel = root.console.addLabel(divMenu,"menu_content _inline", "rotate_u", "Rotate U" );
		root.uiRotateU = root.console.addRange(divMenu, {id: "rotate_u",css: "menu_content _inline", value: 0, min:-180, max:180, callBack: function(){console.log("range");}});
		root.console.addSpace(divMenu,1);

		root.uiRotateVLabel = root.console.addLabel(divMenu,"menu_content", "rotate_v", "Rotate V" );
		root.uiRotateV = root.console.addRange(divMenu, {id: "rotate_v",css: "menu_content _inline", value: 0, min:-180, max:180, callBack: function(){console.log(root.uiRotateV.value);}});

		
		root.uiExport = root.console.addButton(setupBlock("_buttom"), {css: "menu_content _block button buttonLoad menu_button", value: "Export", callBack: root.onExport});

	}

	this.onExport;

	var initWidth = "auto";
	var initHeight = "auto";


	function visibleMenu(vis){
		var opa = 0.0;
		if(vis == "visible") opa = 1.0;
		for(var n=0;n<root.console.controllers.length;n++){
			root.console.controllers[n].style.visibility = vis;
			root.console.controllers[n].style.opacity = opa;
		}
	}

	function openMenu(){
		//;
		initWidth = divMenu.style.width;
		initHeight = divMenu.style.height;

		divMenu.style.width = "250px";
		divMenu.style.height = (root.height.toString()+"px");
		/*
		root.uiFlipULabel.style.visibility = "visible";
		root.uiFlipU.style.visibility = "visible";
		root.uiExport.style.visibility = "visible";*/

		visibleMenu("visible");
		enabledMenu = true;
	}

	function closeMenu(){
		//;
		divMenu.style.width = initWidth;
		divMenu.style.height = initHeight;

		/*
		root.uiFlipULabel.style.visibility = "hidden";
		root.uiFlipU.style.visibility = "hidden";
		root.uiExport.style.visibility = "hidden";*/

		visibleMenu("hidden");
		enabledMenu = false;
	}


	//this.onRTTUpdated = undefined;




	function activate() {

		setupMenuTab();
		setupMenu();

		//if(divModal === undefined){
		//	loadjscssfile("js/skycube/CSS/SC_InputPanoramaFormatModal.css","css");
		//}
		
		//checkFormatType();
		//setupFormatWindow();
		//shown();

	}

	function shown(){
		divMenu.style.display = "block";
	}

	function hide(){
		divMenu.style.display = "none";
	}

	function deactivate() {
		hide();
		//removeElements(divModal);
		//document.body.removeChild(divModal);
		//this.enabled = false;
	}

	function dispose() {
		deactivate();
	}

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
	this.shown = shown;
	this.hide = hide;

};

/*animation
function move() {
  var elem = document.getElementById("myBar");   
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}
*/
