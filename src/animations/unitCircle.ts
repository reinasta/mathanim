import p5 from 'p5';

/* 
Main source of the code is https://p5js.org/examples/angles-and-motion-sine-cosine/
*/

export const unitCircle: P5SketchFunction = (p: p5) => {
  let circleX = 200;
  let circleY = 150;
  let circleRadius = 75;
  let graphX = 50;
  let graphY = 300;
  let graphAmplitude = 50;
  let graphPeriod = 300;
  let angle = 0;
  let isPlaying = true;
  let speed = 1;

  p.setup = () => {
    p.createCanvas(400, 400);
    p.angleMode(p.DEGREES);
  };

  p.draw = () => {
    p.background(0);

    if (isPlaying) {
      angle = (angle + speed) % 360;
    }

    // Display current angle value
    p.fill(255);
    p.textSize(20);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`angle: ${Math.round(angle)}`, 25, 25);

    // Draw circle and diameters
    p.noFill();
    p.stroke(128);
    p.strokeWeight(3);
    p.circle(circleX, circleY, 2 * circleRadius);
    p.line(circleX, circleY - circleRadius, circleX, circleY + circleRadius);
    p.line(circleX - circleRadius, circleY, circleX + circleRadius, circleY);

    // Draw moving points
    let pointX = circleX + circleRadius * p.cos(angle);
    let pointY = circleY - circleRadius * p.sin(angle);
    p.line(circleX, circleY, pointX, pointY);
    p.noStroke();
    p.fill('white');
    p.circle(pointX, pointY, 10);
    p.fill('orange');
    p.circle(pointX, circleY, 10);
    p.fill('red');
    p.circle(circleX, pointY, 10);

    // Draw graph
    p.stroke('grey');
    p.strokeWeight(3);
    p.line(graphX, graphY, graphX + 300, graphY);
    p.line(graphX, graphY - graphAmplitude, graphX, graphY + graphAmplitude);
    p.line(
      graphX + graphPeriod,
      graphY - graphAmplitude,
      graphX + graphPeriod,
      graphY + graphAmplitude
    );
    p.fill('grey');
    p.strokeWeight(1);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('0', graphX, graphY + graphAmplitude + 20);
    p.text('360', graphX + graphPeriod, graphY + graphAmplitude + 20);
    p.text('1', graphX / 2, graphY - graphAmplitude);
    p.text('0', graphX / 2, graphY);
    p.text('-1', graphX / 2, graphY + graphAmplitude);
    p.fill('orange');
    p.text('cos', graphX + graphPeriod + graphX / 2, graphY - graphAmplitude);
    p.fill('red');
    p.text('sin', graphX + graphPeriod + graphX / 2, graphY);

    // Draw cosine curve
    p.noFill();
    p.stroke('orange');
    p.beginShape();
    for (let t = 0; t <= 360; t++) {
      let x = p.map(t, 0, 360, graphX, graphX + graphPeriod);
      let y = graphY - graphAmplitude * p.cos(t);
      p.vertex(x, y);
    }
    p.endShape();

    // Draw sine curve
    p.noFill();
    p.stroke('red');
    p.beginShape();
    for (let t = 0; t <= 360; t++) {
      let x = p.map(t, 0, 360, graphX, graphX + graphPeriod);
      let y = graphY - graphAmplitude * p.sin(t);
      p.vertex(x, y);
    }
    p.endShape();

    // Draw moving line
    let lineX = p.map(angle, 0, 360, graphX, graphX + graphPeriod);
    p.stroke('grey');
    p.line(lineX, graphY - graphAmplitude, lineX, graphY + graphAmplitude);

    // Draw moving points on graph
    let orangeY = graphY - graphAmplitude * p.cos(angle);
    let redY = graphY - graphAmplitude * p.sin(angle);
    p.noStroke();
    p.fill('orange');
    p.circle(lineX, orangeY, 10);
    p.fill('red');
    p.circle(lineX, redY, 10);
  };

  return {
    setPlaying: (play: boolean) => {
      isPlaying = play;
    },
    setSpeed: (newSpeed: number) => {
      speed = newSpeed;
    }
  };
};