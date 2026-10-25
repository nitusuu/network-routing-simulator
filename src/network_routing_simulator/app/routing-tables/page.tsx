import RoutingTable from "@/components/routing-tables/RoutingTable";
import EventLog from "@/components/events/EventLog";
export default function RoutingTablesPage() {
  return <div className="stack"><div className="page-intro"><h2>Routing information</h2><p>Inspect destinations, next hops, route costs, and reachability for each router.</p></div><RoutingTable/><EventLog/></div>;
}