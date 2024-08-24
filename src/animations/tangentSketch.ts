// src/animations/tangentSketch.ts

import p5 from 'p5';

export const tangentSketch: P5SketchFunction = (p: p5) => {
    let t = 0;
    let isPlaying = true;
    let speed = 1;
    let tangentLength = 180;  // Adjustable tangent length

    const logCurve = (x: number): number => 100 * Math.log(x / 30 + 1);

    p.setup = () => {
        p.createCanvas(400, 400);
    };

    p.draw = () => {
        p.background(0);

        if (isPlaying) {
            t += 0.005 * speed;
            if (t > 1) t = 0;
        }

        const originX = 50;
        const originY = 350;
        p.translate(originX, originY);
        p.scale(1, -1);

        // Draw axes
        p.stroke(128);
        p.strokeWeight(2);
        p.line(0, 0, 300, 0);
        p.line(300, 0, 290, 10);
        p.line(300, 0, 290, -10);
        p.line(0, 0, 0, 300);
        p.line(0, 300, 10, 290);
        p.line(0, 300, -10, 290);

        // Draw curve
        p.noFill();
        p.stroke(0, 0, 255);
        p.beginShape();
        for (let x = 0; x <= 300; x++) {
            let y = logCurve(x);
            p.vertex(x, y);
        }
        p.endShape();

        // Calculate point and tangent
        let x = p.map(t, 0, 1, 30, 270);
        let y = logCurve(x);
        let dx = 0.1;
        let y1 = logCurve(x - dx);
        let y2 = logCurve(x + dx);
        let slope = (y2 - y1) / (2 * dx);

        // Draw tangent line with adjustable length
        const angle = Math.atan(slope);
        const xOffset = (tangentLength / 2) * Math.cos(angle);
        const yOffset = (tangentLength / 2) * Math.sin(angle);

        p.stroke(255, 0, 0);
        p.line(x - xOffset, y - yOffset, x + xOffset, y + yOffset);

        // Draw point
        p.fill(255, 165, 0);  // Orange color
        p.noStroke();
        p.ellipse(x, y, 10, 10);

        // Draw x and y coordinate points on axes
        p.fill(255, 255, 0);  // Yellow color
        p.ellipse(x, 0, 8, 8);  // x-coordinate point
        p.ellipse(0, y, 8, 8);  // y-coordinate point

        // Display slope value and coordinates
        p.resetMatrix();  // Reset the transformation to draw text correctly
        p.fill(255);
        p.textSize(16);
        p.textAlign(p.LEFT, p.TOP);
        p.text(`Slope: ${slope.toFixed(3)}`, 10, 10);
        p.text(`x: ${(x - originX).toFixed(1)}`, 10, 30);
        p.text(`y: ${(originY - y).toFixed(1)}`, 10, 50);
    };

    return {
        setPlaying: (play: boolean) => {
            isPlaying = play;
        },
        setSpeed: (newSpeed: number) => {
            speed = newSpeed;
        },
        setTangentLength: (length: number) => {
            tangentLength = length;
        }
    };
};
