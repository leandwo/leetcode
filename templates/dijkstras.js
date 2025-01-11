class PriorityQueue {
    constructor() {
      this.values = [];
    }
  
    enqueue(val, priority) {
      this.values.push({ val, priority });
      this.sort();
    }
  
    dequeue() {
      return this.values.shift();
    }
  
    sort() {
      this.values.sort((a, b) => a.priority - b.priority);
    }
  }
  
  function dijkstra(graph, start) {
    const distances = {};
    const previous = {};
    const visited = {};
    const pq = new PriorityQueue();
  
    // Initialize distances
    for (let node in graph) {
      distances[node] = Infinity;
      previous[node] = null;
    }
    distances[start] = 0;
  
    pq.enqueue(start, 0);
  
    while (pq.values.length) {
      let { val: current } = pq.dequeue();
      visited[current] = true;
  
      for (let neighbor in graph[current]) {
        if (visited[neighbor]) continue;
  
        let newDistance = distances[current] + graph[current][neighbor];
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = current;
          pq.enqueue(neighbor, newDistance);
        }
      }
    }
  
    return { distances, previous };
  }
  
  // Example usage:
  const graph = {
    A: { B: 4, C: 2 },
    B: { A: 4, D: 2, E: 3 },
    C: { A: 2, F: 4 },
    D: { B: 2, E: 2, F: 3 },
    E: { B: 3, D: 2, F: 1 },
    F: { C: 4, D: 3, E: 1 }
  };
  
  const { distances } = dijkstra(graph, "A");
  console.log(distances); // { A: 0, B: 4, C: 2, D: 6, E: 7, F: 6 }