$(document).ready(function() {

    const canvas = document.querySelector('canvas');
    const c = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
        x: undefined,
        y: undefined
    };

    const colors = [
        '#FAFAFA',
        '#C7EEFF',
        '#0077C0',
        '#1D242B'
    ];

    var gravity = 1;
    var friction = 0.7;

    // Event Listeners
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init();
    });

    window.addEventListener('click', function() {
        init();
    })

    // Utility Functions
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Objects
    function Ball(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;

        this.draw = function() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.stroke();
            c.closePath();
        }

        this.update = function() {
            if (this.y + this.radius + this.dy > canvas.height) {
                this.dy = -this.dy * friction;
            } else {
                this.dy += gravity;
            }
            if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
                this.dx = -this.dx;
            }
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }

    }

    // Implementation
    var ballArray;
    function init() {
        ballArray = [];
        for (var i = 0; i < 300; i++) {
            var radius = randomIntFromRange(8, 20);
            var x = randomIntFromRange(radius, canvas.width - radius);
            var y = randomIntFromRange(0, canvas.height - radius);
            var dx = randomIntFromRange(-2, 2);
            var dy = randomIntFromRange(-2, 2);
            var color = randomColor(colors);
            ballArray.push(new Ball(
                x, // x coordinate
                y, // y coordinate
                dx, // x velocity
                dy, // y velocity
                radius, // object radius
                color // object color
            ));
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < ballArray.length; i++) {
            ballArray[i].update();
        }

    }

    init();
    animate();

});