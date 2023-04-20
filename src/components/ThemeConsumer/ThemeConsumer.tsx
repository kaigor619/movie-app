import { observer } from "mobx-react-lite";
import { themeStore, Theme } from "stores";

interface Props {
  children: (theme: Theme) => React.ReactNode | React.ReactNode[];
}

export const ThemeConsumer: React.FC<Props> = observer(({ children }) => {
  return <>{children(themeStore.theme)}</>;
});
