// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => { document.getElementById('loader').style.display = 'none'; }, 500);
  }, 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .flip-card, .glass-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.animate-up').forEach(element => {
  gsap.fromTo(element, 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: element, start: "top 85%" } }
  );
});

// Vanilla Tilt
VanillaTilt.init(document.querySelectorAll(".tilt-card"), { max: 15, speed: 400, glare: true, "max-glare": 0.2 });

// Swiper Init
if(document.querySelector('.swiper')) {
  new Swiper('.swiper', {
    slidesPerView: 1, spaceBetween: 30, loop: true, autoplay: { delay: 3000 },
    breakpoints: { 768: { slidesPerView: 3 } }
  });
}

// Three.js Hero Canvas (Wireframe Car Silhouette Simulation)
const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Abstract Car Shape
  const geometry = new THREE.BoxGeometry(4, 1.5, 2);
  const edges = new THREE.EdgesGeometry(geometry);
  const material = new THREE.LineBasicMaterial({ color: 0xe63946, linewidth: 2 });
  const car = new THREE.LineSegments(edges, material);
  scene.add(car);

  // Particles
  const particlesGeo = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = new Float32Array(particlesCount * 3);
  for(let i=0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 15; }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0x00b4d8 });
  const particleMesh = new THREE.Points(particlesGeo, particleMaterial);
  scene.add(particleMesh);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    car.rotation.y += 0.01;
    car.rotation.x += 0.005;
    particleMesh.rotation.y -= 0.002;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
