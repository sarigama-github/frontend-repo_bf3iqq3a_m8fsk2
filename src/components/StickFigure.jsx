import React from 'react'

// Simple stick figure SVG for male/female and child/adult
export default function StickFigure({ gender = 'neutral', size = 40, label }) {
  const stroke = '#0ea5e9'
  const fill = 'none'
  const headR = size * 0.18
  const bodyH = size * 0.5
  const centerX = size / 2
  const headY = headR + 2
  const bodyTop = headY + headR + 2
  const bodyBottom = bodyTop + bodyH

  const isFemale = gender === 'female'
  const isMale = gender === 'male'

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Head */}
        <circle cx={centerX} cy={headY} r={headR} stroke={stroke} strokeWidth="2.5" fill={fill} />
        {/* Body */}
        <line x1={centerX} y1={bodyTop} x2={centerX} y2={bodyBottom} stroke={stroke} strokeWidth="2.5" />
        {/* Arms */}
        <line x1={centerX - headR * 2} y1={bodyTop + headR} x2={centerX + headR * 2} y2={bodyTop + headR} stroke={stroke} strokeWidth="2.5" />
        {/* Legs */}
        <line x1={centerX} y1={bodyBottom} x2={centerX - headR * 1.6} y2={size - 4} stroke={stroke} strokeWidth="2.5" />
        <line x1={centerX} y1={bodyBottom} x2={centerX + headR * 1.6} y2={size - 4} stroke={stroke} strokeWidth="2.5" />
        {/* Gender hint */}
        {isFemale && (
          <path d={`M ${centerX - headR} ${bodyTop + headR*2} Q ${centerX} ${bodyTop + headR*3.2} ${centerX + headR} ${bodyTop + headR*2}`} fill="none" stroke={stroke} strokeWidth="2.5" />
        )}
        {isMale && (
          <circle cx={centerX + headR*1.4} cy={bodyTop + headR*1.2} r={headR*0.35} stroke={stroke} strokeWidth="2" fill={fill} />
        )}
      </svg>
      {label && <div className="mt-1 text-xs text-sky-300">{label}</div>}
    </div>
  )
}
