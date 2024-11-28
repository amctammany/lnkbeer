import { StyleDisplay } from "@/app/styles/_components/StyleDisplay";
import { getStyle } from "../queries";
interface StyleDisplayPageProps {
  params: Promise<{
    identifier: string;
  }>;
}
export async function generateMetadata({ params }: StyleDisplayPageProps) {
  const { identifier } = await params;
  return {
    title: `LNK Style: ${identifier}`,
  };
}

export default async function StyleDisplayPage({
  params,
}: StyleDisplayPageProps) {
  const { identifier } = await params;
  const style = await getStyle(identifier);
  console.log(identifier, style);
  return <StyleDisplay style={style} />;
}
