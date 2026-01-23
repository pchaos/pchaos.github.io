// kidsManager.js - 小人管理模块
class KidsManager {
  constructor(container) {
    this.container = container;
    this.kidsCount = 2;
  }

  // 创建小人SVG
  createKidsSVG(kidsCount) {
    this.kidsCount = kidsCount;
    this.container.innerHTML = "";
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "kids-svg");

    const svgWidth = Math.max(400, kidsCount * 120);
    svg.setAttribute("viewBox", `0 0 ${svgWidth} 300`);

    const kidSpacing = svgWidth / (kidsCount + 1);

    for (let i = 0; i < kidsCount; i++) {
      const x = kidSpacing * (i + 1);
      const isBoy = i % 2 === 0;
      const isSmall = i >= 2; // 超过2个小人时，多余的小人缩小一半

      const kidGroup = document.createElementNS(svgNS, "g");
      kidGroup.setAttribute("class", isSmall ? "small-kid" : "kid");

      if (isBoy) {
        this.createBoy(svgNS, kidGroup, x, isSmall);
      } else {
        this.createGirl(svgNS, kidGroup, x, isSmall);
      }

      svg.appendChild(kidGroup);
    }

    // 添加牵手线（只在有多个小人时）
    if (kidsCount > 1) {
      for (let i = 0; i < kidsCount - 1; i++) {
        const x1 = kidSpacing * (i + 1);
        const x2 = kidSpacing * (i + 2);

        const handLine = document.createElementNS(svgNS, "path");
        handLine.setAttribute("class", "hand-connection");
        handLine.setAttribute(
          "d",
          `M${x1},150 C${(x1 + x2) / 2},140 ${(x1 + x2) / 2},140 ${x2},150`,
        );
        handLine.setAttribute("fill", "none");
        svg.appendChild(handLine);
      }
    }

