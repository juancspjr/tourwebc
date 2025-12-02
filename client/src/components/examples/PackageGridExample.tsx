import PackageGrid from "../PackageGrid";

export default function PackageGridExample() {
  return (
    <PackageGrid
      onViewDetails={(pkg) => console.log("View details:", pkg.title)}
      onBook={(pkg) => console.log("Book:", pkg.title)}
    />
  );
}
