import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wellcome-confetti',
  imports: [],
  templateUrl: './wellcome-confetti.component.html',
  styleUrl: './wellcome-confetti.component.scss'
})
export class WellcomeConfettiComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: any[] = [];

  ngAfterViewInit() {
   setTimeout(() => {
    this.startConfetti();
   }, 10);
  }

  startConfetti() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ساخت ذرات
    for (let i = 0; i < 150; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 150 + 50,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 10
      });
    }

    this.draw();
  }

  draw() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r, p.r);
    });

    this.update();

    requestAnimationFrame(() => this.draw());
  }

  update() {
    const canvas = this.canvasRef.nativeElement;
    this.particles.forEach(p => {
      p.y += Math.cos(p.d) + 1 + p.r / 2;
      p.x += Math.sin(p.d);
      p.d += 0.01;

      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
  }
}