    this.container.appendChild(svg);
  }

  // 创建男孩
  createBoy(svgNS, group, x, isSmall) {
    const scale = isSmall ? 0.5 : 1;
    const size = isSmall ? 0.7 : 1;

    // 男孩的短发
    const hair = document.createElementNS(svgNS, "rect");
    hair.setAttribute("class", "boy-hair");
    hair.setAttribute("x", x - 20 * size);
    hair.setAttribute("y", 80 * scale);
    hair.setAttribute("width", 40 * size);
    hair.setAttribute("height", 20 * size);
    hair.setAttribute("rx", 10 * size);
    group.appendChild(hair);

    // 男孩的脸
    const face = document.createElementNS(svgNS, "circle");
    face.setAttribute("class", "kid-face");
    face.setAttribute("cx", x);
    face.setAttribute("cy", 100 * scale);
    face.setAttribute("r", 20 * size);
    group.appendChild(face);

    // 男孩的眼睛
    const eyeLeft = document.createElementNS(svgNS, "circle");
    eyeLeft.setAttribute("fill", "#000");
    eyeLeft.setAttribute("cx", x - 7 * size);
    eyeLeft.setAttribute("cy", 95 * scale);
    eyeLeft.setAttribute("r", 4 * size);
    group.appendChild(eyeLeft);

    const eyeRight = document.createElementNS(svgNS, "circle");
    eyeRight.setAttribute("fill", "#000");
    eyeRight.setAttribute("cx", x + 7 * size);
    eyeRight.setAttribute("cy", 95 * scale);
    eyeRight.setAttribute("r", 4 * size);
    group.appendChild(eyeRight);

    // 男孩的嘴巴
    const mouth = document.createElementNS(svgNS, "path");
    mouth.setAttribute("class", "kid-body");
    mouth.setAttribute(
      "d",
      `M${x - 5 * size},${110 * scale} Q${x},${115 * scale} ${x + 5 * size},${110 * scale}`,
    );
    group.appendChild(mouth);

    // 男孩的身体
    const body = document.createElementNS(svgNS, "rect");
    body.setAttribute("class", "boy-shirt");
    body.setAttribute("x", x - 10 * size);
    body.setAttribute("y", 120 * scale);
    body.setAttribute("width", 20 * size);
    body.setAttribute("height", 40 * size);
    body.setAttribute("rx", 5 * size);
    group.appendChild(body);

    // 男孩的手臂
    const armLeft = document.createElementNS(svgNS, "line");
    armLeft.setAttribute("class", "kid-body");
    armLeft.setAttribute("x1", x);
    armLeft.setAttribute("y1", 130 * scale);
    armLeft.setAttribute("x2", x - 20 * size);
    armLeft.setAttribute("y2", 150 * scale);
    group.appendChild(armLeft);

    const armRight = document.createElementNS(svgNS, "line");
    armRight.setAttribute("class", "kid-body");
    armRight.setAttribute("x1", x);
    armRight.setAttribute("y1", 130 * scale);
    armRight.setAttribute("x2", x + 20 * size);
    armRight.setAttribute("y2", 150 * scale);
    group.appendChild(armRight);

    // 男孩的腿
    const legLeft = document.createElementNS(svgNS, "line");
    legLeft.setAttribute("class", "kid-body");
    legLeft.setAttribute("x1", x);
    legLeft.setAttribute("y1", 160 * scale);
    legLeft.setAttribute("x2", x - 10 * size);
    legLeft.setAttribute("y2", 190 * scale);
    group.appendChild(legLeft);

    const legRight = document.createElementNS(svgNS, "line");
    legRight.setAttribute("class", "kid-body");
    legRight.setAttribute("x1", x);
    legRight.setAttribute("y1", 160 * scale);
    legRight.setAttribute("x2", x + 10 * size);
    legRight.setAttribute("y2", 190 * scale);
    group.appendChild(legRight);
  }

  // 创建女孩
  createGirl(svgNS, group, x, isSmall) {
    const scale = isSmall ? 0.5 : 1;
    const size = isSmall ? 0.7 : 1;

    // 女孩的长发
    const hair = document.createElementNS(svgNS, "path");
    hair.setAttribute("class", "girl-hair");
    hair.setAttribute(
      "d",
      `M${x},${80 * scale} C${x - 10 * size},${60 * scale} ${x - 20 * size},${60 * scale} ${x - 20 * size},${80 * scale} C${x - 30 * size},${100 * scale} ${x - 20 * size},${120 * scale} ${x},${120 * scale} C${x + 20 * size},${120 * scale} ${x + 30 * size},${100 * scale} ${x + 20 * size},${80 * scale} C${x + 20 * size},${60 * scale} ${x + 10 * size},${60 * scale} ${x},${80 * scale} Z`,
    );
    group.appendChild(hair);

    // 女孩的脸
    const face = document.createElementNS(svgNS, "circle");
    face.setAttribute("class", "kid-face");
    face.setAttribute("cx", x);
    face.setAttribute("cy", 100 * scale);
    face.setAttribute("r", 20 * size);
    group.appendChild(face);

    // 女孩的眼睛
    const eyeLeft = document.createElementNS(svgNS, "circle");
    eyeLeft.setAttribute("fill", "#000");
    eyeLeft.setAttribute("cx", x - 7 * size);
    eyeLeft.setAttribute("cy", 95 * scale);
    eyeLeft.setAttribute("r", 4 * size);
    group.appendChild(eyeLeft);

    const eyeRight = document.createElementNS(svgNS, "circle");
    eyeRight.setAttribute("fill", "#000");
    eyeRight.setAttribute("cx", x + 7 * size);
    eyeRight.setAttribute("cy", 95 * scale);
    eyeRight.setAttribute("r", 4 * size);
    group.appendChild(eyeRight);

    // 女孩的嘴巴
    const mouth = document.createElementNS(svgNS, "path");
    mouth.setAttribute("class", "kid-body");
    mouth.setAttribute(
      "d",
      `M${x - 5 * size},${110 * scale} Q${x},${115 * scale} ${x + 5 * size},${110 * scale}`,
    );
    group.appendChild(mouth);

    // 女孩的裙子
    const dress = document.createElementNS(svgNS, "path");
    dress.setAttribute("class", "girl-dress");
    dress.setAttribute(
      "d",
      `M${x - 20 * size},${120 * scale} L${x},${140 * scale} L${x + 20 * size},${120 * scale} L${x + 10 * size},${180 * scale} L${x - 10 * size},${180 * scale} Z`,
    );
    group.appendChild(dress);

    // 女孩的手臂
    const armLeft = document.createElementNS(svgNS, "line");
    armLeft.setAttribute("class", "kid-body");
    armLeft.setAttribute("x1", x);
    armLeft.setAttribute("y1", 130 * scale);
    armLeft.setAttribute("x2", x - 20 * size);
    armLeft.setAttribute("y2", 150 * scale);
    group.appendChild(armLeft);

    const armRight = document.createElementNS(svgNS, "line");
    armRight.setAttribute("class", "kid-body");
    armRight.setAttribute("x1", x);
    armRight.setAttribute("y1", 130 * scale);
    armRight.setAttribute("x2", x + 20 * size);
    armRight.setAttribute("y2", 150 * scale);
    group.appendChild(armRight);

    // 女孩的辫子
    const braid = document.createElementNS(svgNS, "path");
    braid.setAttribute("class", "girl-hair");
    braid.setAttribute(
      "d",
      `M${x + 20 * size},${100 * scale} L${x + 30 * size},${90 * scale} L${x + 40 * size},${100 * scale} L${x + 50 * size},${90 * scale} L${x + 60 * size},${100 * scale}`,
    );
    braid.setAttribute("stroke-width", 2 * size);
    braid.setAttribute("fill", "none");
    group.appendChild(braid);
  }
}
