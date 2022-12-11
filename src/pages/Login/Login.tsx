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
  const [isChecked, setIsChecked] = React.useState({
    email: false,
    password: false,
  });

  /**
   * 사용자 로그인
   * @param event
   */
  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await api
      .auth(userInfo)
      .then((res) => {
        if (res.status === 200) {
          // 로그인 성공
          localStorage.setItem("token", res.data.access_token);
          // eslint-disable-next-line no-restricted-globals
          location.reload();
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
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h4">
          로그인
        </Typography>
        <form className={styles.form} onSubmit={handleAuth}>
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
            onChange={validateUserEmail}
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
            onChange={validateUserPassword}
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
            type="submit"
            color="primary"
            disabled={!isChecked.email || !isChecked.password}
            fullWidth
          >
            로그인
          </Button>
        </form>
      </div>
    </Container>
  );
}
