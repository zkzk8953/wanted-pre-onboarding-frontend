/* Libraries */
import * as React from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import useStyles from "../../styles/style";

export default function Join() {
  const styles = useStyles();

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
        <form className={styles.form}>
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
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={styles.dispart}>
            <Grid item xs={12} sm={4}>
              <Typography component="h5">비밀번호 확인</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                margin="normal"
                id="id"
                label="password confirm"
                name="user_id"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <Grid item>
              <FormControlLabel
                style={{ marginTop: "15px" }}
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="회원가입에 동의합니다"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
