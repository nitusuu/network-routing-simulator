# RouteLab

RouteLab is a browser-based network routing simulator that demonstrates how routers select optimal paths, maintain routing tables, and respond to network congestion and link failures. It provides an interactive environment for visualizing routing algorithms and understanding network behavior without requiring physical routers or real network traffic.

## Overview

Routing is a fundamental function of computer networks. When multiple paths exist between a source and destination, routers must determine which path is most suitable based on link costs and network availability.

RouteLab models a network as a weighted graph in which routers represent nodes and communication links represent weighted edges. Users can build network topologies, execute routing algorithms, simulate packet movement, introduce link failures, and compare routing outcomes through a visual interface.

The project is designed as an educational tool for understanding routing, shortest-path computation, routing tables, convergence, congestion modeling, and failure recovery.

## Objectives

- Visualize network topologies and connections between routers.
- Implement and compare Dijkstra's shortest-path algorithm and a simplified Distance Vector algorithm.
- Calculate route costs, hop counts, and next-hop information.
- Simulate packet movement along a selected route.
- Model congestion by adjusting link costs.
- Demonstrate route recalculation after link failures and recovery.
- Display routing tables and algorithm convergence information.
- Record simulation events and performance metrics.
- Export simulation results as CSV files.

## Features

### 1. Interactive Network Topology Editor

- Add and remove routers.
- Create connections between routers.
- Adjust link costs.
- Disable and restore network links.
- Drag routers to organize the network visually.
- Load predefined network topologies.

### 2. Routing Algorithm Simulator

- **Dijkstra's Algorithm:** Calculates a minimum-cost path using non-negative link costs.
- **Distance Vector Routing:** Iteratively updates routing information using neighboring routers' previous-round distance tables.
- Displays the selected route, total path cost, hop count, reachability, and calculation time.
- Provides a step-by-step trace of Dijkstra's algorithm.

### 3. Routing Tables

View routing information for individual routers, including:

- Destination router
- Next hop
- Route cost
- Reachability
- Distance Vector convergence status and iteration count

### 4. Congestion Simulation

Increase the cost of selected links to represent congestion. The simulator recalculates routes and demonstrates how a higher-cost connection can cause traffic to use an alternative path.

> **Note:** Congestion is represented by a simulated link-cost adjustment, not by measuring real network traffic.

### 5. Link Failure and Recovery

- Disable a connection to simulate a link failure.
- Recalculate routes using the remaining active links.
- Identify unreachable destinations.
- Restore failed links and compare the resulting routes.

### 6. Packet Journey Simulation

Step through the selected route to visualize packet movement from the source router toward the destination. The simulator tracks states such as ready, in transit, delivered, and unreachable.

This is a software simulation; packets are not transmitted across a real network.

### 7. Predefined Topologies and Scenarios

Available topology presets include:

- Five-router sample network
- Star topology
- Ring topology
- Full-mesh topology
- Partitioned network

The scenario lab includes normal operation, congestion, single-link failure, and network partition scenarios.

### 8. Analytics and Event Logging

- View summary metrics for routers, active links, simulation runs, and route success.
- Review recent simulation events.
- Compare route costs, hop counts, and calculation times.
- Export recorded simulation results as CSV.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Next.js | Web application framework |
| React | Component-based user interface |
| TypeScript | Routing logic and application development |
| React Flow (`@xyflow/react`) | Interactive network topology visualization |
| Tailwind CSS | Interface styling |
| Zustand | Shared application state management |
| Recharts | Analytics and comparison charts |
| Vitest | Automated testing |
| Git and GitHub | Version control and project hosting |

## System Architecture

RouteLab is organized into four logical layers:

1. **Pages Layer:** Provides the dashboard, topology editor, route simulator, routing tables, analytics, and scenario lab.
2. **Components Layer:** Handles network visualization, simulation controls, routing tables, charts, and event logs.
3. **State Management Layer:** Maintains network topology, selected routes, simulation events, and metrics through a shared Zustand store.
4. **Core Logic Layer:** Implements routing algorithms, graph utilities, congestion modeling, failure recovery, packet simulation, metrics, scenarios, and CSV export.

The routing logic runs in the browser.
