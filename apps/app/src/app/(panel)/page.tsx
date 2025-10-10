import { Canvas } from '@orchestrator/flow-editor';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orchestrator',
  description: '',
};

export default function Index() {
  return (
    <>
      <h2 className="text-2xl font-bold">test</h2>
      <Canvas />
    </>
  );
}
