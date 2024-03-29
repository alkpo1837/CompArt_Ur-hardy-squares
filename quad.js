const FADE_IN_DURATION = 250;

const COLORS = ['#E63946', '#F6BD60', '#A8DADC', '#457B9D', '#1D3557'];

class Quad {
  constructor(centerX, centerY, sizeSide) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.sizeSide = sizeSide;

    this.leftX = this.centerX - this.sizeSide / 2;
    this.topY = this.centerY - this.sizeSide / 2;
    this.rightX = this.centerX + this.sizeSide / 2;
    this.bottomY = this.centerY + this.sizeSide / 2;

    this.currTime = 0;
    this.intervals = [];
    this.speed = Math.random() * (1500 - 1000) + 1000;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];

    this.strokeWeight = 2;
    this.alpha = 0;
    this.isFadingIn = false;

    this.generateIntervals();
  }

  generateIntervals() {
    let lastInterval = 0;

    while (lastInterval <= 4) {
      let startInterval = lastInterval + Math.random();
      let endInterval = Math.random() * (1 - 0.75) + 0.25 + startInterval;

      if (startInterval > 4) break;
      if (endInterval > 4) endInterval = 4;

      this.intervals.push({ start: startInterval, end: endInterval });
      lastInterval = endInterval;
    }
  }

  drawLineFromTo(start, end) {
    if (Math.floor(start) != Math.floor(end) && (end % 1 != 0) & (end > start)) {
      this.drawLineFromTo(start, Math.floor(end));
      this.drawLineFromTo(Math.floor(end), end);
    }

    if (start <= 1 && end <= 1) {
      line(this.leftX + this.sizeSide * start, this.topY, this.rightX - this.sizeSide * (1 - end), this.topY);
    } else if (start >= 1 && start <= 2 && end >= 1 && end <= 2) {
      line(this.rightX, this.topY + this.sizeSide * (start - 1), this.rightX, this.bottomY - this.sizeSide * (2 - end));
    } else if (start >= 2 && start <= 3 && end >= 2 && end <= 3) {
      line(this.rightX - this.sizeSide * (start - 2), this.bottomY, this.leftX + this.sizeSide * (3 - end), this.bottomY);
    } else if (start >= 3 && start <= 4 && end >= 3 && end <= 4) {
      line(this.leftX, this.bottomY - this.sizeSide * (start - 3), this.leftX, this.topY + this.sizeSide * (4 - end));
    } else if (start >= 3 && start <= 4 && end >= 0 && end <= 1) {
      this.drawLineFromTo(start, 4);
      this.drawLineFromTo(0, end);
    }
  }

  draw() {
    if (this.alpha == 0 && this.isFadingIn == false) this.isFadingIn = true;

    let colorAlpha = color(this.color);
    colorAlpha.setAlpha(this.alpha);
    stroke(colorAlpha);

    strokeWeight(this.strokeWeight);

    this.currTime += deltaTime / this.speed;

    this.intervals.forEach((interval) => {
      const start = (interval.start + this.currTime) % 4;
      const end = (interval.end + this.currTime) % 4;
      this.drawLineFromTo(start, end);
    });

    if (this.isFadingIn) {
      this.alpha = Math.min(this.alpha + deltaTime / 3, 255);

      if (this.alpha == 255) this.isFadingIn = false;
    }
  }
}

export { Quad };
