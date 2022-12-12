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
  // 선택한 todo 아이템
  const [selectedTodoItem, setSelectedTodoItem] = React.useState<TodoItem>({
    id: -1,
    todo: "",
    isCompleted: false,
    userId: -1,
  });

  /**
   * 상위 컴포넌트로 props 전달
   * @param selectedItem 선택한 todo 아이템
   * @param type 데이터 변경 타입
   */
  const handleProps = (selectedItem: TodoItem, type: "delete" | "edit") => {
    onClickHandler(selectedItem, type);
  };

  const handleDialog = () => {
    setSelectedTodoItem(item);
    setIsOpen(!isOpen);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTodoItem({
      ...selectedTodoItem,
      todo: event.target.value,
    });
  };

  const handleCheck = () => {
    handleProps({ ...item, isCompleted: !item.isCompleted }, "edit");
  };
  return (
    <>
      <Card className={styles.root} style={{ opacity: isCompleted ? 0.8 : 1 }}>
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
              <IconButton onClick={handleDialog}>
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
            {`${itemNumber}번째 할일`}
          </Typography>
          <Typography variant="body2" component="p">
            {todo}
          </Typography>
          <div className={styles.checkbox}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Complete!!"
              checked={isCompleted}
              onChange={handleCheck}
            />
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={isOpen}
        onClose={handleDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">수정하기</DialogTitle>
        <DialogContent>
          <DialogContentText>{`${itemNumber}번째 할일`}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="todo"
            label="To Do Thing"
            type="text"
            value={selectedTodoItem.todo}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="primary">
            취소
          </Button>
          <Button
            onClick={() => {
              handleProps(selectedTodoItem, "edit");
              handleDialog();
            }}
            color="primary"
          >
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
