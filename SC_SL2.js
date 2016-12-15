<!DOCTYPE html>
<html lang="en">
	<head>
		<title>three.js webgl - equirectangular panorama</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				background-color: #000000;
				margin: 0px;
				overflow: hidden;
			}

			#info {
				position: absolute;
				top: 0px; width: 100%;
				color: #ffffff;
				padding: 5px;
				font-family:Monospace;
				font-size:13px;
				font-weight: bold;
				text-align:center;
			}

			a {
				color: #ffffff;
			}
		</style>
	</head>
	<body>

		<div id="container"></div>
		<div id="info">
			<a href="http://threejs.org" target="_blank">three.js webgl</a> - equirectangular panorama demo. photo by <a href="http://www.flickr.com/photos/jonragnarsson/2294472375/" target="_blank">Li Liu</a>.<br />
			drag equirectangular texture into the page.
		</div>

		<script src="../build/three.js"></script>
		<script src="js/controls/OrbitControls.js"></script>
		
		<script src="js/SC_SL.js"></script>
		<script src="js/SC_SL2.js"></script>

		<script src="../examples/js/libs/dat.gui.min.js"></script>

		<script>

			var effectController  = {
				tRGBMSampler: null,
				EV: 0,
				maxRange: 6,
				GammaIn: 1, 
				GammaOut: 1 
			};


			var camera, scene, controls, renderer, RTTex, rendererRTT, camRTT, sceneRTT,shaderRTT,uniformsRTT,cameraHUD,sceneHUD;
			var updateTex = false;
			var materials = [];
			var RTTtextures = [];
			var RTTSize = 1024;

			init();
			//render();

			animate();

			function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {

				var textures = [];

				for ( var i = 0; i < tilesNum; i ++ ) {

					textures[ i ] = new THREE.Texture();

				}

				var imageObj = new Image();

				imageObj.onload = function() {

					var canvas, context;
					var tileWidth = imageObj.height;

					for ( var i = 0; i < textures.length; i ++ ) {

						canvas = document.createElement( 'canvas' );
						context = canvas.getContext( '2d' );
						canvas.height = tileWidth;
						canvas.width = tileWidth;
						context.drawImage( imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
						textures[ i ].image = canvas
						textures[ i ].needsUpdate = true;

					}

				};

				imageObj.src = atlasImgUrl;

				return textures;

			}

			//function getTexFromRTT() {

			//}

			/*function RTT( matRTT ) {
				var camRTT = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
				camRTT.position.z = 100;

				var sceneRTT = new THREE.Scene();
				rtTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );


				//var uniforms = THREE.UniformsUtils.clone( shaderObj.uniforms );


				var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );

				var quad = new THREE.Mesh( plane, matRTT );
				quad.position.z = -100;
				sceneRTT.add( quad );


				var rendererRTT = new THREE.WebGLRenderer();
				rendererRTT.setPixelRatio( window.devicePixelRatio );
				rendererRTT.setSize( window.innerWidth, window.innerHeight );

				rendererRTT.clear();

				// Render first scene into texture
				console.log(rendererRTT.render( sceneRTT, camRTT, rtTexture, true ));
				

				return rtTexture;

			}*/

			function UpdateRTT(){

				materialRTT.uniforms.nFace.value = 0;
				renderer.render( sceneRTT, camRTT, RTTtextures[0], true );


				materialRTT.uniforms.nFace.value = 1;
				renderer.render( sceneRTT, camRTT, RTTtextures[1], true );


				uniformsRTT.nFace.value = 2;
				renderer.render( sceneRTT, camRTT, RTTtextures[2], true );


				uniformsRTT.nFace.value = 3;
				renderer.render( sceneRTT, camRTT, RTTtextures[3], true );


				uniformsRTT.nFace.value = 4;
				renderer.render( sceneRTT, camRTT, RTTtextures[4], true );


				uniformsRTT.nFace.value = 5;
				renderer.render( sceneRTT, camRTT, RTTtextures[5], true );

			}

			function init() {

				var container, mesh;
				//var canvas, context;
				//canvas = document.createElement( 'canvas' );
				//context = canvas.getContext( '2d' );

				for ( var i = 0; i < 6; i ++ ) {

					//RTTtextures[ i ] = new THREE.Texture();
					//RTTtextures[ i ] = THREE.ImageUtils.generateDataTexture(RTTSize,RTTSize,new THREE.Color( 1, 0, 0 ))
					RTTtextures[ i ] = new THREE.WebGLRenderTarget( RTTSize, RTTSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

				}















				/////////////////////HUD////////////////////////////
				var width = window.innerWidth;
  				var height = window.innerHeight;
				var hudWidth = 240;
				var hudHeight = 40;
				// We will use 2D canvas element to render our HUD.  
				var hudCanvas = document.createElement('canvas');
				// Again, set dimensions to fit the screen.
  				hudCanvas.width = hudWidth;
  				hudCanvas.height = hudHeight;

  				// Create the camera and set the viewport to match the screen dimensions.
  				cameraHUD = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 30 );

  				// Create also a custom scene for HUD.
  				sceneHUD = new THREE.Scene();


  				// Create texture from rendered graphics.
  				var RTTHUD = new THREE.WebGLRenderTarget( hudWidth, hudHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );
				//var hudTexture = new THREE.Texture(hudCanvas);
				//RTTHUD.texture.needsUpdate = true;
  
				


  				//////////////////////////////////////
				//UI
				var RGBMTexUI = new THREE.TextureLoader().load( 'textures/2294472375_24a3b8ef46_o.jpg');
				//RGBMTexUI.wrapS = THREE.RepeatWrapping;
				//RGBMTexUI.wrapT = THREE.RepeatWrapping;
				RGBMTexUI.magFilter = THREE.NearestFilter;
				RGBMTexUI.minFilter = THREE.NearestFilter;

				var shaderUI = THREE.SCSL_LL2CUBE_UI;
				var uniformsUI = THREE.UniformsUtils.clone( shaderUI.uniforms );
				uniformsUI.tSampler.value = RGBMTexUI;

				var materialUI = new THREE.ShaderMaterial( {
					uniforms: uniformsUI,
					vertexShader: shaderUI.vertexShader,
					fragmentShader: shaderUI.fragmentShader
				} );

				//////////////////////////////////////

				//var shaderL = THREE.SC_ShaderLib[ "LL2CUBE" ];
				//var uniformsLib = THREE.UniformsUtils.clone( shaderL.uniforms );
/*
				var materialLib = new THREE.ShaderMaterial( {
					uniforms: uniformsLib,
					vertexShader: shaderL.vertexShader,
					fragmentShader: shaderL.fragmentShader
				} );

				materialLib.transparent = true;
				materialLib.opacity = 1.0;




				// Create HUD material.
				var materialHUD = new THREE.MeshBasicMaterial( {map: RGBMTexUI} );
				materialHUD.transparent = true;
				materialHUD.opacity = 1.0;
				*/


				// Create plane to render the HUD. This plane fill the whole screen.
				var HUDplaneGeometry = new THREE.PlaneGeometry( hudWidth, hudHeight );
  				var HUDplane = new THREE.Mesh( HUDplaneGeometry, materialUI );
  				sceneHUD.add( HUDplane );


				//////////////////////////////////////















				container = document.getElementById( 'container' );
				renderer = new THREE.WebGLRenderer({ alpha: true });
				renderer.autoClear = false;//MUst turn it off if you want add multi renders in same buffer
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
				camera.position.z = 100;
				//camera.target = new THREE.Vector3( 0, 0, 0 );

				controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.dampingFactor = 0.3;
				controls.enableZoom = true;
				controls.enablePan = false;

				scene = new THREE.Scene();

				var geometry = new THREE.SphereGeometry( 500, 60, 40 );
				geometry.scale( -1, 1, 1 );

				var RGBMTex = new THREE.TextureLoader().load( 'textures/2294472375_24a3b8ef46_o.jpg');
				var shader = THREE.SL_RGBM_DECODE;
				var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
				var textures = getTexturesFromAtlasFile( "textures/cube/sun_temple_stripe.jpg", 6 );

				//RTT
				var LLTex = new THREE.TextureLoader().load( 'textures/2294472375_24a3b8ef46_o.jpg', function() {
					renderer.clear();
					materialRTT.uniforms.nFace.value = 0;
					renderer.render( sceneRTT, camRTT, RTTtextures[0], true );
	

					uniformsRTT.nFace.value = 1;
					renderer.render( sceneRTT, camRTT, RTTtextures[1], true );


					uniformsRTT.nFace.value = 2;
					renderer.render( sceneRTT, camRTT, RTTtextures[2], true );
	

					uniformsRTT.nFace.value = 3;
					renderer.render( sceneRTT, camRTT, RTTtextures[3], true );


					uniformsRTT.nFace.value = 4;
					renderer.render( sceneRTT, camRTT, RTTtextures[4], true );


					uniformsRTT.nFace.value = 5;
					renderer.render( sceneRTT, camRTT, RTTtextures[5], true );

				});
				//shaderRTT = THREE.SCSL_LL2CUBE2;
				shaderRTT = THREE.ShaderLib[ "LL2CUBE" ];
				uniformsRTT = THREE.UniformsUtils.clone( shaderRTT.uniforms );
				uniformsRTT.tSampler.value = LLTex;
				uniformsRTT.nFace.value = 0;
				materialRTT = new THREE.ShaderMaterial( {

					uniforms: uniformsRTT,
					vertexShader: shaderRTT.vertexShader,
					fragmentShader: shaderRTT.fragmentShader

				} );

				//materialRTT = new THREE.MeshBasicMaterial( { map: LLTex } ) 

				//RTTex = RTT(materialRTT);
				


				camRTT = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
				camRTT.position.z = 100;

				sceneRTT = new THREE.Scene();
				//RTTex = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat } );

				RTTex = new THREE.WebGLRenderTarget( RTTSize, RTTSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
				//var uniforms = THREE.UniformsUtils.clone( shaderObj.uniforms );


				var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );

				var quad = new THREE.Mesh( plane, materialRTT );
				quad.position.z = -100;
				sceneRTT.add( quad );

				updateTex = true;


				//rendererRTT = new THREE.WebGLRenderer();
				//rendererRTT.setPixelRatio( window.devicePixelRatio );
				//rendererRTT.setSize( window.innerWidth, window.innerHeight );

				//rendererRTT.clear();

				// Render first scene into texture
				
				//rendererRTT.render( sceneRTT, camRTT, RTTex, true );
				//console.log(RTTex.texture);

				

				///////////////////////////////////
				//RTTex.image = LLTex;

				
				var textures = getTexturesFromAtlasFile("textures/cube/sun_temple_stripe.jpg", 6 );
				//textures[0] = RTTex.texture; //size not same

				

				for ( var i = 0; i < 6; i ++ ) {

					//materials.push( new THREE.MeshBasicMaterial( { map:textures[i]} ) );
					materials.push( new THREE.MeshBasicMaterial( { map: RTTtextures[ i ]} ) );

					//materials.push(materialRTT);

				}

				var skyBox = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), new THREE.MeshFaceMaterial( materials ) );
				skyBox.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, - 1 ) );
				scene.add( skyBox );


				

				//////////////////////////////Test

				uniforms.tRGBMSampler.value = RGBMTex;

				var material = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: shader.vertexShader,
					fragmentShader: shader.fragmentShader
				} );


				mesh = new THREE.Mesh( geometry, material );

				//scene.add( mesh );

				//////////////////////////////Test


				/////////////////////////////////////////
				//Drag Event

				document.addEventListener( 'dragover', function ( event ) {

					event.preventDefault();
					event.dataTransfer.dropEffect = 'copy';

				}, false );

				document.addEventListener( 'dragenter', function ( event ) {

					document.body.style.opacity = 0.5;

				}, false );

				document.addEventListener( 'dragleave', function ( event ) {

					document.body.style.opacity = 1;

				}, false );

				document.addEventListener( 'drop', function ( event ) {

					event.preventDefault();

					var reader = new FileReader();
					reader.addEventListener( 'load', function ( event ) {

						uniformsRTT.tSampler.value.image.src = event.target.result;
						uniformsRTT.tSampler.needsUpdate = true;

						//update2();
						//materials[0].map.needsUpdate = true;

						//updateTex = true;
						//console.log("New Tex");
						//update();

					}, false );
					reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

					document.body.style.opacity = 1;

				}, false );

				//
				////////////////////////////////////////////////////

				window.addEventListener( 'resize', onWindowResize, false );

				function guiChanged() {
					//var uniforms = shader.uniforms;

					//uniforms.tRGBMSampler.value = effectController.tRGBMSampler;
					uniforms.luminance.value = Math.pow(2, effectController.EV);
					uniforms.maxRange.value = effectController.maxRange;
					//uniforms.luminance.value = effectController.luminance;
					//uniforms.GammaIn.value = effectController.GammaIn;
					//uniforms.GammaOut.value = effectController.GammaOut;
					//console.log("here");
					//updateTex = true;
					//renderer.clear();

					// Render first scene into texture
				
					//renderer.render( sceneRTT, camRTT, RTTex, true );
					//renderer.render( scene, camera );
					update();
				}

				var gui = new dat.GUI();

				gui.add( effectController, "maxRange", 1.0, 8.0, 8.0 ).onChange( guiChanged );
				gui.add( effectController, "EV", -8.0, 8.0, 0.0 ).onChange( guiChanged );


				guiChanged();



			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}



			function animate() {
				requestAnimationFrame( animate );
				//if (updateTex == true) update2();
				update();


			}

			function update2() {
				console.log("RTT");
				renderer.clear();

				// Render first scene into texture
				
				
				//RTTex.texture.needsUpdate = true;
				if (updateTex == true) {
					uniformsRTT.nFace.value = 0;
					renderer.render( sceneRTT, camRTT, RTTex, true );
					RTTtextures[0] = RTTex.texture;
					RTTtextures[0].needsUpdate = true;

					uniformsRTT.nFace.value = 1;
					renderer.render( sceneRTT, camRTT, RTTex, true );
					RTTtextures[1] = RTTex.texture;
					RTTtextures[1].needsUpdate = true;

					uniformsRTT.nFace.value = 2;
					renderer.render( sceneRTT, camRTT, RTTex, true );
					RTTtextures[2] = RTTex.texture;
					RTTtextures[2].needsUpdate = true;

					uniformsRTT.nFace.value = 3;
					renderer.render( sceneRTT, camRTT, RTTex, true );
					RTTtextures[3] = RTTex.texture;
					RTTtextures[3].needsUpdate = true;

					uniformsRTT.nFace.value = 4;
					renderer.render( sceneRTT, camRTT, RTTex, true );
					RTTtextures[4] = RTTex.texture;
					RTTtextures[4].needsUpdate = true;

					uniformsRTT.nFace.value = 5;
					renderer.render( sceneRTT, camRTT, RTTex, true );
					RTTtextures[5] = RTTex.texture;
					RTTtextures[5].needsUpdate = true;
					updateTex = false;
				}
				
			}


			function update() {
				controls.update();
				//console.log("Screen");
				renderer.render( scene, camera );
				//renderer.setClearColor( 0x000000, 0 ); // the default
				renderer.render( sceneHUD, cameraHUD );

			}

			function render() {
				console.log("R");
				setTimeout(
                    function(){
                    	renderer.render( sceneRTT, camRTT, RTTex, true );
                        renderer.render( scene, camera );
                    },
                    2000
                );
				
				
			}

		</script>
	</body>
</html>



