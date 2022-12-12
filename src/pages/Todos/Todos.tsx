/* Libraries */
import * as React from "react";
import {
  Container,
  CssBaseline,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { PlaylistAdd } from "@material-ui/icons";
/* Components */
import TodoCard from "../../components/Todo/TodoCard";
/* Modules */
import api from "../../api/api";
/* Styles */
import useStyles from "../../styles/style";

export type TodoItem = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

export default function Todos() {
  // style hook
  const styles = useStyles();

  // todo 목록
  const [todoItemList, setTodoItemList] = React.useState<TodoItem[]>([]);

  // 추가할 todo 아이템
  const [todoItem, setTodoItem] = React.useState({
    todo: "",
  });

  /**
   * 아이템 목록 불러오기
   */
  const getTodoItems = async () => {
    const response = await api.loadTodoItem();

    if (response.status === 200) {
      setTodoItemList(response.data);
    }
  };

  /**
   * 아이템 추가
   */
  const handleCreate = async () => {
    if (todoItem.todo === "") {
      // eslint-disable-next-line no-alert
      window.alert("할 일을 입력해주세요.");
      return;
    }

    const response = await api.createTodoItem(todoItem);

    if (response.status === 201) {
      // eslint-disable-next-line no-alert
      setTodoItem({ todo: "" });
      getTodoItems();
      // eslint-disable-next-line no-alert
      window.alert("추기되었습니다.");
    } else {
      // eslint-disable-next-line no-alert
      window.alert("에러가 발생하였습니다. 잠시후 다시 시도해주세요.");
    }
  };

  /**
   * 아이템 수정
   * @param item 수정할 아이템 id
   */
  const editTodoItems = async (item: TodoItem) => {
    const response = await api.editTodoItem(item.id, {
      todo: item.todo,
      isCompleted: item.isCompleted,
    });

    if (response.status === 200) {
      getTodoItems();
      // eslint-disable-next-line no-alert
      window.alert("수정되었습니다");
    }
  };

  /**
   * 아이템 삭제
   * @param id 선택된 아이템 id
   */
  const removeTodoItems = async (id: number) => {
    const response = await api.deleteTodoItem(id);

    if (response.status === 204) {
      // eslint-disable-next-line no-alert
      getTodoItems();
      // eslint-disable-next-line no-alert
      window.alert("삭제되었습니다.");
    }
  };

  /**
   * 입력 폼 핸들
   * @param event onChange 이벤트 객체
   */
  const hangleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem({
      todo: event.target.value,
    });
  };

  /**
   * 하위 컴포넌트 props 불러오기
   * @param item 선택한 아이템
   * @param type handle 타입
   */
  const handleProps = (item: TodoItem, type: "delete" | "edit"): void => {
    if (type === "delete") {
      removeTodoItems(item.id);
    } else if (type === "edit") {
      editTodoItems(item);
    }
  };

  React.useEffect(() => {
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
            value={todoItem.todo}
            fullWidth
            autoFocus
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
        <div className={styles.root}>
          {todoItemList.map((item, index) => (
            <TodoCard
              item={item}
              key={item.id}
              onClickHandler={handleProps}
              itemNumber={index + 1}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
