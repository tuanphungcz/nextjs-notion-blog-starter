import ReactCanvasConfetti from 'react-canvas-confetti';

const style: any = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
};

export default function ConfettiCanvas({ getInstance }) {
  return <ReactCanvasConfetti refConfetti={getInstance} style={style} />;
}
