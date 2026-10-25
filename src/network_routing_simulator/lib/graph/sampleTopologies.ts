import type { NetworkTopology } from "@/types/network";

type TopologyKind = "sample" | "star" | "ring" | "mesh" | "partition";

type RouterInput = string | { id: string; label?: string };
type LinkInput = { id?: string; source?: string; target?: string; cost?: number; active?: boolean } | [string, string, number?];

function createRouterSet(count: number, prefix = "R") {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}${index + 1}`,
    label: `Router ${index + 1}`
  }));
}

function normalizeRouter(router: RouterInput, fallbackIndex: number) {
  if (typeof router === "string") {
    return { id: router, label: `Router ${router.replace(/\D+/g, "") || fallbackIndex}` };
  }

  return {
    id: router.id,
    label: router.label ?? `Router ${router.id.replace(/\D+/g, "") || fallbackIndex}`
  };
}

function normalizeLink(rawLink: LinkInput, fallbackIndex: number): NetworkTopology["links"][number] {
  if (Array.isArray(rawLink)) {
    const [source, target, cost = 1] = rawLink;
    return {
      id: `L${fallbackIndex}`,
      source,
      target,
      cost: Number(cost) || 1,
      active: true
    };
  }

  return {
    id: rawLink.id ?? `L${fallbackIndex}`,
    source: rawLink.source ?? "",
    target: rawLink.target ?? "",
    cost: Number(rawLink.cost ?? 1),
    active: rawLink.active ?? true
  };
}

export function normalizeTopology(data: unknown): NetworkTopology {
  if (!data || typeof data !== "object") {
    throw new Error("Topology JSON must be an object.");
  }

  const payload = data as Record<string, unknown>;
  const routersInput = Array.isArray(payload.routers) ? payload.routers : [];
  const linksInput = Array.isArray(payload.links) ? payload.links : [];

  const routers = routersInput.map((router, index) => normalizeRouter(router as RouterInput, index + 1));
  const links = linksInput.map((link, index) => normalizeLink(link as LinkInput, index + 1));

  if (!routers.length && links.length) {
    throw new Error("Topology JSON is missing the router list.");
  }

  const uniqueRouters = routers.filter((router, index, list) => list.findIndex((item) => item.id === router.id) === index);
  const uniqueLinks = links
    .filter((link) => !!link.source && !!link.target)
    .filter((link, index, list) => list.findIndex((item) => item.source === link.source && item.target === link.target) === index);

  return {
    routers: uniqueRouters,
    links: uniqueLinks.map((link) => ({ ...link, cost: Number.isFinite(link.cost) ? Math.max(0, link.cost) : 1 }))
  };
}

export function loadTopologyFromJson(jsonText: string): NetworkTopology {
  const parsed = JSON.parse(jsonText) as unknown;
  return normalizeTopology(parsed);
}

function createTopologyFromLinks(
  routers: NetworkTopology["routers"],
  prescribedLinks: Array<[number, number, number]>
): NetworkTopology {
  const links: NetworkTopology["links"] = [];

  prescribedLinks.forEach(([source, target, cost], index) => {
    const sourceId = routers[source - 1]?.id;
    const targetId = routers[target - 1]?.id;
    if (!sourceId || !targetId) return;

    links.push({
      id: `L${index + 1}`,
      source: sourceId,
      target: targetId,
      cost,
      active: true
    });
  });

  return { routers, links };
}

export const sampleTopology: NetworkTopology = createTopologyFromLinks(
  createRouterSet(5),
  [
    [1, 2, 2],
    [1, 3, 5],
    [2, 3, 1],
    [2, 4, 4],
    [3, 4, 2],
    [3, 5, 6],
    [4, 5, 1]
  ]
);

export function makeTopology(kind: TopologyKind = "sample"): NetworkTopology {
  if (kind === "sample") return structuredClone(sampleTopology);

  const count = 5;
  const routers = createRouterSet(count);

  if (kind === "star") {
    return createTopologyFromLinks(
      routers,
      Array.from({ length: count - 1 }, (_, index) => [1, index + 2, index + 2])
    );
  }

  if (kind === "ring") {
    return createTopologyFromLinks(
      routers,
      Array.from({ length: count }, (_, index) => [index + 1, index === count - 1 ? 1 : index + 2, (index % 3) + 1])
    );
  }

  if (kind === "mesh") {
    const links: Array<[number, number, number]> = [];
    for (let i = 1; i <= count; i += 1) {
      for (let j = i + 1; j <= count; j += 1) {
        links.push([i, j, ((i + j) % 4) + 1]);
      }
    }
    return createTopologyFromLinks(routers, links);
  }

  return createTopologyFromLinks(routers, [
    [1, 2, 2],
    [2, 3, 1],
    [4, 5, 1]
  ]);
}