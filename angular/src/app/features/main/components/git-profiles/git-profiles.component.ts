import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GitUser } from 'src/app/shared/interfaces/git-user';
import * as THREE from 'three';
import { GithubControllerService } from '../../services/github-controller.service';
import { faChevronLeft, faChevronRight, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

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

const CANVAS_ID_PREFIX = 'gituser-';

@Component({
  selector: 'app-git-profiles',
  templateUrl: './git-profiles.component.html',
  styleUrls: ['./git-profiles.component.scss']
})
export class GitProfilesComponent implements OnInit, OnDestroy {
  private loadUsersSubs: Subscription | any;

  public fullUserList: GitUser[];
  public filteredUserList: GitUser[];
  public canvasIdPrefix: string;

  public iconLeft: any;
  public iconRight: any;
  public iconSearch: any;
  public iconCancel: any;

  public page: number;
  public pageLimit: number;
  public filterPattern: string;
  public searching: boolean;

  constructor(
    private _GithubControllerService: GithubControllerService
  ) {
    this.fullUserList = [];
    this.filteredUserList = [];
    this.canvasIdPrefix = CANVAS_ID_PREFIX;

    this.iconLeft = faChevronLeft;
    this.iconRight = faChevronRight;
    this.iconSearch = faSearch;
    this.iconCancel = faTimes;
    this.page = 0;
    this.pageLimit = 5;
    this.filterPattern = "";
    this.searching = false;
  }

  ngOnInit(): void {
    this.loadGitUsers();
  }

  /**
   * METHOD TO CANCEL THE USER SEARCHING
   */
  public cancelSearching() {
    this.filterPattern = "";
    this.searching = false;
    this.filteredUserList = JSON.parse(JSON.stringify(this.fullUserList)).slice(this.page, this.pageLimit);
    setTimeout(() => {
      this.initializeCanvasList();
    }, 500);
  }

  /**
   * METHOD TO SEARCH A GIT USER BY HIS/HER USERNAME FROM THE GIT HUB CONTROLLER SERVICE
   */
  public searchByUsername() {
    this.searching = true;
    this._GithubControllerService.getUsersByUseraname(this.filterPattern).subscribe((userData: GitUser) => {
      this.filteredUserList = [userData];
      setTimeout(() => {
        this.initializeCanvasList();
      }, 500);
    });
  }

  /**
   * METHOD TO FILTER AND PREPARE THE GIT HUB USER LIST TO BE SHOWN IN THE VIEW IN AN SPECIFIC PAGE
   */
  public filterUsersList(goForward: boolean) {
    this.page = goForward ? this.page + 1 : this.page - 1;
    const filterFrom = this.page * this.pageLimit;
    const filterTo = filterFrom + this.pageLimit;
    this.filteredUserList = JSON.parse(JSON.stringify(this.fullUserList)).slice(filterFrom, filterTo);
    setTimeout(() => {
      this.initializeCanvasList();
    }, 500);
  }

  /**
   * METHOD TO PREPARE THE CANVAS TO SHOW THE PROFILES PICTURES
   */
  private initializeCanvasList() {
    this.filteredUserList.map((record, index) => {
      const canvas = document.getElementById(this.canvasIdPrefix + record.id);
      main(canvas, record.avatarUrl);
    });
  }

  /**
   * METHOD TO LOAD ALL GITHUB USERS FROM THE GIT HUB CONTROLLER SERVICE
   */
  private loadGitUsers() {
    this.loadUsersSubs = this._GithubControllerService.getAllUsers().subscribe((gitUserList: GitUser[]) => {
      this.fullUserList = gitUserList;
      this.filteredUserList = JSON.parse(JSON.stringify(this.fullUserList)).slice(this.page, this.pageLimit);
      setTimeout(() => {
        this.initializeCanvasList();
      }, 500);
    });
  }

  ngOnDestroy() {
    if (this.loadUsersSubs) {
      this.loadUsersSubs.unsubscribe();
    }
  }
}
