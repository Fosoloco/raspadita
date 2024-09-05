document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("scratchCanvas");
    const ctx = canvas.getContext("2d");
    
    // Ajusta el tamaño del canvas al tamaño de su contenedor
    const container = document.querySelector(".scratch-container");
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Rellenar el canvas con un color gris
    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function getTouchPos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.touches[0].clientX - rect.left,
            y: evt.touches[0].clientY - rect.top
        };
    }

    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        const pos = getMousePos(canvas, e);
        scratch(pos.x, pos.y);
    });

    canvas.addEventListener('mousemove', function(e) {
        if (isDrawing) {
            const pos = getMousePos(canvas, e);
            scratch(pos.x, pos.y);
        }
    });

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });

    canvas.addEventListener('touchstart', function(e) {
        isDrawing = true;
        const pos = getTouchPos(canvas, e);
        scratch(pos.x, pos.y);
    });

    canvas.addEventListener('touchmove', function(e) {
        if (isDrawing) {
            const pos = getTouchPos(canvas, e);
            scratch(pos.x, pos.y);
        }
    });

    canvas.addEventListener('touchend', function() {
        isDrawing = false;
    });
});
