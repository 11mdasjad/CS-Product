import { ContentEditor } from "./editor";
export const metadata = {
  title: "Content Editor",
  robots: { index: false, follow: false },
};
export default function Admin() {
  return <ContentEditor />;
}
