import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch } from "../../../app/store";
import { clearCredentials, selectIsAuth } from "../../../store/authSlice";
import { Menu } from "@mui/icons-material";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(selectIsAuth);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const menuItems = isAuth
    ? [
        { text: "Write a post", link: "/create_post" },
        { text: "Log out", action: handleLogout },
      ]
    : [
        { text: "Sign in", link: "/login" },
        { text: "Sign up", link: "/register" },
      ];

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
          <Link to="/">
            <Stack>
              <Box
                component="img"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADuklEQVR4nO2Yz08TQRTH508wSqLRBJHuFGhPYiIePHCQ3+1MQ+IV8YgXEjxqhJvx4AFNjP8AzKYXA9zkKAai5dcyWzSRiF4UrkaZpazPzC6lpV1od7ut3YRvsrd2+j59333vzUPoTAETLHZ1iKQSQUEVrPW/FKoyjoIqU4ttG6qyiYIo0ONR0CkYKoZA2gh0OnEEEEQbgU71LEDgbASH9skBBMxGcGifYwBBsBFwEgFOxkEnO4UAhop3JISXTECqp10w3FadoLXBZtDJKOh0IRt0/pMHkHsY1g2GJ8qFAa3/mWD4kX9BL/a3Haz1PgEtvuYUdEkAlzCgxdOC4WXfAIzpUFT+qPXjJQIsBQgbsR+w2scyS90Jx+A3aRNw+leetTeFm32DKBfGOXCyBZxOAk/cLnU+cPrwqJ+w8JjvAE4wguHdIgBOdu3qFI+6ORN08j4HoCygWsjKSDGA6zIKvP8ScGLmOjo2f0+3XEbVlpgKtzoAuC+fafqgsBjsM2UE1ULZd8IOnnIvZwCn80XVjCnzqJY28myfdOIC6DRT1NGZkoGpcAOqlY0824eT+yf2E4aHUa1sZGrxr16+CzqZPQVgFtXKRuZK34tyPw/87nng8Xug05l8+xQCCKZkJITMBCQj56sHMB2Kwsfum6cG/SnWAGkyBDqZA50YbkcSwfCB7A+CKaM1KbFW0DzWaA2AdpU59k97nqlUu08IhlN2M20N+xv0Um/EHgBjK3K2KSdotwDGCYPifjJ0o2IAOYjJNNvpxtZw5uYBl8B29Yt/MVcHnsv7BPJTf5LNjRJGNiXrhfQLgBMTOElZM1c64c1CkLpzy82tSzYlQ8VDhornBFMM1wCcHNiXKTIKnweuoEplrvS+lr7z8l1ZEmVplCWyMDNwPPCMVbU4HZYdu+KgjwWhxb77sUYxVDxzCsAMqvdtnJWJkwA4Ha76Ns6rjY7OenP1nFCVfQeAjGx+/kVdxW2crFLF9wr6FlVDsEE7C5vOHgt1VnKmvLwUZyAx4rfnJ7L/vHPXVLYMVZncT4ZLXuAL9Wv62kU5HuSN5SZsksrmHVjvaTdX+yZBi2+7b/vuYWTnzmWAvEN+jgSum85G7OdpOyBngPBYXgbGKgYoB6YgcGmvCdhMeBqo9lhLk5ydQJ6lDfq/2Mr9UKizCGCDVvQSZyXXiqDFPC0Gar6JcJJQ8WNYH3iK6n0TcZLkah0+9F7367yqbSLqQkLF3Fwf+IaCKqEq4+Zy3ysUVImkEoFUV8f/juNMqA71D6NwF6uWqkzRAAAAAElFTkSuQmCC"
                alt="logo"
              />
              <Typography variant="h5">VIBEBLOG</Typography>
            </Stack>
          </Link>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              {isAuth ? (
                <>
                  <Link to="/create_post">
                    <Button variant="outlined">Write a post</Button>
                  </Link>
                  <Button onClick={handleLogout} variant="contained">
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outlined">Sign in</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained">Sign up</Button>
                  </Link>
                </>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton onClick={toggleDrawer}>
              <Menu sx={{ fontSize: 28 }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250, pt: 2 }}
          role="presentation"
          onClick={toggleDrawer}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                {item.link ? (
                  <ListItemButton component={Link} to={item.link}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                ) : (
                  <ListItemButton onClick={item.action}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
