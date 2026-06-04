import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './UniverseBackground.css';

const SmoothStars = () => {
  const pointsRef = useRef();
  const materialRef = useRef();
  const particlesCount = 4000;
  
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // z
      sizes[i] = Math.random() * 1.5 + 0.5;
    }
    return [positions, sizes];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: 15.0 }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      // Pass elapsed time to the shader for perfectly smooth GPU animation
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={particlesCount} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uSpeed;
          attribute float aSize;
          varying float vAlpha;
          void main() {
            vec3 pos = position;
            // Perfectly smooth Z-wrap handled entirely on the GPU
            // Z ranges from -190 to +10, looping infinitely
            float z = mod(pos.z + uTime * uSpeed + 190.0, 200.0) - 190.0;
            pos.z = z;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Fade out as stars pass the camera (+10)
            vAlpha = smoothstep(10.0, -10.0, pos.z);
            // Fade in as stars appear in the far distance (-190)
            vAlpha *= smoothstep(-190.0, -150.0, pos.z);
            
            gl_PointSize = aSize * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vAlpha;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = (1.0 - (dist * 2.0)) * vAlpha;
            // Pure white stars
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const WhiteWhirlwind = () => {
  const pointsRef = useRef();
  const particlesCount = 35000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const col = new Float32Array(particlesCount * 3);
    const color = new THREE.Color();
    
    const arms = 6;
    for(let i = 0; i < particlesCount; i++) {
        const r = Math.pow(Math.random(), 2) * 120;
        const armIndex = i % arms;
        const armAngle = (armIndex / arms) * Math.PI * 2;
        
        // Twist logic gives the whirlwind/spiral shape
        const twist = r * 0.08;
        const angle = armAngle + twist + (Math.random() - 0.5) * 0.8;
        
        // Thicker and spherical in the middle, thinning out at the edges
        const scatter = Math.exp(-r * 0.05) * 20;
        const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * scatter;
        const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * scatter;
        const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * scatter;
        
        const x = Math.cos(angle) * r + randomX;
        const y = randomY;
        const z = Math.sin(angle) * r + randomZ;
        
        pos[i*3] = x;
        pos[i*3+1] = y;
        pos[i*3+2] = z;
        
        // Bright white core fading slightly to darker grays at the edges
        const intensity = 1.0 - (r / 120) * 0.7;
        color.setHSL(0.0, 0.0, intensity);
        col[i*3] = color.r;
        col[i*3+1] = color.g;
        col[i*3+2] = color.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slow, ominous spin
      pointsRef.current.rotation.y -= 0.02 * delta;
    }
  });

  return (
    // Tilted forward and positioned far in the background to look like a distant funnel/whirlwind
    <group position={[0, -10, -140]} rotation={[Math.PI / 3.5, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particlesCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particlesCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.3} vertexColors transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
};

const cometVertexShader = `
  varying vec2 vUv;
  varying float vY;
  void main() {
    vUv = uv;
    vY = position.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const cometFragmentShader = `
  varying vec2 vUv;
  varying float vY;
  uniform vec3 color;
  void main() {
    float t = (vY + 2.5) / 5.0;
    float alpha = (1.0 - t);
    float edge = sin(vUv.x * 3.14159);
    gl_FragColor = vec4(color, alpha * edge * 0.8);
  }
`;

const Comet = ({ startPosition, speed, color, scale }) => {
  const meshRef = useRef();

  const uniforms = useMemo(() => ({
    color: { value: new THREE.Color(color) }
  }), [color]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.x -= speed * delta;
      meshRef.current.position.y -= (speed * 0.1) * delta;
      
      if (meshRef.current.position.x < -150) {
        meshRef.current.position.x = 150 + Math.random() * 100;
        meshRef.current.position.y = (Math.random() - 0.5) * 100;
        meshRef.current.position.z = -Math.random() * 100 - 10;
      }
    }
  });

  return (
    <group ref={meshRef} position={startPosition} scale={scale} rotation={[0, 0, -Math.PI / 2 + 0.1]}>
      <mesh position={[0, -2.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.3, 5, 16]} />
        <shaderMaterial
          vertexShader={cometVertexShader}
          fragmentShader={cometFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

const Comets = () => {
  const comets = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      startPosition: [
        100 + Math.random() * 200,
        (Math.random() - 0.5) * 100,
        -Math.random() * 100 - 10
      ],
      speed: Math.random() * 15 + 20,
      color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6).getHex(),
      scale: Math.random() * 0.5 + 0.5
    }));
  }, []);

  return (
    <group>
      {comets.map(c => <Comet key={c.id} {...c} />)}
    </group>
  );
};

const Universe = () => {
  return (
    <>
      <SmoothStars />
      <WhiteWhirlwind />
      <Comets />
    </>
  );
};

const UniverseBackground = () => {
  return (
    <div className="universe-background">
      <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
        <color attach="background" args={['#000003']} />
        {/* Soft fog to gently mask geometry edges */}
        <fog attach="fog" args={['#000003', 40, 190]} />
        <Universe />
      </Canvas>
      {/* Dark gradient overlay to improve text readability */}
      <div className="universe-overlay" />
    </div>
  );
};

export default UniverseBackground;