import { Float, MeshDistortMaterial, OrbitControls, Sphere, Box, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const HeroScene = () => {
  return (
    <div className="relative h-[320px] overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/80 md:h-[420px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_30%)]" />
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 5]} intensity={2} color="#7dd3fc" />
        <directionalLight position={[-4, -2, -3]} intensity={1.4} color="#fb923c" />
        <Environment preset="city" />

        <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.4}>
          <Sphere args={[1.3, 128, 128]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#38bdf8"
              roughness={0.05}
              metalness={0.7}
              distort={0.42}
              speed={2.2}
            />
          </Sphere>
        </Float>

        <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.8} position={[-2.1, 1.2, -0.6]}>
          <Box args={[0.55, 0.55, 0.55]}>
            <meshStandardMaterial color="#f97316" roughness={0.15} metalness={0.85} />
          </Box>
        </Float>

        <Float speed={2.2} rotationIntensity={1.8} floatIntensity={2} position={[2.1, -1.1, -0.8]}>
          <Box args={[0.75, 0.75, 0.75]}>
            <meshStandardMaterial color="#22c55e" roughness={0.2} metalness={0.75} />
          </Box>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
      <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200 backdrop-blur">
        Interactive Preview
      </div>
    </div>
  );
};

export default HeroScene;
