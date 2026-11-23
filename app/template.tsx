// Templates remount on navigation, so this wrapper gives every route a short,
// self-contained entrance without touching links, history, or scroll behavior.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-transition">{children}</div>;
}
