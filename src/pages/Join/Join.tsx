/* Libraries */
import * as React from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import api from "../../api/api";
/* Styles */
import useStyles from "../../styles/style";

export default function Join() {
  const styles = useStyles();
  const [userInfo, setUserInfo] = React.useState({ email: "", password: "" });
  const [isChecked, setIsChecked] = React.useState({
    email: false,
    password: false,
  });

  /**
   * 사용자 회원가입
   * @param event
   */
  const handleJoin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await api
      .userJoin(userInfo)
      .then((res) => {
        console.log(res);

        if (res.status === 201) {
          // 회원가입 성공
          localStorage.setItem("token", res.data.access_token);
          // eslint-disable-next-line no-restricted-globals
          location.replace("/");
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        window.alert(`Error occurd!! : ${err.message}`);
      });
  };

  /**
   *  사용자 이메일 검증
   * @param event
   */
  const validateUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;

    setUserInfo({ email: event.target.value, password: userInfo.password });
    if (regex.test(event.target.value)) {
      setIsChecked({ email: true, password: isChecked.password });
    } else {
      setIsChecked({ email: false, password: isChecked.password });
    }
  };

  /**
   * 사용자 비밀번호 검증
   * @param event
   */
  const validateUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = event.target.value.length;

    setUserInfo({ email: userInfo.email, password: event.target.value });
    if (regex >= 8) {
      setIsChecked({ email: isChecked.email, password: true });
    } else {
      setIsChecked({ email: isChecked.email, password: false });
    }
  };

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <PersonAdd />
        </Avatar>
        <Typography component="h1" variant="h4">
          회원가입
        </Typography>
        <form className={styles.form} onSubmit={handleJoin}>
          <Grid container spacing={2} className={styles.dispart}>
            <Grid item xs={12} sm={4}>
              <Typography component="h5">아이디</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                margin="normal"
                id="id"
                label="email"
                name="user_id"
                fullWidth
                autoFocus
                onChange={validateUserEmail}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={styles.dispart}>
            <Grid item xs={12} sm={4}>
              <Typography component="h5">비밀번호</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                margin="normal"
                id="id"
                label="password"
                name="user_id"
                type="password"
                fullWidth
                onChange={validateUserPassword}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            disabled={!isChecked.email || !isChecked.password}
          >
            회원가입
          </Button>
        </form>
      </div>
    </Container>
  );
}
