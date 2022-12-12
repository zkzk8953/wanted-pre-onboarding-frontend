/* Libraries */
import * as React from "react";
import {
  CardContent,
  Checkbox,
  Card,
  FormControlLabel,
  IconButton,
  Typography,
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
  const { todo, isCompleted } = item;
  const styles = useStyles();

  /**
   *
   */
  const handleProps = (
    clickedItem: TodoItem,
    clickedType: "delete" | "edit",
  ) => {
    onClickHandler(clickedItem, clickedType);
  };

  return (
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
            <IconButton
              onClick={() => {
                handleProps(item, "edit");
              }}
            >
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
  );
}
