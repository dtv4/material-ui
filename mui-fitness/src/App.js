import React, { Component } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 400
  },
  form: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-evenly'
  }
}

class App extends Component {
  state = {
    exercises: [],
    title: ''
  }

  handleChange = ({ target: {name, value} }) => {
    this.setState({
      [name]: value,
    });
  }
  handleCreate = e => {
    e.preventDefault();

    this.setState({
      exercises: [
        ...this.state.exercises,
        {
          title: this.state.title,
          id: Date.now()
        },
      ],
      title: ''
    });
  }

  handleDelete = id => {
    this.setState({
      exercises: this.state.exercises.filter(ex => ex.id !== id)
    });
  }

  render() {
    const {title, exercises} = this.state;
    const { classes } = this.props

    return <Paper className={classes.root}>
      <Typography variant='display1' align='center' gutterBottom>Exercises</Typography>
      <form className={classes.form} onSubmit={this.handleCreate}>
        <TextField name='title' value={title} onChange={this.handleChange} />
        <Button type='submit' color='primary' variant='contained'>Create</Button>
      </form>
      <List>
        {exercises.map(({id, title}) =>
          <ListItem key={id}>
            <ListItemText primary={title}></ListItemText>
            <ListItemSecondaryAction>
              <IconButton color="primary" onClick={() => this.handleDelete(id)}>
                <Delete/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </Paper>
  }
};

export default withStyles(styles)(App)
