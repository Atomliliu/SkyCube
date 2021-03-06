#include <sc_common>

uniform sampler2D tSampler;
varying vec3 vWorldPosition;
varying vec2 vUv;

uniform float fRange;

void main() {

	//vec4 frag(v2f i) : COLOR 
	//{
		//vec2 UV = vUv;
		vec4 result = texture2D( tSampler, vUv );
		result = DecodeRGBM(result, fRange, 1.0);

		gl_FragColor = result;

	//}

}
