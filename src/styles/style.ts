/* Libraries */
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  detail: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dispart: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(35),
      height: theme.spacing(40),
    },
  },
  sort: {
    fontSize: 14,
  },
  title: {
    marginBottom: 12,
  },
  checkboxRoot: {
    position: "relative",
  },
  checkbox: {
    position: "absolute",
    bottom: 10,
  },
}));

export default useStyles;
