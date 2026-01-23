// fireworksManager.js - 烟花管理模块
class FireworksManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.fireworks = [];
    this.stars = [];
    this.currentBgColorIndex = 0;
    this.backgroundColors = [
      "#0a192f",
      "#9b59b6",
      "#e74c3c",
      "#1abc9c",
      "#f39c12",
      "#2ecc71",
      "#3498db",
      "#e84393",
      "#00cec9",
      "#fd79a8",
      "#6c5ce7",
      "#00b894",
    ];
    this.currentBgColor = this.backgroundColors[this.currentBgColorIndex];
  }

  // 粒子类
  Particle = class {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.velocity = {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8 - 2,
      };
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.005;
      this.size = Math.random() * 3 + 1;
    }

    update() {
      this.velocity.y += 0.1; // 重力
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= this.decay;
      this.size *= 0.99;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  // 烟花类
  Firework = class {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // 随机颜色
      this.particles = [];
      this.createParticles();
    }

    createParticles() {
      const particleCount = 150;
      for (let i = 0; i < particleCount; i++) {
        this.particles.push(
          new FireworksManager.prototype.Particle(this.x, this.y, this.color),
        );
      }
    }

    update() {
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.alpha <= 0) {
          this.particles.splice(index, 1);
        }
      });
    }

    draw(ctx) {
      this.particles.forEach((particle) => {
        particle.draw(ctx);
      });
    }
  };

  // 创建随机烟花
  createRandomFirework() {
    const x = Math.random() * this.canvas.width;
    const y =
      Math.random() * this.canvas.height * 0.6 + this.canvas.height * 0.2;
    this.fireworks.push(new this.Firework(x, y));
  }

  // 创建星星背景
  createStars() {
    this.stars = [];
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.05 + 0.02,
      });
    }
  }

  // 绘制星星
  drawStars() {
    this.stars.forEach((star) => {
      const brightness =
        star.brightness + Math.sin(Date.now() * star.twinkleSpeed) * 0.3;
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, brightness);
      this.ctx.fillStyle = "#ffffff";
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  // 改变背景颜色
  changeBackgroundColor() {
    this.currentBgColorIndex =
      (this.currentBgColorIndex + 1) % this.backgroundColors.length;
    this.currentBgColor = this.backgroundColors[this.currentBgColorIndex];
    document.body.style.backgroundColor = this.currentBgColor;
  }

  // 切换到烟花状态
  enterFireworksState() {
    this.fireworks = [];
    this.stars = [];
  }

  // 切换到星星状态
  enterStarsState() {
    this.createStars();
  }

  // 更新烟花
  updateFireworks() {
    if (Math.random() < 0.05) {
      this.createRandomFirework();
    }

    this.fireworks.forEach((firework, index) => {
      firework.update(this.ctx);
      if (firework.particles.length === 0) {
        this.fireworks.splice(index, 1);
      }
    });
  }

  // 绘制烟花
  drawFireworks() {
    this.fireworks.forEach((firework) => {
      firework.draw(this.ctx);
    });
  }

  // 清除画布
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // 设置画布大小
  setCanvasSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
