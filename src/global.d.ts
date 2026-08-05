export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

// react-three-fiber v9 + React 19 register custom elements by augmenting
// `ThreeElements` (re-exported into React.JSX.IntrinsicElements internally)
// rather than the old global JSX namespace — the previous declaration here
// silently stopped applying after the React 19 / r3f v9 upgrade.
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}
