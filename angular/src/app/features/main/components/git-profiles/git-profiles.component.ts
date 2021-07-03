import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GitUser } from 'src/app/shared/interfaces/git-user';
import * as THREE from 'three';
import { GithubControllerService } from '../../services/github-controller.service';

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

@Component({
  selector: 'app-git-profiles',
  templateUrl: './git-profiles.component.html',
  styleUrls: ['./git-profiles.component.scss']
})
export class GitProfilesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("profileAnimation") profileAnimationRef: ElementRef | any;
  private profileAnimation: HTMLElement | any;

  private loadUsersSubs: Subscription | any;

  constructor(
    private _GithubControllerService: GithubControllerService
  ) { }

  ngOnInit(): void {
    this.loadGitUsers();
  }

  ngAfterViewInit() {
    this.profileAnimation = this.profileAnimationRef.nativeElement;
    const img = 'https://threejsfundamentals.org/threejs/resources/images/wall.jpg';

    main(this.profileAnimation, img);
  }

  private loadGitUsers() {
    this.loadUsersSubs = this._GithubControllerService.getAllUsers().subscribe((gitUserList: GitUser[]) => {
      console.log("gitUserList", gitUserList);
    });
  }

  ngOnDestroy() {
    if (this.loadUsersSubs) {
      this.loadUsersSubs.unsubscribe();
    }
  }
}
