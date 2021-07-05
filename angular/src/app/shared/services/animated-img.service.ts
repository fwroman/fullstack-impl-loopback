import { Injectable } from '@angular/core';
import * as THREE from 'three';

/**
 * FUNCTION TO MAKE ALL THE GEOMETRICAL OPERATIONS FOR THE 3D ANIMATION
 * @param canvas 
 * @param imgUrl 
 */
function main(canvas: any, imgUrl: string) {
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

  const fov = 50;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const cubes: any[] = [];  // just an array we can use to rotate the cubes
  const loader = new THREE.TextureLoader();

  const material = new THREE.MeshBasicMaterial({
    map: loader.load(imgUrl),
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cubes.push(cube);  // add to our list of cubes to rotate

  function resizeRendererToDisplaySize(renderer: any) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time: any) {
    time *= 0.003;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = .2 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

@Injectable({
  providedIn: 'root'
})
export class AnimatedImgService {

  constructor() { }

  /**
   * METHOD TO RENDER A 3D CUBED IMAGED FROM A 2D IMAGE
   * @param canvas 
   * @param imgUrl 
   */
  public renderAnimatedImg(canvas: any, imgUrl: string | any) {
    main(canvas, imgUrl);
  }
}
