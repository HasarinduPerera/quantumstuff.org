/**
 * bloch-sphere-config.js
 * Shared 3D Bloch Sphere Configuration
 *
 * EDIT ALL COLORS AND SETTINGS HERE - this file is used by all lessons
 *
 * NOTE: THREE and OrbitControls must be loaded globally before this file
 */

// ============================================================================
// EDIT THESE VALUES TO CHANGE THE BLOCH SPHERE APPEARANCE
// ============================================================================

// LIGHTING CONFIGURATION - FROM test_bloch_clean.html (WORKING VERSION)
const BLOCH_LIGHTING = {
    ambient: {
        color: 0xffffff,           // White ambient
        intensity: 0.6             // 0.6 intensity
    },
    directional: {
        color: 0xffffff,           // White directional light
        intensity: 0.6,            // 0.6 intensity
        position: {x: 5, y: 5, z: 5}  // Position (5,5,5)
    }
};

// SPHERE CONFIGURATION - FROM test_bloch_clean.html (WORKING VERSION)
const BLOCH_SPHERE = {
    color: 0xcccccc,               // Light gray 0xcccccc
    opacity: 0.3,                  // 30% opacity
    segments: 64,                  // 64 segments
    material: 'phong',             // MeshPhongMaterial
    shininess: 30                  // Shininess 30
};

// GRID LINES CONFIGURATION
const BLOCH_GRID = {
    color: 0xbbbbbb,               // Grid line color
    opacity: 0.2                   // Grid line transparency
};

// COORDINATE CIRCLES CONFIGURATION - FROM test_bloch_clean.html
const BLOCH_CIRCLES = {
    xy: {color: 0x00ff00, opacity: 0.4},  // XY plane circle (green)
    xz: {color: 0xff0000, opacity: 0.4},  // XZ plane circle (red)
    yz: {color: 0x0000ff, opacity: 0.4}   // YZ plane circle (blue - Z-axis)
};

// AXES CONFIGURATION - FROM test_bloch_clean.html
const BLOCH_AXES = {
    x: {color: 0xff0000},          // X axis color (red)
    y: {color: 0x00ff00},          // Y axis color (green)
    z: {color: 0x0000ff}           // Z axis color (blue - vertical)
};

// STATE ARROW CONFIGURATION - FROM test_bloch_clean.html
const BLOCH_ARROW = {
    color: 0xaa44aa,               // Arrow color (purple/magenta)
    // Try: 0x5FDD97 (bright green), 0xaa44aa (purple), 0xff0000 (red)
    length: 1.0,                   // Arrow length
    headLength: 0.15,              // Arrow head size
    headWidth: 0.1                 // Arrow head width
};

// LABELS CONFIGURATION - FROM test_bloch_clean.html
const BLOCH_LABELS = {
    label0: '#2d5016',             // |0⟩ label color (green)
    label1: '#8b7355'              // |1⟩ label color (brown)
};

// SCENE BACKGROUND
const BLOCH_BACKGROUND = 0xffffff;  // Background color (white)

// ============================================================================
// BLOCH SPHERE CREATION FUNCTION
// ============================================================================

