/**
 * Bloch Sphere Integration for quantumstuff.org
 * High-quality 3D Bloch sphere visualization with interactive controls
 * Provides simple API for lesson5.js to control the sphere
 */

window.createBlochSphereViz = function(containerId, options) {
    options = options || {};
    var containerWidth = options.width || 400;
    var containerHeight = options.height || 400;

    var container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found:', containerId);
        return null;
    }

    // Set container size
    container.style.width = containerWidth + 'px';
    container.style.height = containerHeight + 'px';
    container.style.position = 'relative';

    // THREE.js and OrbitControls must be loaded globally
    if (typeof THREE === 'undefined' || typeof OrbitControls === 'undefined') {
        console.error('THREE.js or OrbitControls not loaded');
        return null;
    }

    // Math.js must be loaded
    if (typeof math === 'undefined') {
        console.error('math.js not loaded');
        return null;
    }

    // Initialize quantum state to |0⟩
    var qubitState = math.matrix([[1], [0]]);

    // THREE.js setup
    THREE.Object3D.DefaultUp.set(0, 0, 1);

    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(containerWidth, containerHeight);
    container.appendChild(renderer.domElement);

    // Camera
    var camera = new THREE.PerspectiveCamera(40, containerWidth / containerHeight, 1, 1000);
    camera.position.set(30, 15, 20);
    scene.add(camera);

    // Controls
    var orbit = new OrbitControls(camera, renderer.domElement);
    orbit.minDistance = 20;
    orbit.maxDistance = 80;
    orbit.maxPolarAngle = Math.PI / 2;
    orbit.enablePan = false;
    orbit.addEventListener('change', function() { doDraw = true; });

    // Lighting
    scene.add(new THREE.AmbientLight(0x222222));

    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(50, -50, 100);
    scene.add(light);

    // Axes helper
    scene.add(new THREE.AxesHelper(12));

    // Load textures for labels
    var loader = new THREE.TextureLoader();

    var ket0t = loader.load('bloch-viz-assets/ket 0.png', function() { doDraw = true; });
    var ket1t = loader.load('bloch-viz-assets/ket 1.png', function() { doDraw = true; });
    var ket0m = new THREE.SpriteMaterial({ map: ket0t, alphaTest: 0.1, sizeAttenuation: false });
    var ket1m = new THREE.SpriteMaterial({ map: ket1t, alphaTest: 0.1, sizeAttenuation: false });

    var ket0s = new THREE.Sprite(ket0m);
    ket0s.renderOrder = 0;
    ket0s.position.set(0, 0, 10);
    ket0s.center.set(-0.5, -0.5);
    ket0s.scale.multiplyScalar(1/32);

    var ket1s = new THREE.Sprite(ket1m);
    ket1s.renderOrder = 0;
    ket1s.position.set(0, 0, -10);
    ket1s.center.set(0.5, 1.5);
    ket1s.scale.multiplyScalar(1/32);

    scene.add(ket0s);
    scene.add(ket1s);

    var group = new THREE.Group();
    scene.add(group);

    // Sphere material - this is the key to the beautiful appearance!
    var meshMaterial = new THREE.MeshLambertMaterial({
        color: 0xbbbbbb,
        opacity: 0.5,
        transparent: true
    });

    var meshGeometry = new THREE.SphereGeometry(10, 64, 64);

    var mesh = new THREE.Mesh(meshGeometry, meshMaterial.clone());
    mesh.material.side = THREE.FrontSide;
    mesh.renderOrder = 1;
    group.add(mesh);

    // Coordinate circles
    var circleGeometry = new THREE.CircleGeometry(10.05, 64);
    circleGeometry.vertices.shift();
    circleGeometry.vertices.push(circleGeometry.vertices[0]);

    var circleZMaterial = new THREE.LineDashedMaterial({
        color: 0x000000,
        linewidth: 1,
        scale: 1,
        dashSize: 0.5,
        gapSize: 0.5,
    });
    var circleZGeometry = circleGeometry.clone();
    var circleZ = new THREE.Line(circleZGeometry, circleZMaterial);
    circleZ.computeLineDistances();
    scene.add(circleZ);

    var circleXMaterial = new THREE.LineBasicMaterial({
        color: 0x999999,
        linewidth: 1,
    });
    var circleXGeometry = circleGeometry.clone();
    circleXGeometry.rotateY(Math.PI/2);
    var circleX = new THREE.Line(circleXGeometry, circleXMaterial);
    circleX.computeLineDistances();
    scene.add(circleX);

    var circleYGeometry = circleGeometry.clone();
    circleYGeometry.rotateX(Math.PI/2);
    var circleY = new THREE.Line(circleYGeometry, circleXMaterial);
    circleY.computeLineDistances();
    scene.add(circleY);

    // State arrow
    var arrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, 0),
        10,
        0x000000,
        1,
        0.4
    );
    arrow.line.material.linewidth = 2;
    group.add(arrow);

    // Animation variables
    var doDraw = true;
    var animating = false;
    var animatingStarted, animatingAxis = new THREE.Vector3();
    var animatingAngle, animatingBaseState = new THREE.Vector3();
    var tmpVec = new THREE.Vector3();

    // Animation loop
    function animate(T) {
        if (animating) {
            doDraw = true;
            var t = (T - animatingStarted) / 1000;
            if (t >= 0.5) {  // 500ms animation
                animating = false;
                tmpVec.set.apply(tmpVec, stateToBloch(qubitState));
                arrow.setDirection(tmpVec);
            } else {
                arrow.setDirection(animatingBaseState);
                arrow.rotateOnWorldAxis(animatingAxis, animatingAngle * (t / 0.5));
            }
        }

        if (doDraw) {
            orbit.update();
            renderer.render(scene, camera);
        }
        doDraw = false;
        requestAnimationFrame(animate);
    }
    animate();

    // Update arrow to match current state
    function updateArrow() {
        tmpVec.set.apply(tmpVec, stateToBloch(qubitState));
        arrow.setDirection(tmpVec);
        doDraw = true;
    }

    // Public API
    return {
        // Apply a quantum gate with animation
        applyGate: function(gateName) {
            if (!ports[gateName]) {
                console.error('Unknown gate:', gateName);
                return;
            }

            var gate = ports[gateName];
            animatingStarted = performance.now();
            animatingAxis.set.apply(animatingAxis, stateToBloch(gate.eigenvector));
            animatingAngle = gate.rotation;
            if (animatingAngle < 0) {
                animatingAngle *= -1;
                animatingAxis.negate();
            }
            animatingBaseState.set.apply(animatingBaseState, stateToBloch(qubitState));
            qubitState = math.multiply(gate.mat, qubitState);
            animating = true;
        },

        // Reset to |0⟩ state
        reset: function() {
            animating = false;
            qubitState = math.matrix([[1], [0]]);
            updateArrow();
        },

        // Set to |1⟩ state
        resetTo1: function() {
            animating = false;
            qubitState = math.matrix([[0], [1]]);
            updateArrow();
        },

        // Get current state
        getState: function() {
            return qubitState;
        },

        // Set state directly (for advanced control)
        setState: function(state) {
            animating = false;
            qubitState = state;
            updateArrow();
        }
    };
};
