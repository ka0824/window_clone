export type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type IconType = {
  [key: string]: React.ReactNode;
};

export type IconProps = {
  id: string;
  title: string;
  type: string;
  handleContextMenuClose: Function;
};

export type IconState = {
  selectedIcon: string[];
  displayedIcon: { id: string; title: string; type: string }[];
  renamedIcon: string;
  loading: Boolean;
};

export type ProgramState = {
  nextZIndex: number;
  currentProgram: string;
  executed: {
    id: string;
    title: string;
    type: string;
    zIndex: number;
    pos: { x: number; y: number } | null;
    isMinimize: boolean;
  }[];
};

export type DisplayedIcon = IconState["displayedIcon"];

export type UserIcon = {
  name: string;
  content: DisplayedIcon;
};

export type ProgramProps = ProgramState["executed"][number];

export type RootState = {
  icon: IconState;
  program: ProgramState;
};
