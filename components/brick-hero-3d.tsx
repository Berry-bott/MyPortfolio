'use client'

import { useState } from 'react'

const BRICK_CONFIG = {
  rows: 4,
  cols: 5,
  totalBricks: 20,
}

interface Brick {
  id: number
  row: number
  col: number
  delay: number
}

export function BrickHero3D() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const bricks: Brick[] = Array.from({ length: BRICK_CONFIG.totalBricks }, (_, i) => ({
    id: i,
    row: Math.floor(i / BRICK_CONFIG.cols),
    col: i % BRICK_CONFIG.cols,
    delay: i * 0.05,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Animated background with perspective */}
      <div 
        className="absolute inset-0 perspective"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Brick grid container */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="relative"
            style={{
              width: '600px',
              height: '400px',
              transformStyle: 'preserve-3d',
              animation: 'float 20s ease-in-out infinite',
            }}
          >
            {bricks.map((brick) => {
              const isHovered = hoveredId === brick.id
              
              return (
                <div
                  key={brick.id}
                  onMouseEnter={() => setHoveredId(brick.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="absolute transition-all duration-300 cursor-pointer group"
                  style={{
                    left: `${(brick.col * 120) + 10}px`,
                    top: `${(brick.row * 95) + 10}px`,
                    width: '100px',
                    height: '80px',
                    transformStyle: 'preserve-3d',
                    animation: `brickDrop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${brick.delay}s forwards`,
                  }}
                >
                  {/* Brick element */}
                  <div
                    className="absolute inset-0 rounded-md shadow-lg transition-all duration-300"
                    style={{
                      background: isHovered 
                        ? 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)'
                        : 'linear-gradient(135deg, #1e3a5f 0%, #0f2847 100%)',
                      transform: isHovered 
                        ? 'translateZ(20px) rotateX(-10deg) rotateY(-10deg) scale(1.05)'
                        : 'translateZ(0) rotateX(0) rotateY(0) scale(1)',
                      boxShadow: isHovered
                        ? '0 20px 40px rgba(0, 212, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                        : '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.05)',
                      border: isHovered 
                        ? '1px solid rgba(0, 212, 255, 0.8)'
                        : '1px solid rgba(0, 212, 255, 0.2)',
                    }}
                  >
                    {/* Brick inner highlight */}
                    <div 
                      className="absolute inset-0 rounded-md opacity-50"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                        transform: 'translateZ(1px)',
                      }}
                    />

                    {/* Brick texture pattern */}
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,212,255,0.1) 10px, rgba(0,212,255,0.1) 11px),
                          repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,212,255,0.1) 8px, rgba(0,212,255,0.1) 9px)
                        `,
                      }}
                    />
                  </div>

                  {/* Brick shadow/depth */}
                  <div
                    className="absolute inset-0 rounded-md blur-xl opacity-50 -z-10"
                    style={{
                      background: isHovered 
                        ? 'rgba(0, 212, 255, 0.3)'
                        : 'rgba(0, 0, 0, 0.3)',
                      transform: isHovered 
                        ? 'translateZ(-5px) translateY(5px) scaleX(1.1) scaleY(1.05)'
                        : 'translateZ(-5px) translateY(5px)',
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes brickDrop {
          0% {
            opacity: 0;
            transform: translateY(-100px) rotateX(90deg) rotateY(-20deg) rotateZ(45deg) scale(0.3);
          }
          60% {
            opacity: 1;
            transform: translateY(0) rotateX(0) rotateY(0) rotateZ(0) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0) rotateY(0) rotateZ(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateZ(0deg);
          }
          25% {
            transform: translateY(-20px) rotateZ(1deg);
          }
          50% {
            transform: translateY(0px) rotateZ(0deg);
          }
          75% {
            transform: translateY(-10px) rotateZ(-1deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
      `}</style>
    </div>
  )
}
