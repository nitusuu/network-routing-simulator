# Network Routing Simulator

A Python-based project for simulating and analyzing packet routing across network topologies.

## Project structure

- `src/network_routing_simulator/` — main package
- `src/network_routing_simulator/models/` — core network and router entities
- `src/network_routing_simulator/algorithms/` — pathfinding and route selection logic
- `src/network_routing_simulator/simulation/` — simulator event loop and execution logic
- `src/network_routing_simulator/utils/` — helper utilities and graph helpers
- `tests/` — automated tests
- `docs/` — design and architecture notes
- `examples/` — sample network definitions and demo configs
- `data/sample_networks/` — sample topology data

## Quick start

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -e .
python -m network_routing_simulator
```

If you prefer not to install the package, you can also run:

```bash
set PYTHONPATH=%cd%\src
python -m network_routing_simulator
```

## Planned functionality

- Build network graphs from custom topology files
- Simulate packet flow and congestion over links
- Compare routing strategies such as shortest path and adaptive routing
- Visualize route propagation and link utilization
