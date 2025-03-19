//import { StylesList } from "@/app/styles/_components/StylesList";
import { getStyles } from "@/app/styles/queries";
import { StylesTable } from "./_components/StylesTable";
export const metadata = {
  title: "LNK: Styles",
};

export default async function StylesListPage() {
  const styles = await getStyles();
  return <StylesTable src={styles} />;
}
