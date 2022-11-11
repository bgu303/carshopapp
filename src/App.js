import './App.css';
import CarList from './components/carlist';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My Carshop</Typography>
      </Toolbar>
    
    </AppBar>
    <CarList />
    </>
  );
}

export default App;
