import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Component, type ErrorInfo, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { ProductImage } from '../data/products';

type BeltModelProps = {
  reducedMotion: boolean;
};

type PreviewProps = {
  fallbackImage?: ProductImage;
  className?: string;
  compact?: boolean;
};

type BoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type BoundaryState = {
  hasError: boolean;
};

class PreviewBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // The visual fallback keeps the product page usable when WebGL is unavailable.
  }

  render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function Webbing({ x, width, y = 0.2 }: { x: number; width: number; y?: number }) {
  const stitchPositions = [-0.86, -0.58, -0.3, -0.02, 0.26, 0.54, 0.82];
  return (
    <group position={[x, y, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, 0.2, 0.62]} />
        <meshStandardMaterial color="#ee711c" roughness={0.78} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.105, 0]} castShadow>
        <boxGeometry args={[width, 0.018, 0.5]} />
        <meshStandardMaterial color="#ff9a2e" roughness={0.68} metalness={0.02} />
      </mesh>
      <mesh position={[0, -0.105, 0]} receiveShadow>
        <boxGeometry args={[width, 0.018, 0.5]} />
        <meshStandardMaterial color="#b84e18" roughness={0.86} metalness={0.02} />
      </mesh>
      {stitchPositions.map((position) => (
        <mesh key={position} position={[position * width * 0.48, 0.118, 0.255]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.08, 0.018, 0.026]} />
          <meshStandardMaterial color="#7f3518" roughness={0.9} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

function Ratchet() {
  const teeth = [-0.46, -0.3, -0.14, 0.02, 0.18, 0.34];
  return (
    <group position={[0.45, 0.48, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.55, 0.48, 0.96]} />
        <meshStandardMaterial color="#68767d" roughness={0.3} metalness={0.92} />
      </mesh>
      <mesh position={[0, 0.29, 0]} castShadow>
        <boxGeometry args={[1.34, 0.1, 0.78]} />
        <meshStandardMaterial color="#aeb8b8" roughness={0.23} metalness={0.96} />
      </mesh>
      <mesh position={[-0.08, 0.56, 0]} rotation={[0, 0, -0.13]} castShadow>
        <boxGeometry args={[1.42, 0.13, 0.34]} />
        <meshStandardMaterial color="#87949a" roughness={0.28} metalness={0.94} />
      </mesh>
      <mesh position={[0.03, 0.06, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 1.1, 32]} />
        <meshStandardMaterial color="#4e5c62" roughness={0.34} metalness={0.96} />
      </mesh>
      <mesh position={[0.03, 0.59, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.105, 0.105, 1.28, 24]} />
        <meshStandardMaterial color="#bbc3c1" roughness={0.2} metalness={0.98} />
      </mesh>
      <mesh position={[0.03, 0.59, 0.64]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.22, 24]} />
        <meshStandardMaterial color="#ef741f" roughness={0.55} metalness={0.18} />
      </mesh>
      {teeth.map((x) => (
        <mesh key={x} position={[x, 0.31, 0.49]} rotation={[0.22, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.15, 0.08]} />
          <meshStandardMaterial color="#c3cbca" roughness={0.28} metalness={0.95} />
        </mesh>
      ))}
      <mesh position={[-0.54, 0.04, 0.49]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.06, 20]} />
        <meshStandardMaterial color="#d2d7d4" roughness={0.2} metalness={0.95} />
      </mesh>
    </group>
  );
}

function Hook() {
  const hookShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.35, 0.42);
    shape.lineTo(0.14, 0.42);
    shape.lineTo(0.14, 0.3);
    shape.lineTo(-0.12, 0.3);
    shape.lineTo(-0.12, -0.02);
    shape.quadraticCurveTo(-0.12, -0.36, 0.2, -0.42);
    shape.quadraticCurveTo(0.5, -0.47, 0.52, -0.16);
    shape.lineTo(0.37, -0.16);
    shape.quadraticCurveTo(0.34, -0.28, 0.2, -0.26);
    shape.quadraticCurveTo(0.05, -0.23, 0.05, 0.03);
    shape.lineTo(0.05, 0.48);
    shape.lineTo(-0.35, 0.48);
    shape.closePath();
    return shape;
  }, []);

  return (
    <group position={[2.28, 0.26, 0]} rotation={[0, 0, -0.12]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[hookShape, { depth: 0.22, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.035, bevelThickness: 0.035 }]} />
        <meshStandardMaterial color="#a9b4b5" roughness={0.24} metalness={0.94} />
      </mesh>
      <mesh position={[-0.03, 0.39, 0.13]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.18, 24]} />
        <meshStandardMaterial color="#d0d6d3" roughness={0.22} metalness={0.96} />
      </mesh>
    </group>
  );
}

