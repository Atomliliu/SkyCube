THREE.SC_CubeViewport = function ( texCube, width, height, fov, renderer ) {
	var root = this;
	this.enabled = true;

	this.camera; 
	this.scene; 
	this.controls;// = controls;

	var container, skyBox;
	this.texCube = texCube;
	this.materialsCube = [];

/*
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
	*/

	//Init
	

	this.camera = new THREE.PerspectiveCamera( fov, width / height, 1, 1100 );
	this.camera.position.z = 100;
	//camera.target = new THREE.Vector3( 0, 0, 0 );


	
	/*controls.enableDamping = true;
	controls.dampingFactor = 0.3;
	controls.enableZoom = true;
	controls.enablePan = false;*/

	this.scene = new THREE.Scene();
	this.onRender;
	/*this.activate=function(){
		
	};*/

	init();
	//animate();
	//render();
	

	

	function init() {

		for ( var i = 0; i < 6; i ++ ) {
			root.materialsCube.push( new THREE.MeshBasicMaterial( { map: root.texCube[ i ].texture} ) );
		}

		skyBox = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), new THREE.MeshFaceMaterial( root.materialsCube ) );//new THREE.Mesh( skyGeo, materialSkyBox );
		skyBox.applyMatrix( new THREE.Matrix4().makeScale( 1, 1,  -1 ) );

		root.scene.add( skyBox );
	}

	this.renderView = renderView;
	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
	this.disableControls = disableControls;
	this.enableControls = enableControls;
	this.asBackground = asBackground;
	this.asNormal = asNormal;
	this.onResize= onResize;

	this.setCubeQuaternion = function(axis,angle){
		var quaternion = new THREE.Quaternion();
		quaternion.setFromAxisAngle( axis, THREE.Math.degToRad(angle) );
		skyBox.quaternion = quaternion;
	};

	this.setCubeRotation = function(axis,angle){
		skyBox.rotateOnAxis( skyBox.worldToLocal(axis), THREE.Math.degToRad(angle) );
	};

	function activate(){
		root.enabled = true;
		root.controls = new THREE.OrbitControls( root.camera, renderer.domElement );
	}

	function deactivate(){
		root.controls.dispose();
		root.enabled = false;
		//root = undefined;
		renderer.clear();
	}

	function dispose(){
		deactivate();
	}

	function disableControls(){
		root.controls.enabled = false;
	}

	function enableControls(){
		root.controls.enabled = true;
	}

	function asBackground(){

		for ( var i = 0; i < root.materialsCube.length; i ++ ) {
			if(root.materialsCube[i] != undefined && root.materialsCube[i].isMaterial){
				root.materialsCube[i].transparent = true;
				root.materialsCube[i].opacity = 0.5;
			}
			
		}

	}

	function asNormal(){

		for ( var i = 0; i < root.materialsCube.length; i ++ ) {
			if(root.materialsCube[i] != undefined && root.materialsCube[i].isMaterial){
				root.materialsCube[i].transparent = false;
				root.materialsCube[i].opacity = 1.0;
			}
			
		}

	}


	function animate() {
		requestAnimationFrame( animate );
		update();
	}


	function renderView() {
		if (root.enabled == false) return;
		root.controls.update();
		renderer.render( root.scene, root.camera );

		//if (root.onRender) {root.onRender(renderer);}
	}

	function onResize(width, height) {
		root.camera.aspect = width / height;
		root.camera.updateProjectionMatrix();

		renderer.setSize( width, height );

	}

};

THREE.SC_CubeViewport.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.SC_CubeViewport.prototype.constructor = THREE.SC_CubeViewport;
