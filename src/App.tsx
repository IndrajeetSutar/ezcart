import { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Default from './views/Default';
import Reader from './views/Reader';
import Login from './authentication/login';
import Products from './views/products';
import { AppBar, Drawer, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export interface IAppProps {

}

export interface IAppState {
  isLoggedIn: boolean;
  anchorEl: boolean;
  open: boolean;
}

class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isLoggedIn: false,
      anchorEl: false,
      open: false
    }
  }

  componentDidMount() {
    // startFirebase();
    firebase.auth().onAuthStateChanged(user => {
      if (user) { this.setState({ isLoggedIn: true }) }
      else { this.setState({ isLoggedIn: false }) }
    })
  }

  handleMenu = (event: { currentTarget: any; }) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event: { currentTarget: any; }) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    return (
      <div
        onClick={() => { this.state.open ? this.setState({ open: false }) : <></> }}
        onKeyDown={() => { this.state.open ? this.setState({ open: false }) : <></> }}>

        <BrowserRouter>

          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => this.setState({ open: !this.state.open })} >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.anchorEl}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            anchor="left"
            open={this.state.open}
            onClose={() => { this.setState({ open: !this.state.open }) }}
          >
            <div
              role="presentation"
              onClick={() => { this.setState({ open: false }) }}
              onKeyDown={() => { this.setState({ open: false }) }}
              onMouseLeave={() => { this.setState({ open: false }) }}
            >
              <List>
                {['product', ].map((text, index) => (

                  <ListItem button key={text}>
                    <Link to={'/' + text} ><ListItemText primary={text} />
                    </Link>
                  </ListItem>

                ))}
              </List>
            </div>
          </Drawer >
          <Routes>
            <Route path='/' element={this.state.isLoggedIn ? <Home /> : <Default />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/product' element={<Products />} />
            <Route path='/reader' element={<Reader />} />
            <Route path='/default' element={<Default />} />
          </Routes>
        </BrowserRouter>
      </div >
    );
  }
}
export default App;
function startFirebase() {
  throw new Error('Function not implemented.');
}

