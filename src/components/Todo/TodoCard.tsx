/* Libraries */
import * as React from "react";
import {
  CardContent,
  Checkbox,
  Card,
  FormControlLabel,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import { Create, Delete } from "@material-ui/icons";
/* Components */
import { TodoItem } from "../../pages/Todos/Todos";
/* Styles */
import useStyles from "../../styles/style";

interface PropsHandler {
  // eslint-disable-next-line no-unused-vars
  (item: TodoItem, type: "delete" | "edit"): void;
}

type TodoProps = {
  item: TodoItem;
  itemNumber: number;
  onClickHandler: PropsHandler;
};

export default function TodoCard({
  item,
  itemNumber,
  onClickHandler,
}: TodoProps) {
  const styles = useStyles();
  const { todo, isCompleted } = item;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  /**
   * 상위 컴포넌트로 props 전달
   * @param selectedItem 선택한 todo 아이템
   * @param type 데이터 변경 타입
   */
  const handleProps = (selectedItem: TodoItem, type: "delete" | "edit") => {
    onClickHandler(selectedItem, type);
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Card className={styles.root}>
        <CardContent className={styles.checkboxRoot}>
          <div className={styles.dispart}>
            <Typography
              className={styles.sort}
              color="textSecondary"
              gutterBottom
            >
              Todo
            </Typography>
            <div>
              <IconButton onClick={handleClickOpen}>
                <Create fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleProps(item, "delete");
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </div>
          </div>
          <Typography className={styles.title} variant="h5" component="h2">
            {`할일 번호 ${itemNumber}`}
          </Typography>
          <Typography variant="body2" component="p">
            {todo}
          </Typography>
          <div className={styles.checkbox}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Complete!!"
              checked={isCompleted}
            />
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`할일 번호 ${itemNumber} 수정`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="todo"
            label="To Do Thing"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
