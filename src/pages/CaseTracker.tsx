import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  User,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Case {
  id: string;
  title: string;
  type: 'employment' | 'contract' | 'nda' | 'lease';
  status: 'active' | 'pending' | 'completed' | 'needs-attention';
  priority: 'high' | 'medium' | 'low';
  lastActivity: string;
  documents: number;
  aiInteractions: number;
  assignedTo?: string;
  dueDate?: string;
}

const CaseTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const cases: Case[] = [
    {
      id: '1',
      title: 'TechCorp Employment Agreement',
      type: 'employment',
      status: 'active',
      priority: 'high',
      lastActivity: '2 hours ago',
      documents: 3,
      aiInteractions: 15,
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Consulting Services Contract',
      type: 'contract',
      status: 'pending',
      priority: 'medium',
      lastActivity: '1 day ago',
      documents: 2,
      aiInteractions: 8,
      dueDate: '2024-01-20'
    },
    {
      id: '3',
      title: 'Non-Disclosure Agreement - StartupXYZ',
      type: 'nda',
      status: 'completed',
      priority: 'low',
      lastActivity: '3 days ago',
      documents: 1,
      aiInteractions: 5,
      assignedTo: 'Mike Chen'
    },
    {
      id: '4',
      title: 'Office Lease Agreement',
      type: 'lease',
      status: 'needs-attention',
      priority: 'high',
      lastActivity: '5 hours ago',
      documents: 4,
      aiInteractions: 22,
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-01-12'
    },
    {
      id: '5',
      title: 'Freelance Agreement - DesignCo',
      type: 'contract',
      status: 'active',
      priority: 'medium',
      lastActivity: '6 hours ago',
      documents: 2,
      aiInteractions: 12,
      dueDate: '2024-01-25'
    }
  ];

  const getStatusIcon = (status: Case['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'active':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'needs-attention':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Case['status']) => {
    const variants: Record<string, any> = {
      completed: 'default',
      active: 'secondary',
      pending: 'outline',
      'needs-attention': 'destructive'
    };
    
    return (
      <Badge variant={variants[status]}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getPriorityColor = (priority: Case['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-destructive';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-muted';
      default:
        return 'border-l-muted';
    }
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || caseItem.status === filterStatus;
    const matchesType = filterType === 'all' || caseItem.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Case Tracker</h1>
            <p className="text-muted-foreground text-lg">
              Manage all your legal documents and AI interactions in one place
            </p>
          </div>
          <Button className="bg-gradient-hero hover:shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Cases</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-primary">2</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Need Attention</p>
                  <p className="text-2xl font-bold text-destructive">1</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="needs-attention">Needs Attention</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="employment">Employment</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="nda">NDA</SelectItem>
                  <SelectItem value="lease">Lease</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Cases List */}
        <div className="space-y-4">
          {filteredCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`hover-lift border-l-4 ${getPriorityColor(caseItem.priority)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <Link to={`/document/${caseItem.id}`} className="group">
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors truncate">
                              {caseItem.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(caseItem.status)}
                            {getStatusBadge(caseItem.status)}
                            <Badge variant="outline" className="capitalize">
                              {caseItem.type}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`capitalize ${
                                caseItem.priority === 'high' ? 'border-destructive text-destructive' :
                                caseItem.priority === 'medium' ? 'border-warning text-warning' :
                                'border-muted text-muted-foreground'
                              }`}
                            >
                              {caseItem.priority} priority
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Case</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete Case
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Last: {caseItem.lastActivity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>{caseItem.documents} documents</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{caseItem.aiInteractions} AI interactions</span>
                        </div>
                        {caseItem.dueDate && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Due: {caseItem.dueDate}</span>
                          </div>
                        )}
                      </div>

                      {caseItem.assignedTo && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Assigned to {caseItem.assignedTo}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No cases found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline">Clear Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default CaseTracker;