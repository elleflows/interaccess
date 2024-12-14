let radiolaria = [];
const NUM_RADIOLARIA = 15;
const MUTATION_CHANCE = 0.02; // 2% chance to mutate per frame

function setup() {
    createCanvas(7680, 742);
    colorMode(RGB);
    
    // Initialize radiolaria
    for (let i = 0; i < NUM_RADIOLARIA; i++) {
        radiolaria.push(new Radiolarian());
    }
}

function draw() {
    background(0, 10); // Slight trail effect
    
    // Update and display all radiolaria
    for (let r of radiolaria) {
        r.update();
        r.display();
    }
}

class Radiolarian {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(50, 150);
        this.spikes = floor(random(8, 16));
        this.innerRadius = this.size * 0.4;
        this.velocity = createVector(random(-1, 1), random(-0.5, 0.5));
        this.noiseOffset = random(1000);
        this.color = color(200, 220, 255, 150);
    }

    update() {
        // Move
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Wrap around screen
        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = -this.size;
        
        // Random mutation
        if (random() < MUTATION_CHANCE) {
            this.mutate();
        }
    }

    mutate() {
        this.spikes = floor(random(8, 16));
        this.innerRadius = this.size * random(0.3, 0.5);
        this.velocity.rotate(random(-PI/4, PI/4));
    }

    display() {
        push();
        translate(this.x, this.y);
        
        // Draw radiolarian
        stroke(this.color);
        noFill();
        
        // Inner circle
        circle(0, 0, this.innerRadius * 2);
        
        // Spikes
        for (let i = 0; i < this.spikes; i++) {
            let angle = TWO_PI * i / this.spikes;
            let noiseVal = noise(this.noiseOffset + frameCount * 0.01 + i);
            let spikeLength = this.size * noiseVal;
            
            let x1 = cos(angle) * this.innerRadius;
            let y1 = sin(angle) * this.innerRadius;
            let x2 = cos(angle) * spikeLength;
            let y2 = sin(angle) * spikeLength;
            
            line(x1, y1, x2, y2);
            
            // Add some cross connections
            if (i < this.spikes - 1) {
                let nextAngle = TWO_PI * (i + 1) / this.spikes;
                let nextX = cos(nextAngle) * spikeLength * 0.8;
                let nextY = sin(nextAngle) * spikeLength * 0.8;
                line(x2, y2, nextX, nextY);
            }
        }
        
        pop();
    }
}