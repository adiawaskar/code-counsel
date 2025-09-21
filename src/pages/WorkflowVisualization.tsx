import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'react-flow-renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, AlertTriangle, CheckCircle, Clock, MessageSquare } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 5 },
    data: { 
      label: 'Contract Signing',
      status: 'completed',
      description: 'Employment agreement signed by both parties'
    },
    style: { background: '#10b981', color: 'white', border: '2px solid #065f46' }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Probation Period',
      status: 'in-progress',
      description: '90-day probationary period - currently day 45'
    },
    style: { background: '#f59e0b', color: 'white', border: '2px solid #d97706' }
  },
  {
    id: '3',
    type: 'default',
    position: { x: 400, y: 100 },
    data: { 
      label: 'Benefits Enrollment',
      status: 'pending',
      description: 'Health insurance and 401k enrollment due'
    },
    style: { background: '#6b7280', color: 'white', border: '2px solid #4b5563' }
  },
  {
    id: '4',
    type: 'default',
    position: { x: 250, y: 200 },
    data: { 
      label: 'Performance Review',
      status: 'upcoming',
      description: 'Scheduled for end of probation period'
    },
    style: { background: '#3b82f6', color: 'white', border: '2px solid #1d4ed8' }
  },
  {
    id: '5',
    type: 'default',
    position: { x: 100, y: 300 },
    data: { 
      label: 'Non-compete Activation',
      status: 'risk',
      description: 'Non-compete clause becomes active upon termination'
    },
    style: { background: '#ef4444', color: 'white', border: '2px solid #dc2626' }
  },
  {
    id: '6',
    type: 'default',
    position: { x: 400, y: 300 },
    data: { 
      label: 'Stock Options Vesting',
      status: 'future',
      description: 'First vesting milestone at 1-year mark'
    },
    style: { background: '#8b5cf6', color: 'white', border: '2px solid #7c3aed' }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
  { id: 'e2-4', source: '2', target: '4', type: 'smoothstep' },
  { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },
  { id: 'e4-5', source: '4', target: '5', type: 'smoothstep' },
  { id: 'e4-6', source: '4', target: '6', type: 'smoothstep' },
];

const WorkflowVisualization = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showAIChat, setShowAIChat] = useState(false);

  const onConnect = useCallback((params: Connection) => 
    setEdges((eds) => addEdge(params, eds)), [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'risk':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      completed: 'default',
      'in-progress': 'secondary',
      pending: 'outline',
      upcoming: 'secondary',
      risk: 'destructive',
      future: 'outline'
    };
    
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Contract Workflow</h1>
          <p className="text-muted-foreground text-lg">
            Interactive visualization of your employment contract obligations and milestones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Workflow Visualization */}
          <div className="lg:col-span-3">
            <Card className="card-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Contract Timeline
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAIChat(true)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask AI
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] border rounded-lg overflow-hidden">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    fitView
                    style={{ background: 'hsl(var(--muted))' }}
                  >
                    <Background color="hsl(var(--border))" gap={16} />
                    <Controls />
                    <MiniMap 
                      nodeColor={(node) => node.style?.background as string || '#6b7280'}
                      nodeStrokeWidth={2}
                      className="!bg-card !border"
                    />
                  </ReactFlow>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Status Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-success rounded" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-warning rounded" />
                    <span className="text-sm">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-muted-foreground rounded" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded" />
                    <span className="text-sm">Upcoming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-destructive rounded" />
                    <span className="text-sm">Risk/Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded" />
                    <span className="text-sm">Future Milestone</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Milestones</span>
                    <Badge variant="outline">6</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed</span>
                    <Badge className="bg-success text-success-foreground">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Progress</span>
                    <Badge className="bg-warning text-warning-foreground">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risks</span>
                    <Badge variant="destructive">1</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Focus */}
            <Card>
              <CardHeader>
                <CardTitle>Current Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Probation Period</p>
                      <p className="text-xs text-muted-foreground">45 days remaining</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Benefits Enrollment</p>
                      <p className="text-xs text-muted-foreground">Action required</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Performance Review</p>
                    <p className="text-muted-foreground">In 45 days</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Benefits Enrollment</p>
                    <p className="text-muted-foreground">In 14 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Node Details Dialog */}
        <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedNode && getStatusIcon(selectedNode.data.status)}
                {selectedNode?.data.label}
              </DialogTitle>
            </DialogHeader>
            {selectedNode && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(selectedNode.data.status)}
                </div>
                <div>
                  <span className="text-sm font-medium">Description:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedNode.data.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" onClick={() => setShowAIChat(true)}>
                    Ask AI About This
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* AI Chat Dialog */}
        <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Workflow Assistant
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Ask me anything about your contract workflow, deadlines, or obligations.
              </p>
              <Button className="w-full">
                Start Conversation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default WorkflowVisualization;