window.createBlochSphere3D = function(containerId, options) {
    const opts = {
        width: options.width || 400,
        height: options.height || 400,
        showSliders: options.showSliders !== undefined ? options.showSliders : false,
        autoRotate: options.autoRotate !== undefined ? options.autoRotate : false
    };

    const container = document.getElementById(containerId);
    if (!container) return null;

    const canvasContainer = document.createElement('div');
    canvasContainer.style.width = opts.width + 'px';
    canvasContainer.style.height = opts.height + 'px';
    canvasContainer.style.margin = '0 auto';
    container.appendChild(canvasContainer);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BLOCH_BACKGROUND);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(3, 1.5, 2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(opts.width, opts.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(BLOCH_BACKGROUND);
    canvasContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 8;
    controls.enablePan = false;
    controls.autoRotate = opts.autoRotate;
    controls.autoRotateSpeed = 1.0;

    // LIGHTING - FROM test_bloch_clean.html
    const ambientLight = new THREE.AmbientLight(
        BLOCH_LIGHTING.ambient.color,
        BLOCH_LIGHTING.ambient.intensity
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
        BLOCH_LIGHTING.directional.color,
        BLOCH_LIGHTING.directional.intensity
    );
    directionalLight.position.set(
        BLOCH_LIGHTING.directional.position.x,
        BLOCH_LIGHTING.directional.position.y,
        BLOCH_LIGHTING.directional.position.z
    );
    scene.add(directionalLight);

    // SPHERE
    const sphereGeometry = new THREE.SphereGeometry(1, BLOCH_SPHERE.segments, BLOCH_SPHERE.segments);
    const sphereMaterial = BLOCH_SPHERE.material === 'phong'
        ? new THREE.MeshPhongMaterial({
            color: BLOCH_SPHERE.color,
            transparent: true,
            opacity: BLOCH_SPHERE.opacity,
            shininess: BLOCH_SPHERE.shininess || 30,
            side: THREE.DoubleSide
        })
        : new THREE.MeshLambertMaterial({
            color: BLOCH_SPHERE.color,
            transparent: true,
            opacity: BLOCH_SPHERE.opacity,
            side: THREE.DoubleSide
        });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // GRID LINES - latitude
    function createLatitudeLine(radius, latitude, segments) {
        segments = segments || 64;
        const points = [];
        const y = radius * Math.sin(latitude);
        const circleRadius = radius * Math.cos(latitude);

        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const x = circleRadius * Math.cos(theta);
            const z = circleRadius * Math.sin(theta);
            points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: BLOCH_GRID.color,
            transparent: true,
            opacity: BLOCH_GRID.opacity
        });
        return new THREE.Line(geometry, material);
    }

    // GRID LINES - longitude
    function createLongitudeLine(radius, longitude, segments) {
        segments = segments || 64;
        const points = [];
        for (let i = 0; i <= segments; i++) {
            const phi = (i / segments) * Math.PI;
            const x = radius * Math.sin(phi) * Math.cos(longitude);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(longitude);
            points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: BLOCH_GRID.color,
            transparent: true,
            opacity: BLOCH_GRID.opacity
        });
        return new THREE.Line(geometry, material);
    }

    // Add latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        scene.add(createLatitudeLine(1, latRad));
    }

    // Add longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
        const lonRad = (lon * Math.PI) / 180;
        scene.add(createLongitudeLine(1, lonRad));
    }

    // MAIN COORDINATE CIRCLES
    function createMainCircle(radius, color, opacity, plane, segments) {
        segments = segments || 128;
        const points = [];

        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            let x, y, z;
            if (plane === 'xy') {
                x = radius * Math.cos(theta);
                z = radius * Math.sin(theta);
                y = 0;
            } else if (plane === 'xz') {
                x = radius * Math.cos(theta);
                y = 0;
                z = radius * Math.sin(theta);
            } else {
                x = 0;
                y = radius * Math.cos(theta);
                z = radius * Math.sin(theta);
            }
            points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineDashedMaterial({
            color: color,
            dashSize: 0.05,
            gapSize: 0.05,
            linewidth: 1,
            transparent: true,
            opacity: opacity
        });
        const circle = new THREE.Line(geometry, material);
        circle.computeLineDistances();
        return circle;
    }

    scene.add(createMainCircle(1, BLOCH_CIRCLES.xy.color, BLOCH_CIRCLES.xy.opacity, 'xy'));
    scene.add(createMainCircle(1, BLOCH_CIRCLES.xz.color, BLOCH_CIRCLES.xz.opacity, 'xz'));
    scene.add(createMainCircle(1, BLOCH_CIRCLES.yz.color, BLOCH_CIRCLES.yz.opacity, 'yz'));

    // AXES
    function createAxis(color, start, end) {
        const points = [start, end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: color,
            linewidth: 2
        });
        return new THREE.Line(geometry, material);
    }

    scene.add(createAxis(BLOCH_AXES.x.color, new THREE.Vector3(-1.5, 0, 0), new THREE.Vector3(1.5, 0, 0)));
    scene.add(createAxis(BLOCH_AXES.y.color, new THREE.Vector3(0, 0, -1.5), new THREE.Vector3(0, 0, 1.5)));
    scene.add(createAxis(BLOCH_AXES.z.color, new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(0, 1.5, 0)));

    // STATE ARROW
    const stateArrow = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 0),
        BLOCH_ARROW.length,
        BLOCH_ARROW.color,
        BLOCH_ARROW.headLength,
        BLOCH_ARROW.headWidth
    );
    scene.add(stateArrow);

    // LABELS
    function createDetailedLabel(text, color, position) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;

        context.font = 'Bold 64px Arial';
        context.fillStyle = color;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 128, 64);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.5, 0.25, 1);
        sprite.position.copy(position);
        return sprite;
    }

    scene.add(createDetailedLabel('|0⟩', BLOCH_LABELS.label0, new THREE.Vector3(0, 1.3, 0)));
    scene.add(createDetailedLabel('|1⟩', BLOCH_LABELS.label1, new THREE.Vector3(0, -1.3, 0)));

    // SLIDERS (optional)
    if (opts.showSliders) {
        const controlsDiv = document.createElement('div');
        controlsDiv.style.marginTop = '1rem';
        controlsDiv.style.padding = '1rem';
        controlsDiv.style.background = 'var(--bg-secondary)';
        controlsDiv.style.borderRadius = '6px';

        controlsDiv.innerHTML = '<label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">� (theta): <span id="' + containerId + '-theta-val" style="color: var(--primary-color); font-weight: 700;">0�</span><input type="range" id="' + containerId + '-theta" min="0" max="180" value="0" style="width: 100%; margin-bottom: 1rem;"></label><label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">� (phi): <span id="' + containerId + '-phi-val" style="color: var(--secondary-color); font-weight: 700;">0�</span><input type="range" id="' + containerId + '-phi" min="0" max="360" value="0" style="width: 100%;"></label><div id="' + containerId + '-state" style="margin-top: 1rem; padding: 0.75rem; background: white; border-radius: 4px; text-align: center; font-family: monospace;">State: |0�</div>';
        container.appendChild(controlsDiv);

        const thetaSlider = document.getElementById(containerId + '-theta');
        const phiSlider = document.getElementById(containerId + '-phi');
        const thetaVal = document.getElementById(containerId + '-theta-val');
        const phiVal = document.getElementById(containerId + '-phi-val');
        const stateDisplay = document.getElementById(containerId + '-state');

        function updateFromSliders() {
            const thetaDeg = parseFloat(thetaSlider.value);
            const phiDeg = parseFloat(phiSlider.value);
            thetaVal.textContent = thetaDeg + '�';
            phiVal.textContent = phiDeg + '�';

            const thetaRad = (thetaDeg * Math.PI) / 180;
            const phiRad = (phiDeg * Math.PI) / 180;

            updateArrow(thetaRad, phiRad);

            if (thetaDeg === 0) stateDisplay.textContent = 'State: |0� (North Pole)';
            else if (thetaDeg === 180) stateDisplay.textContent = 'State: |1� (South Pole)';
            else if (thetaDeg === 90 && phiDeg === 0) stateDisplay.textContent = 'State: |+� (Equator)';
            else stateDisplay.textContent = 'State: |�� (�=' + thetaDeg + '�, �=' + phiDeg + '�)';
        }

        thetaSlider.addEventListener('input', updateFromSliders);
        phiSlider.addEventListener('input', updateFromSliders);
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // State tracking
    let currentTheta = 0;
    let currentPhi = 0;

    function updateArrow(theta, phi) {
        currentTheta = theta;
        currentPhi = phi;

        const x = Math.sin(theta) * Math.cos(phi);
        const y = Math.cos(theta);
        const z = Math.sin(theta) * Math.sin(phi);

        const newDir = new THREE.Vector3(x, y, z).normalize();
        stateArrow.setDirection(newDir);
    }

    return {
        updateProbability(prob0) {
            const theta = Math.acos(Math.sqrt(prob0));
            updateArrow(theta, 0);
        }
    };
};
