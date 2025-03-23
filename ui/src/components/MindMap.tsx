import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls, Circle, Billboard, Text, useTexture, Line} from "@react-three/drei";
import * as THREE from "three";
import {brandColor} from "../theme.ts";
import {useEffect, useRef, useState} from "react";
import {useUiBreakpoints} from "../utils/use-ui-breakpoints.ts";
import {useModules} from "../data_access/modules.tsx";
import {Module} from "../domains/Module.tsx";
import {Package} from "../domains/Package.tsx";

const Node = ({ position, color, title, icon, onClick }: {
    position: number[];
    title: string;
    color: string;
    icon: string;
    onClick: (point: THREE.Vector3) => void;
}) => {
    const texture = useTexture(`/${icon}`); // Load Ethereum or custom logo image

    return (
        <group position={position as [number, number, number]} onClick={(e) => onClick(e.point)}>
            {/* Outer Glow Circle */}
            <Billboard>
                <Circle args={[1.2, 32]}>
                    <meshBasicMaterial color="gray" transparent opacity={0.3} />
                </Circle>
            </Billboard>

            {/* Inner Bubble */}
            <Billboard>
                <Circle args={[0.8, 35]}>
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
                </Circle>
            </Billboard>

            {/* Floating image inside the bubble */}
            <Billboard>
                <Circle args={[0.6, 37]} position={[0, 0, 0.01]}>
                    <meshBasicMaterial map={texture} transparent />
                </Circle>
            </Billboard>

            {/* Floating text below the bubble */}
            <Billboard>
                <Text fontSize={0.15} color="white" position={[0, -0.9, 0.01]}>
                    {title}
                </Text>
            </Billboard>
        </group>
    );
};

const generateModuleNodes = (modules: Module[]) => {
    return modules.map((m) => ({
        position: [
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
        ],
        color: "blue",
        id: m.module,
        name: m.module,
        parent: m.packageId,
        icon: 'function.svg',
    }));
};

const generatePackageNodes = (packages: Package[]) => {
    return packages.map((p) => ({
        position: [
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
        ],
        color: "blue",
        name: p.name,
        id: p.id,
        parent: '',
        icon: `${p.name}.png`,
    }));
};

const generateConnections = (packageNodes: any[], moduleNodes: any[]) => {
    const connections: any[] = [];

    packageNodes.forEach((p) => {
        const ns = moduleNodes.filter((m) => m.parent === p.id);
        ns.forEach((m) => {
            connections.push([p, m]);
        })
    });

    return connections;
};

const RotatingScene = ({ setTarget, target }: { setTarget: (target: THREE.Vector3 | null) => void, target: THREE.Vector3 | null }) => {
    const groupRef = useRef<THREE.Group>(null);
    const {modules, packages} =  useModules()

    // const { gl } = useThree();
    // const [rotate, setRotate] = useState<boolean>(true);

    // useEffect(() => {
    //     const stopRotate = () => setRotate(false);
    //     const startRotate = () => setRotate(true);
    //
    //     gl.domElement.addEventListener("mouseenter", stopRotate);
    //     gl.domElement.addEventListener("mouseleave", startRotate);
    //
    //     return () => {
    //         gl.domElement.removeEventListener("mouseenter", stopRotate);
    //         gl.domElement.removeEventListener("mouseleave", startRotate);
    //     };
    // }, [gl, setTarget]);

    // Rotate the entire scene slowly around the Y-axis
    useFrame(() => {
        // if (groupRef.current && !target && rotate) {
        if (groupRef.current && !target) {
            groupRef.current.rotation.y += 0.002; // Slow rotation speed
        }
    });

    if (!modules) {
        return null;
    }

    const packageNodes = generatePackageNodes(packages)
    const moduleNodes = generateModuleNodes(modules)

    const nodes = packageNodes.concat(moduleNodes)

    const connections = generateConnections(packageNodes, moduleNodes)

    return (
        <group ref={groupRef}>
            {connections.map(([a, b], index) => (
                <Line
                    key={index}
                    points={[a.position, b.position]}
                    color="rgba(100, 100, 100, 0.3)"
                    lineWidth={0.5}
                    transparent
                />
            ))}

            {nodes.map((node, index) => (
                <Node
                    key={index}
                    title={node.name}
                    icon={node.icon}
                    position={node.position}
                    color={node.color}
                    onClick={(point) => setTarget(new THREE.Vector3(...point))}
                />
            ))}
        </group>
    );
};

const CameraController = ({ target, setTarget }: { target: THREE.Vector3 | null, setTarget: (target: THREE.Vector3 | null) => void }) => {
    const { camera, gl } = useThree();
    const lerpFactor = 0.05;

    useFrame(() => {
        if (target) {
            camera.position.lerp(new THREE.Vector3(target.x, target.y, target.z + 5), lerpFactor);
            camera.lookAt(target);
        }
    });

    useEffect(() => {
        const resetTarget = () => setTarget(null);

        gl.domElement.addEventListener("pointerdown", resetTarget);
        gl.domElement.addEventListener("wheel", resetTarget);
        gl.domElement.addEventListener("touchstart", resetTarget);

        return () => {
            gl.domElement.removeEventListener("pointerdown", resetTarget);
            gl.domElement.removeEventListener("wheel", resetTarget);
            gl.domElement.removeEventListener("touchstart", resetTarget);
        };
    }, [gl, setTarget]);

    return null;
};

export function MindMap() {
    const [target, setTarget] = useState<THREE.Vector3 | null>(null);
    const {isMd} = useUiBreakpoints()

    return (
        <Canvas
            camera={{ position: [0, 0, 30], fov: 50 }}
            style={{
                backgroundColor: brandColor,
                width: "100%",
                height: isMd ? 500 : "calc(100vh - 140px)"
            }}
        >
            <ambientLight intensity={0.3}/>
            <pointLight position={[10, 10, 10]} intensity={0.8}/>
            <OrbitControls enableZoom={true} enablePan={true}/>

            <CameraController target={target} setTarget={setTarget} />
            <RotatingScene setTarget={setTarget} target={target} />
        </Canvas>
);
}