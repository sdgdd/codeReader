import React, { useEffect, useRef } from 'react';

export default function GenerateAvatar({ width=40  }) { // width 作为 props 传入
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;

    // 将画布裁剪为圆形
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, Math.PI * 2);
    ctx.clip(); // 限制绘制区域为圆形

    // 平移坐标系到画布中心并倒转y轴
    ctx.translate(canvas.width / 2, canvas.height);
    ctx.scale(1, -1);

    // 绘制背景色
    ctx.fillStyle = '#1268df91';
    ctx.fillRect(-radius, 0, canvas.width, canvas.height);

    // 根据传入的 width 来动态调整树的大小
    const treeHeight = width * 0.25; // 树的高度基于画布大小
    drawBranch(ctx, { x: 0, y: 0 }, treeHeight, 90, treeHeight * 0.16, 6, '#333'); // 使用动态比例
  });

  function drawBranch(ctx, startPoint, length, angle, branchWidth, depth, color) {
    if (length < 5 || depth <= 0) {
      // 绘制叶子
      ctx.beginPath();
      ctx.arc(startPoint.x, startPoint.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() < 0.5 ? 'pink' : 'red';
      ctx.fill();
      return;
    }

    const radian = angle * Math.PI / 180;
    const endPoint = {
      x: startPoint.x + length * Math.cos(radian),
      y: startPoint.y + length * Math.sin(radian),
    };

    // 绘制树枝
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = branchWidth;
    ctx.stroke();

    // 递归绘制子树枝
    const newLength = length * (0.6 + Math.random() * 0.2);
    const newBranchWidth = branchWidth * 0.7;
    const colorVariation = "rgba(50, 35, 25, 1)";

    const leftAngle = angle + (30 + Math.random() * 10);
    const rightAngle = angle - (30 + Math.random() * 10);

    drawBranch(ctx, endPoint, newLength, leftAngle, newBranchWidth, depth - 1, colorVariation);
    drawBranch(ctx, endPoint, newLength, rightAngle, newBranchWidth, depth - 1, colorVariation);
  }

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={width} style={{ borderRadius: '50%' }}></canvas> {/* 圆形显示 */}
    </div>
  );
}
