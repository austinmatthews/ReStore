import { AppBar, Switch, Toolbar, Typography } from '@mui/material';

interface Props {
  darkMode: boolean;
  onSwitch: () => void;
}

export default function Header({ darkMode, onSwitch }: Props) {
  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6">ReStore</Typography>
          <Switch checked={darkMode} onChange={onSwitch} />
        </Toolbar>
      </AppBar>
    </>
  );
}
