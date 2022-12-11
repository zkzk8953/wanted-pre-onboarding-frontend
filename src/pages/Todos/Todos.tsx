import * as React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { Create, Delete, PlaylistAdd } from "@material-ui/icons";
import useStyles from "../../styles/style";
import api from "../../api/api";

// eslint-disable-next-line no-unused-vars
type TodoItem = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export default function Todos() {
  const styles = useStyles();
  const [todoItemList, setTodoItemList] = React.useState<TodoItem[]>([]);
  const [todoItem, setTodoItem] = React.useState({
    todo: "",
  });

  /**
   * 입력 폼 핸들
   * @param event
   */
  const hangleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem({
      todo: event.target.value,
    });
  };

  /**
   * 아이템 추가
   */
  const handleCreate = async () => {
    const response = await api.createTodoItem(todoItem);

    if (response.status === 201) {
      // eslint-disable-next-line no-alert
      window.alert(`추가 성공`);
    }
  };

  /**
   * 아이템 삭제
   */
  // const removeTodoItems = () => {

  // }

  /**
   * 아이템 수정
   */
  // const editTodoItems = () => {

  // }

  React.useEffect(() => {
    /**
     * 목록 불러오기
     */
    const getTodoItems = async () => {
      const response = await api.loadTodoItem();

      if (response.status === 200) {
        setTodoItemList([...todoItemList, response.data]);
      }
    };

    getTodoItems();
  }, []);

  return (
    <Container component="div" maxWidth="md">
      <CssBaseline />
      <div className={styles.paper}>
        <Typography component="h1" variant="inherit">
          ToDo
        </Typography>
        <div className={styles.dispart}>
          <TextField
            variant="outlined"
            margin="normal"
            id="item"
            label="To Do Thing"
            type="text"
            name="todo_item"
            autoCapitalize="todo"
            onChange={hangleChange}
            fullWidth
            required
          />
          <IconButton
            size="medium"
            edge="end"
            color="inherit"
            onClick={handleCreate}
          >
            <PlaylistAdd />
          </IconButton>
        </div>
        {todoItemList.map((item, i) => (
          <Card className={styles.root} key={item.id}>
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
                  <IconButton>
                    <Create fontSize="small" />
                  </IconButton>
                  <IconButton>
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </div>
              <Typography className={styles.title} variant="h5" component="h2">
                {`Task ${i}`}
              </Typography>
              <Typography variant="body2" component="p">
                {item.todo}
              </Typography>
              <div className={styles.checkbox}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Complete!!"
                  checked={item.isCompleted}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
