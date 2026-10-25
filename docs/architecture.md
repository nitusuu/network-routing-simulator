# Architecture Overview

The simulator is organized around a small domain model that represents routers and links, plus a set of routing algorithms and a simulation layer.

## Components

- `models/`: domain objects such as routers and network graphs
- `algorithms/`: pathfinding and route-selection logic
- `simulation/`: orchestration of routes and packet movement
- `utils/`: helper methods for converting model data into graph representations

## Extension points

1. Add additional routing strategies in `algorithms/`.
2. Build richer simulation events in `simulation/`.
3. Add new topology loaders or JSON import utilities in `utils/`.
