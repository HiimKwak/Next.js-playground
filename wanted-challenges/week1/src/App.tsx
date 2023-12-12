import Route from './components/Route';
import Router from './components/Router';
import { Root } from './pages/Root';
import { About } from './pages/About';

export default function App() {
  return (
    <Router>
      <Route path='/' component={<Root />} />
      <Route path='/about' component={<About />} />
    </Router>
  );
}
