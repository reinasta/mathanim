// src/animations/testAnimation.ts

import p5 from 'p5';

export const testAnimation: P5SketchFunction = (p: p5) => {
    p.setup = () => {
        p.createCanvas(400, 400);
    };

    p.draw = () => {
        p.background(220);
        p.ellipse(p.width / 2, p.height / 2, 100, 100);
    };
};
// for bundling with webpack
//export default testAnimation;
//export { testAnimation };
