export function Debug({ children }: { children: unknown }) {
  return <pre className="text-xs">{JSON.stringify(children, null, 2)}</pre>;
}
