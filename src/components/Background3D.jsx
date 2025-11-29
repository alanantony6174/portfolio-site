import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GradientShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uColor1: { value: new THREE.Color('#ffffff') }, // Base white
        uColor2: { value: new THREE.Color('#e0e7ff') }, // Light indigo
        uColor3: { value: new THREE.Color('#fae8ff') }, // Light purple/pink
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      
      // Mouse interaction
      float mouseDist = distance(st, uMouse);
      float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
      
      // Time varying pixel coordinates
      float noise1 = snoise(st * 3.0 + uTime * 0.1 + mouseInfluence * 0.5);
      float noise2 = snoise(st * 6.0 - uTime * 0.15);
      
      // Mix colors based on noise
      vec3 color = mix(uColor1, uColor2, noise1 * 0.5 + 0.5);
      color = mix(color, uColor3, noise2 * 0.5 + 0.5);
      
      // Add a subtle grain/dither
      float grain = fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
      color += grain * 0.03;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const BackgroundMesh = () => {
    const mesh = useRef();
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const { viewport } = useThree();

    // Create shader material only once
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(GradientShaderMaterial.uniforms),
            vertexShader: GradientShaderMaterial.vertexShader,
            fragmentShader: GradientShaderMaterial.fragmentShader,
        });
    }, []);

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize mouse position to 0..1
            mouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: 1.0 - (e.clientY / window.innerHeight) // Flip Y for shader UVs usually
            };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Smooth mouse interpolation
            mesh.current.material.uniforms.uMouse.value.lerp(
                new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
                0.1
            );
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <primitive object={shaderMaterial} attach="material" />
        </mesh>
    );
};

const Background3D = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-60 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <BackgroundMesh />
            </Canvas>
        </div>
    );
};

export default Background3D;
