'use client';

import { Button } from '@orchestrator/ui';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  BackgroundVariant,
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';

import '@xyflow/react/dist/base.css';
import { Fullscreen, Minus, Plus } from 'lucide-react';
import { useCallback, useRef } from 'react';

const nodeTypes = {};

const edgeTypes = {};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export function CanvasInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const onFitView = useCallback(() => {
    fitView({ padding: 0.2 });
  }, [fitView]);

  return (
    <main className="flex-1 flex items-stretch">
      <div className="w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          minZoom={0.5}
          maxZoom={1}
          defaultEdgeOptions={{
            type: 'custom',
            className: 'opacity-25',
          }}
          style={
            {
              '--xy-background-pattern-dots-color-default':
                'var(--color-border)',
              '--xy-edge-stroke-width-default': 1.5,
              '--xy-edge-stroke-default': 'var(--color-foreground)',
              '--xy-edge-stroke-selected-default': 'var(--color-foreground)',
              '--xy-attribution-background-color-default': 'transparent',
            } as React.CSSProperties
          }
          attributionPosition="bottom-left"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={2} />
          <Panel
            position="bottom-right"
            className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse"
          >
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={() => zoomIn()}
              aria-label="Zoom in"
            >
              <Plus className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={() => zoomOut()}
              aria-label="Zoom out"
            >
              <Minus className="size-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground/80 hover:text-muted-foreground rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg size-10 focus-visible:z-10 bg-card"
              onClick={onFitView}
              aria-label="Fit view"
            >
              <Fullscreen className="size-5" aria-hidden="true" />
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </main>
  );
}

export function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}
