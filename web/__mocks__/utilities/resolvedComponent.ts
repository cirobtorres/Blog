/* eslint-disable @typescript-eslint/no-explicit-any */
async function resolvedComponent(Component: {
  (): Promise<React.JSX.Element>;
}) {
  const ComponentResolved = await Component();
  return () => ComponentResolved;
}

async function resolvedComponentWithProps(
  Component: ({ props }: { [key: string]: any }) => React.JSX.Element,
  props: { [key: string]: any }
) {
  const ComponentResolved = Component({ ...props });
  return () => ComponentResolved;
}

export default resolvedComponent;
export { resolvedComponentWithProps };
