import React from 'react';
import logo from './assets/images/logo.svg';
import styles from './App.module.css';
// import robots from './mockdata/robots.json';
import Robot from './components/Robot';
import ShoppingCart from './components/ShoppingCart';

interface Props {}

interface State {
  robotGallery: any[];
  count: number;
}

class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      robotGallery: [],
      count: 0,
    };
  }

  componentDidMount(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => this.setState({ robotGallery: data }));
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} alt="logo" className={styles.appLogo} />
          <h1>机器人舰队</h1>
        </div>
        <span>count: {this.state.count}</span>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 }, () => {
              console.log('count ', this.state.count);
            });
            this.setState(
              (preState, preProps) => {
                return { count: preState.count + 1 };
              },
              () => {
                console.log('count ', this.state.count);
              }
            );
          }}
        >
          Click
        </button>
        <ShoppingCart></ShoppingCart>
        <div className={styles.robotList}>
          {this.state.robotGallery.map((r) => (
            <Robot id={r.id} email={r.email} name={r.name}></Robot>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
