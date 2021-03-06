import { ShaderChunk } from './ShaderChunk';
//import { SC_ShaderChunk } from './SC_ShaderChunk';
import { UniformsUtils } from './UniformsUtils';
import { Vector2 } from '../../math/Vector2';
import { Vector3 } from '../../math/Vector3';
import { UniformsLib } from './UniformsLib';
import { Color } from '../../math/Color';

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */

var ShaderLib = {

	basic: {

		uniforms: UniformsUtils.merge( [

			UniformsLib.common,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.fog

		] ),

		vertexShader: ShaderChunk.meshbasic_vert,
		fragmentShader: ShaderChunk.meshbasic_frag

	},

	basic2: {

		uniforms: UniformsUtils.merge( [

			UniformsLib.common,
			UniformsLib.aomap,
			UniformsLib.fog

		] ),

		vertexShader: ShaderChunk.meshbasic2_vert,
		fragmentShader: ShaderChunk.meshbasic2_frag

	},

	lambert: {

		uniforms: UniformsUtils.merge( [

			UniformsLib.common,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.fog,
			UniformsLib.lights,

			{
				emissive : { value: new Color( 0x000000 ) }
			}

		] ),

		vertexShader: ShaderChunk.meshlambert_vert,
		fragmentShader: ShaderChunk.meshlambert_frag

	},

	phong: {

		uniforms: UniformsUtils.merge( [

			UniformsLib.common,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.gradientmap,
			UniformsLib.fog,
			UniformsLib.lights,

			{
				emissive : { value: new Color( 0x000000 ) },
				specular : { value: new Color( 0x111111 ) },
				shininess: { value: 30 }
			}

		] ),

		vertexShader: ShaderChunk.meshphong_vert,
		fragmentShader: ShaderChunk.meshphong_frag

	},

	standard: {

		uniforms: UniformsUtils.merge( [

			UniformsLib.common,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.roughnessmap,
			UniformsLib.metalnessmap,
			UniformsLib.fog,
			UniformsLib.lights,

			{
				emissive : { value: new Color( 0x000000 ) },
				roughness: { value: 0.5 },
				metalness: { value: 0 },
				envMapIntensity : { value: 1 }, // temporary
			}

		] ),

		vertexShader: ShaderChunk.meshphysical_vert,
		fragmentShader: ShaderChunk.meshphysical_frag

	},

	points: {

		uniforms: UniformsUtils.merge( [

			UniformsLib.points,
			UniformsLib.fog

		] ),

		vertexShader: ShaderChunk.points_vert,
		fragmentShader: ShaderChunk.points_frag

	},

	dashed: {

		uniforms: UniformsUtils.merge( [

			UniformsLib.common,
			UniformsLib.fog,

			{
				scale    : { value: 1 },
				dashSize : { value: 1 },
				totalSize: { value: 2 }
			}

		] ),

		vertexShader: ShaderChunk.linedashed_vert,
		fragmentShader: ShaderChunk.linedashed_frag

	},

	depth: {

		uniforms: UniformsUtils.merge( [

			UniformsLib.common,
			UniformsLib.displacementmap

		] ),

		vertexShader: ShaderChunk.depth_vert,
		fragmentShader: ShaderChunk.depth_frag

	},

	normal: {

		uniforms: UniformsUtils.merge( [
			UniformsLib.common,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			{
				opacity: { value: 1.0 }
			}
		] ),

		vertexShader: ShaderChunk.normal_vert,
		fragmentShader: ShaderChunk.normal_frag

	},

	/* -------------------------------------------------------------------------
	//	Cube map shader
	 ------------------------------------------------------------------------- */

	cube: {

		uniforms: {
			tCube: { value: null },
			tFlip: { value: - 1 },
			opacity: { value: 1.0 }
		},

		vertexShader: ShaderChunk.cube_vert,
		fragmentShader: ShaderChunk.cube_frag

	},

	/* -------------------------------------------------------------------------
	//	Cube map shader
	 ------------------------------------------------------------------------- */

	equirect: {

		uniforms: {
			tEquirect: { value: null },
			tFlip: { value: - 1 }
		},

		vertexShader: ShaderChunk.equirect_vert,
		fragmentShader: ShaderChunk.equirect_frag

	},

	distanceRGBA: {

		uniforms: {

			lightPos: { value: new Vector3() }

		},

		vertexShader: ShaderChunk.distanceRGBA_vert,
		fragmentShader: ShaderChunk.distanceRGBA_frag

	},

	//////////////////////////////////////////////////
	LL2CUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tSampler: { value: null },
			nFace: { value: 0 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_LL2CUBE_FRAG

	},

	LP2CUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tSampler: { value: null },
			nFace: { value: 0 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_LP2CUBE_FRAG

	},
	LP2CUBE_OS: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tSampler: { value: null },
			fPixelSize: { value: 0.0009765625 },
			nSamples: { value: 16 },
			nFace: { value: 0 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_LP2CUBE_OS_FRAG

	},

	SP2CUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tSampler: { value: null },
			nFace: { value: 0 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_SP2CUBE_FRAG

	},
	DP2CUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tSampler: { value: null },
			nFace: { value: 0 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_DP2CUBE_FRAG

	},
	HL2CUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tSampler: { value: null },
			nFace: { value: 0 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_HL2CUBE_FRAG

	},
	VC2CUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tSampler: { value: null },
			nFace: { value: 0 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_VC2CUBE_FRAG

	},
	VL2CUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tSampler: { value: null },
			nFace: { value: 0 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_VL2CUBE_FRAG

	},
	HC2CUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tSampler: { value: null },
			nFace: { value: 0 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_HC2CUBE_FRAG

	},

	///////////////////////OUT//////////////////////

	ENV2HCUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			//fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2HCUBE_FRAG

	},

	ENV2HCC: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			//fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2HCC_FRAG

	},

	ENV2VCC: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			//fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2VCC_FRAG

	},

	ENV2VCUBE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			//fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2VCUBE_FRAG

	},

	ENV2LL: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			//fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2LL_FRAG

	},

	ENV2LP: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			//fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2LP_FRAG

	},

	ENV2SP: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			//fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2SP_FRAG

	},

	ENV2DP: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			//fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2DP_FRAG

	},

	ENV2CUBEFACE: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			//fOpacity: { value: 1.0 },
			nFace: { value: 0 },
			fFlip: { value: 1 }

		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2CUBEFACE_FRAG

	},







	/////////////////////////HUD//////////////////////

	ENV2HCUBE_HUD: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2HCUBE_HUD_FRAG

	},

	ENV2HCC_HUD: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2HCC_HUD_FRAG

	},

	ENV2VCC_HUD: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2VCC_HUD_FRAG

	},

	ENV2VCUBE_HUD: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2VCUBE_HUD_FRAG

	},

	ENV2LL_HUD: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2LL_HUD_FRAG

	},

	ENV2LP_HUD: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2LP_HUD_FRAG

	},

	ENV2SP_HUD: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2SP_HUD_FRAG

	},

	ENV2DP_HUD: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			fOpacity: { value: 1.0 },
			fFlip: { value: 1 }
		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2DP_HUD_FRAG

	},

	ENV2CUBEFACE_HUD: {

		uniforms: {
			vUvFlip: { value: new Vector2(0,0) },
			tCube: { value: null },
			fOpacity: { value: 1.0 },
			nFace: { value: 0 },
			fFlip: { value: 1 }

		},

		vertexShader: ShaderChunk.SCSL_RASTER_VERT,
		fragmentShader: ShaderChunk.SCSL_ENV2CUBEFACE_HUD_FRAG

	}


};

ShaderLib.physical = {

	uniforms: UniformsUtils.merge( [

		ShaderLib.standard.uniforms,

		{
			clearCoat: { value: 0 },
			clearCoatRoughness: { value: 0 }
		}

	] ),

	vertexShader: ShaderChunk.meshphysical_vert,
	fragmentShader: ShaderChunk.meshphysical_frag

};


export { ShaderLib };
