import Header from "../Header";

export default function HeaderExample() {
  return <Header onNavigate={(section) => console.log("Navigate to:", section)} />;
}
