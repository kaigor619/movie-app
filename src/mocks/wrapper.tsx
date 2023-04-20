import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  routerProps?: MemoryRouterProps;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0 },
  },
});

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

export const wrapper: React.FC<Props> = ({
  children,
  routerProps = { initialEntries: ["/"] },
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter {...routerProps}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};
