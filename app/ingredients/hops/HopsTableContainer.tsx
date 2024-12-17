import { HopsTable } from "./_components/HopsTable";
import { getHops } from "./queries";

export async function HopsTableContainer() {
  const hops = await getHops();
  return <HopsTable hops={hops} />;
}
export default HopsTableContainer;