function BeltAssembly({ reducedMotion }: BeltModelProps) {
  const assembly = useRef<THREE.Group>(null);
  const { pointer, clock } = useThree();

  useFrame((_, delta) => {
    if (!assembly.current) return;
    const idle = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.72) * 0.018;
    const pointerYaw = reducedMotion ? 0 : pointer.x * 0.14;
    const pointerPitch = reducedMotion ? 0 : pointer.y * -0.08;
    assembly.current.rotation.y = THREE.MathUtils.damp(assembly.current.rotation.y, pointerYaw + idle, 4.2, delta);
    assembly.current.rotation.x = THREE.MathUtils.damp(assembly.current.rotation.x, pointerPitch + idle * 0.5, 4.2, delta);
    assembly.current.rotation.z = THREE.MathUtils.damp(assembly.current.rotation.z, pointer.x * -0.025, 4.2, delta);
  });

  return (
    <group ref={assembly} rotation={[0.02, -0.08, -0.035]} scale={0.96}>
      <Webbing x={-1.48} width={3.05} y={0.22} />
      <Webbing x={1.28} width={1.1} y={0.22} />
      <mesh position={[1.8, 0.22, 0]} rotation={[0, 0, -0.08]} castShadow>
        <boxGeometry args={[0.42, 0.21, 0.6]} />
        <meshStandardMaterial color="#d35b1b" roughness={0.72} metalness={0.06} />
      </mesh>
      <Ratchet />
      <Hook />
    </group>
  );
}

function WebGLFallback({ image }: { image?: ProductImage }) {
  return (
    <div className="relative flex h-full min-h-[340px] items-center justify-center overflow-hidden bg-[#2a3134]" data-testid="status-3d-preview-unavailable">
      {image ? <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover opacity-75" style={{ objectPosition: image.position ?? 'center' }} /> : null}
      <div className="absolute inset-0 bg-[rgba(17,19,21,.52)]" />
      <div className="relative border border-[var(--sage)]/45 bg-[rgba(17,19,21,.78)] px-5 py-4 text-center">
        <span className="mono block text-[9px] uppercase tracking-[.16em] text-[var(--orange)]">3D preview unavailable</span>
        <span className="mt-2 block text-xs text-[var(--frost)]">Showing the field product image instead.</span>
      </div>
    </div>
  );
}

export function BeltModel({ reducedMotion }: BeltModelProps) {
  return (
    <Canvas
      className="belt-study-canvas"
      camera={{ position: [0, 1.35, 7.2], fov: 34 }}
      dpr={[1, 1.65]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      data-testid="canvas-belt-study"
    >
      <ambientLight intensity={1.35} color="#d9d8cc" />
      <directionalLight castShadow position={[-3, 5, 4]} intensity={3.1} color="#fff0d4" shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[4, 1, -3]} intensity={1.5} color="#b6d5d1" />
      <spotLight position={[0, 4, 1]} angle={0.42} penumbra={0.7} intensity={2.4} color="#ffb76b" />
      <BeltAssembly reducedMotion={reducedMotion} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[12, 7]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </Canvas>
  );
}

export function BeltModelPreview({ fallbackImage, className = '', compact = false }: PreviewProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(query.matches);
    updateMotion();
    query.addEventListener('change', updateMotion);
    try {
      const canvas = document.createElement('canvas');
      setWebglAvailable(Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl')));
    } catch {
      setWebglAvailable(false);
    }
    return () => query.removeEventListener('change', updateMotion);
  }, []);

  return (
    <div className={`belt-study belt-study-grid relative overflow-hidden bg-[#252d31] ${compact ? 'min-h-[360px]' : 'min-h-[500px]'} ${className}`} aria-label="Interactive 3D study of an orange industrial ratchet lashing belt">
      {webglAvailable ? (
        <PreviewBoundary fallback={<WebGLFallback image={fallbackImage} />}>
          <BeltModel reducedMotion={reducedMotion} />
        </PreviewBoundary>
      ) : <WebGLFallback image={fallbackImage} />}
      <div className="belt-study-mark left-5 top-5 mono text-[9px] uppercase tracking-[.14em] text-[var(--frost)]/80">APX / RL-02 <span className="text-[var(--sage)]">— product study</span></div>
      <div className="belt-study-mark bottom-5 left-5 mono text-[9px] uppercase tracking-[.12em] text-[var(--sage)]">Orange woven strap / alloy ratchet / hook</div>
      <div className="absolute bottom-5 right-5 border-l border-[var(--orange)] pl-3 text-right">
        <span className="mono block text-[9px] uppercase tracking-[.12em] text-[var(--orange)]">{reducedMotion ? 'Stable view' : 'Drag to inspect'}</span>
        <span className="mono mt-1 block text-[8px] uppercase tracking-[.1em] text-[var(--sage)]">3D product study</span>
      </div>
    </div>
  );
}