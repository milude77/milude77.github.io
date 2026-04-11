// SnowflakeFallingEffect.ts
// 完整稳定版本：已解决图片未加载导致 drawImage 报错问题
import snow1 from "@/assets/rootPageAssets/images/ParticleSmoke.png";
import snow2 from "@/assets/rootPageAssets/images/ParticleSmoke2.png";
import bgImageUrl from "@/assets/rootPageAssets/images/backgroundImg.jpg";

export async function initSnowBackground(options?: {
  bgImage?: string;
  snowImages?: string[];
  count?: number;
}) {
  const {
    bgImage = bgImageUrl,
    snowImages = [snow1, snow2],
    count = 70,
  } = options || {};

  const container = document.createElement("div");
  if (!container) {
    console.error("Container not found");
    return;
  }

  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100vw";
  container.style.height = "100vh";
  container.style.backgroundImage = `url(${bgImage})`;
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.backgroundRepeat = "no-repeat";
  container.style.zIndex = "-1";
  container.style.opacity = "0.8";
  container.style.pointerEvents = "none";

  document.body.appendChild(container);

  // 创建 canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";

  container.appendChild(canvas);

  function resize() {
    // 修复: container 可能为 null 的问题
    if (!container) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  // ================= 图片加载（关键修复） =================
  function loadImages(srcs: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(
      srcs.map((src) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = src;

          img.onload = () => resolve(img);
          img.onerror = () => reject(`图片加载失败: ${src}`);
        });
      }),
    );
  }

  let imgs: HTMLImageElement[] = [];

  try {
    imgs = await loadImages(snowImages);
  } catch (err) {
    console.error(err);
    return;
  }

  // ================= 雪花类 =================
  class Snowflake {
    x: number = 0;
    y: number = 0;
    size: number = 10;
    speedY: number = 0.5;
    speedX: number = 0;
    img: HTMLImageElement;

    constructor() {
      // 确保 img 至少有一个默认值（虽然 reset 会覆盖）
      this.img = imgs[0];
      this.reset(true);
    }

    reset(init = false) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height : -20;
      this.size = Math.random() * 20 + 10;
      this.speedY = Math.random() * 1 + 0.5;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.img = imgs[Math.floor(Math.random() * imgs.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      if (this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      // 防止 broken image 报错
      if (!this.img || !this.img.complete || this.img.naturalWidth === 0)
        return;

      ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
  }

  const flakes: Snowflake[] = Array.from(
    { length: count },
    () => new Snowflake(),
  );

  // ================= 动画 =================
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flakes.forEach((flake) => {
      flake.update();
      flake.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
