/// <reference types="vite-plugin-svgr/client" />

type Svg = React.FC<React.SVGProps<SVGSVGElement>>;
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  const Svg;
  export default Svg;
}
