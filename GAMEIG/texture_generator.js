import * as THREE from 'three';

export function createMoonTexture() {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // 1. Base Grey
    ctx.fillStyle = '#555555';
    ctx.fillRect(0, 0, size, size);

    // 2. Noise (Dust)
    for (let i = 0; i < 50000; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const shade = Math.random() * 50 + 50; // Grey variation
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
        ctx.fillRect(x, y, 2, 2);
    }

    // 3. Craters (Circles with shadows)
    for (let i = 0; i < 50; i++) {
        const cx = Math.random() * size;
        const cy = Math.random() * size;
        const r = Math.random() * 40 + 10;

        // Shadow offset
        const grad = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r);
        grad.addColorStop(0, '#444');
        grad.addColorStop(0.9, '#333');
        grad.addColorStop(1, '#666'); // Rim

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Highlight Rim
        ctx.beginPath();
        ctx.arc(cx - r * 0.2, cy - r * 0.2, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(200,200,200,0.1)';
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4); // Repeat texture
    return texture;
}

export function createGrassTexture() {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // 1. Base Green
    ctx.fillStyle = '#2d8f2d';
    ctx.fillRect(0, 0, size, size);

    // 2. Grass Blades (Noise)
    for (let i = 0; i < 100000; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        // Varying greens
        const g = Math.floor(Math.random() * 100 + 100);
        ctx.fillStyle = `rgb(30, ${g}, 30)`;
        ctx.fillRect(x, y, 1, 3);
    }

    // 3. Dirt patches
    for (let i = 0; i < 20; i++) {
        const cx = Math.random() * size;
        const cy = Math.random() * size;
        const r = Math.random() * 30 + 10;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 70, 30, 0.3)';
        ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8); // Repeat more often for detailed grass
    return texture;
}
