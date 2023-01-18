import { Badge, Card, CloseButton, Group, Pagination, Text } from "@mantine/core";
import { useContext, useState } from 'react'
import { SettingsContext } from '../../context/Settings/Settings';
import { If, Then, When, Else } from 'react-if';
import { AuthContext } from "../../context/Auth/Auth";

// const useStyles = createStyles((theme) => {
// //Create Stylization of To Do cards
// });

const List = ({ list, toggleComplete, deleteItem }) => {

  const { pageItems, showComplete } = useContext(SettingsContext);
  const [page, setPage] = useState(1);
  const { can } = useContext(AuthContext);

  const listToRender = showComplete ? list : list.fitler(item => !item.complete);

  const listStart = pageItems * (page - 1);

  const listEnd = listStart + pageItems;

  const pageCount = Math.ceil(listToRender.length / pageItems);

  const displayList = listToRender.slice(listStart, listEnd);

  return (
    <>
      {displayList.map(item => (
        <Card key={item._id} withBorder shadow="medium" mb="sm">
          <Card.Section withBorder shadow="medium">
            <Group>
              <CloseButton
                title="Close ToDo Item"
                onClick={() => deleteItem(item._id)}
              />
              <If condition={can('update')}>
                <Then>
                  <Badge
                    color={item.complete ? "red" : "green"}
                    variant="filled"
                    onClick={() => toggleComplete(item)}
                  >
                    {item.complete ? 'Complete' : 'Pending'}
                  </Badge>
                </Then>
                <Else
                  color={item.complete ? "red" : "green"}
                  variant="filled"
                >
                  {item.complete ? 'Complete' : 'Pending'}
                </Else>
              </If>
              <Text>{item.assignee}</Text>
            </Group>
          </Card.Section>
          <Text mt="sm">{item.text}</Text>
          <Text align="right">Difficulty: {item.difficulty}</Text>
        </Card>
      ))}

      <When condition={listToRender.length > 0}>

        <Pagination page={page} onChange={setPage} total={pageCount} />
      </When>
    </>
  )
}


export default List; 