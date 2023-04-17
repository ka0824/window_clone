export type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
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
};

export type IconState = {
  selectedIcon: string[];
  displayedIcon: { id: string; title: string; type: string }[];
  renamedIcon: string;
};

export type RootState = {
  icon: IconState;
};
