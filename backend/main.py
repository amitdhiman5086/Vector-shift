from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware to support API requests from the frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_directed_acyclic_graph(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    # Build adjacency list
    adj = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge['source']
        target = edge['target']
        # Guard against edges referencing deleted/non-existent nodes
        if source in adj and target in adj:
            adj[source].append(target)
            
    # DFS cycle detection
    # State tracking: 0 = unvisited, 1 = visiting, 2 = visited
    state = {node['id']: 0 for node in nodes}
    
    def has_cycle(u: str) -> bool:
        state[u] = 1  # visiting
        for v in adj[u]:
            if state[v] == 1:
                return True  # cycle found
            if state[v] == 0:
                if has_cycle(v):
                    return True
        state[u] = 2  # visited
        return False

    for node in nodes:
        node_id = node['id']
        if state[node_id] == 0:
            if has_cycle(node_id):
                return False  # not a DAG (contains a cycle)
                
    return True  # successfully traversed without cycles

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    is_dag = is_directed_acyclic_graph(data.nodes, data.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
