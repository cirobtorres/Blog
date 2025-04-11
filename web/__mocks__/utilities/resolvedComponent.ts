async function resolvedComponent(Component: {
  (): Promise<React.JSX.Element>;
}) {
  const ComponentResolved = await Component();
  return () => ComponentResolved;
}

async function resolvedComponentWithProps<T extends object>(
  Component: (props: T) => React.JSX.Element | Promise<React.JSX.Element>,
  props: T
) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

export { resolvedComponent, resolvedComponentWithProps };
