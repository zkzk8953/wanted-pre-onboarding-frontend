/* Libraries */
import * as React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
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
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { UserInfo } from "../Join/Join";
/* Modules */
import api from "../../api/api";
/* Styles */
import useStyles from "../../hooks/style";

export default function Authorization() {
  // style hook
  const styles: ClassNameMap = useStyles();

  // router hook
  const navigate: NavigateFunction = useNavigate();

  // 유저 정보
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    email: "",
    password: "",
  });

  // 유저 정보 validation
  const [isChecked, setIsChecked] = React.useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });

  /**
   * 사용자 로그인
   * @param event 이벤트
   */
  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let response;

    try {
      response = await api.auth(userInfo);
    } catch (err) {
      // eslint-disable-next-line no-alert, no-console
      console.log(`Error occured : ${err}`);
    }

    if (response !== undefined && response.status === 200) {
      localStorage.setItem("token", response.data.access_token);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } else {
      // eslint-disable-next-line no-alert
      window.alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
    }
  };

  /**
   *  사용자 이메일 검증
   * @param event 이벤트
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
   * @param event 이벤트
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
