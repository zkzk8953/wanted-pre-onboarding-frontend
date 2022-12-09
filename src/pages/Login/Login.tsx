/* Libraries */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import useStyles from "../../styles/style";
import api from "../../api/api";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthorizationProps {}

export default function Authorization() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({ email: "", password: "" });

  // const storeToken = (token: string): void => {
  //   localStorage.setItem("token", token);
  // };

  const auth = async () => {
    // const res = await api.post("/auth/signin", { ...userInfo }).then((res) => {
    //   console.log(res);
    // }).catch(error => {
    //   window.alert(error.message);
    //   console.log(error);
    // });
  };

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          로그인
        </Typography>
        <form className={styles.form}>
          <TextField
            variant="outlined"
            margin="normal"
            id="id"
            label="아이디"
            name="user_id"
            autoComplete="id"
            autoFocus
            fullWidth
            required
            onChange={(e) => {
              setUserInfo({
                email: e.target.value,
                password: userInfo.password,
              });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="password"
            label="비밀번호"
            type="password"
            name="user_password"
            autoCapitalize="password"
            fullWidth
            required
            onChange={(e) => {
              setUserInfo({ email: userInfo.email, password: e.target.value });
            }}
          />
          <div className={styles.dispart}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="로그인 정보 저장"
            />
            <Typography
              onClick={() => {
                navigate("/join");
              }}
            >
              회원가입
            </Typography>
          </div>
          <Button
            className={styles.form}
            variant="contained"
            type="button"
            color="primary"
            onClick={auth}
            fullWidth
          >
            로그인
          </Button>
        </form>
      </div>
    </Container>
  );
}
