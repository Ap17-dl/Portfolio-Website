'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  z: number; // Depth factor: 0.1 (far) to 1.0 (near)
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
  speed: number;
}

export function NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 300,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Trigger size calculation on next tick to ensure parent is mounted and sized
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Configuration
    const nodeCount = 32;
    const connectDistance = Math.min(canvas.width, canvas.height) * 0.35 || 140;
    const mouseConnectDistance = Math.min(canvas.width, canvas.height) * 0.4 || 160;
    
    // Theme Colors
    const primaryAccent = '#00FF9C';
    const secondaryAccent = '#00C37A';
    
    // State lists
    const nodes: Node[] = [];
    const packets: Packet[] = [];
    const maxPackets = 6;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const z = 0.2 + Math.random() * 0.8; // Simulated depth
      
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        z,
        radius: 1.5 + z * 2.5, // Closer nodes are larger
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    // Mouse coordinates tracking
    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Get connected neighbors for a node
    const getNeighbors = (nodeIdx: number): number[] => {
      const neighbors: number[] = [];
      const node = nodes[nodeIdx];
      for (let j = 0; j < nodes.length; j++) {
        if (nodeIdx === j) continue;
        const dx = node.x - nodes[j].x;
        const dy = node.y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectDistance) {
          neighbors.push(j);
        }
      }
      return neighbors;
    };

    // Initialize packets
    for (let i = 0; i < maxPackets; i++) {
      const from = Math.floor(Math.random() * nodeCount);
      const neighbors = getNeighbors(from);
      if (neighbors.length > 0) {
        const to = neighbors[Math.floor(Math.random() * neighbors.length)];
        packets.push({
          fromIndex: from,
          toIndex: to,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.01,
        });
      }
    }

    let animationFrameId: number;
    let time = 0;

    // Main render loop
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update nodes (movement, idle breathing, mouse pull)
      nodes.forEach((node) => {
        // Idle motion: Drift
        node.baseX += node.vx;
        node.baseY += node.vy;

        // Bounce off canvas boundaries
        const margin = 20;
        if (node.baseX < margin || node.baseX > canvas.width - margin) {
          node.vx *= -1;
          node.baseX = Math.max(margin, Math.min(canvas.width - margin, node.baseX));
        }
        if (node.baseY < margin || node.baseY > canvas.height - margin) {
          node.vy *= -1;
          node.baseY = Math.max(margin, Math.min(canvas.height - margin, node.baseY));
        }

        // Apply slow breathing cycle (organic expansion/contraction)
        const breatheX = Math.sin(time + node.pulsePhase) * 6 * (1.2 - node.z);
        const breatheY = Math.cos(time * 0.8 + node.pulsePhase) * 6 * (1.2 - node.z);
        
        node.x = node.baseX + breatheX;
        node.y = node.baseY + breatheY;

        // Mouse influence: Pull towards cursor depending on depth (closer nodes pull more)
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseConnectDistance) {
            const pullStrength = 0.05 * node.z * (1 - dist / mouseConnectDistance);
            node.x += dx * pullStrength;
            node.y += dy * pullStrength;
          }
        }
      });

      // 2. Draw Connections (Edges)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            // Edge alpha is based on distance and average depth of connected nodes
            const distFactor = 1 - dist / connectDistance;
            const depthFactor = (nodeA.z + nodeB.z) / 2;
            const alpha = distFactor * 0.14 * depthFactor;

            ctx.strokeStyle = `rgba(0, 255, 156, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw Mouse Hover Connections
      if (mouse.active) {
        nodes.forEach((node) => {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectDistance) {
            const alpha = (1 - dist / mouseConnectDistance) * 0.18 * node.z;
            ctx.strokeStyle = `rgba(0, 255, 156, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        });
      }

      // 4. Update and Draw Data Packets
      packets.forEach((packet) => {
        packet.progress += packet.speed;

        // If packet reached target, select a new random connected neighbor
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.fromIndex = packet.toIndex;
          
          const neighbors = getNeighbors(packet.fromIndex);
          if (neighbors.length > 0) {
            packet.toIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
            packet.speed = 0.005 + Math.random() * 0.01;
          } else {
            // Find any random node if disconnected
            packet.toIndex = Math.floor(Math.random() * nodeCount);
          }
        }

        const nodeFrom = nodes[packet.fromIndex];
        const nodeTo = nodes[packet.toIndex];

        // Linear interpolation for current packet coordinate
        const px = nodeFrom.x + (nodeTo.x - nodeFrom.x) * packet.progress;
        const py = nodeFrom.y + (nodeTo.y - nodeFrom.y) * packet.progress;
        const pz = nodeFrom.z + (nodeTo.z - nodeFrom.z) * packet.progress;

        // Draw glowing packet
        const radius = 1.2 + pz * 1.8;
        ctx.fillStyle = primaryAccent;
        
        // Draw tiny outer glow ring
        ctx.beginPath();
        ctx.arc(px, py, radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 156, ${0.15 * pz})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = primaryAccent;
        ctx.fill();
      });

      // 5. Draw Nodes (Nodes fade/pulse organically)
      nodes.forEach((node) => {
        const pulse = 0.8 + Math.sin(time * 3 + node.pulsePhase) * 0.2;
        const currentRadius = node.radius * pulse;

        // Draw soft bloom/glow (radial gradient helper)
        const bloomRadius = currentRadius * 4;
        const bloom = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, bloomRadius
        );
        bloom.addColorStop(0, `rgba(0, 255, 156, ${0.25 * node.z})`);
        bloom.addColorStop(0.5, `rgba(0, 255, 156, ${0.05 * node.z})`);
        bloom.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = bloom;
        ctx.beginPath();
        ctx.arc(node.x, node.y, bloomRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw solid node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.z > 0.65 ? primaryAccent : secondaryAccent;
        ctx.fill();

        // Draw node outline border for neat vector look
        ctx.strokeStyle = `rgba(5, 5, 5, 0.75)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[200px] md:min-h-[250px] relative overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background radial soft light for depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 255, 156, 0.08) 0%, transparent 70%)`
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
      />
    </div>
  );
}
