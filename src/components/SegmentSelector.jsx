import React from 'react';
import { Layers } from 'lucide-react';

export const SEGMENTS = [
  { id: 'acadêmico', label: 'Acadêmico (Inovação)', desc: 'acadêmico' },
  { id: 'prime', label: 'Bradesco Prime', desc: 'prime' },
  { id: 'universitário', label: 'Bradesco Universitário', desc: 'universitário' },
  { id: 'empresas', label: 'Empresas e Negócios', desc: 'empresas e negócios' },
  { id: 'saúde', label: 'Bradesco Saúde', desc: 'saúde' },
];

export function SegmentSelector({ activeSegment, onSelectSegment }) {
  return (
    <div className="segment-selector-wrapper">
      <label htmlFor="segment-select" className="segment-selector-label">
        <Layers size={14} className="segment-icon" />
        <span>Segmento:</span>
      </label>
      <select
        id="segment-select"
        value={activeSegment}
        onChange={(e) => onSelectSegment(e.target.value)}
        className="segment-select-dropdown"
        title="Selecione o segmento para visualizar o descritivo no logotipo"
      >
        {SEGMENTS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SegmentSelector;
