import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import { v4 as uuid } from 'uuid';
import List from '../List/List';
import { createStyles, Grid, Card, TextInput, Slider, Button, Text } from '@mantine/core';
import Auth from '../Auth/Auth';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.lg,
    width: '80%',
    margin: 'auto',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  }
}));


const ToDo = () => {
  const { classes } = useStyles();

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function addItem(item) {
    if(item.text){
      item.complete = false;
      console.log('ADD ITEM', item);
      const config = {
        url: '/todo',
        baseURL: 'https://api-js401.herokuapp.com/api/v1',
        method: 'post',
        data: item
      }
      const res = await axios(config)
      setList([...list, res.data]);
    } else {
      console.warn('ITEM TEXT NOT PRESENT');
    }
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);

  useEffect(() => {
    (async () => {
      const config = {
        url: '/todo',
        baseURL: 'https://api-js401.herokuapp.com/api/v1',
        method: 'get',
      }
      let res = await axios(config);
      setList(res.data.results);
    })()
  }, []);

  async function deleteItem(id) {
    const config = {
      url: `/todo/${id}`,
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'delete'
    }
    const res = await axios(config);
    getList();
  }

  async function toggleComplete(item) {
    const complete = !item.complete
    const config = {
      url: `/todo/${item._id}`,
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'put',
      data: { ...item, complete }
    }
    const res = await axios(config);
    getList();
  }

  async function getList() {
    const config = {
      url: '/todo',
      baseURL: 'https://api-js401.herokuapp.com/api/v1',
      method: 'get',
    }
    let res = await axios(config);
    setList(res.data.results)
  }

  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1" className={classes.h1}>To Do List: {incomplete} items pending</h1>
      </header>

      <Grid style={{ widith: '80%', margin: 'auto' }}>
        <Auth capability="create">
          <Grid.Col xs={12} sm={4}>
            <Card withBorder>
              <form onSubmit={handleSubmit}>

                <h2>Add To Do Item</h2>

                <TextInput
                  name="text"
                  placeholder={"Item Details"}
                  onChange={handleChange}
                  label="To Do Item"
                />

                <TextInput
                  name="assigneee"
                  placeholder={"Assignee Name"}
                  onChange={handleChange}
                  label="Assigned To"
                />

                <Text>Difficulty</Text>
                <Slider
                  name="Difficulty"
                  onChange={handleChange}
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={defaultValues.difficulty}
                />

                <Button type="submit">Add Item</Button>
              </form>
            </Card>
          </Grid.Col>
        </Auth>
        <Auth capability="read">
          <Grid.Col xs={12} sm={4}>
            <List list={list} 
            toggleComplete={toggleComplete} 
            deleteItem={deleteItem}/>
          </Grid.Col>
        </Auth>
      </Grid>
    </>
  );
};

export default ToDo;
