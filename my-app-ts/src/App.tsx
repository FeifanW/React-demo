import React, { useEffect, useState } from 'react';
import logo from './assets/images/logo.svg';
import styles from './App.module.css';
// import robots from './mockdata/robots.json';
import Robot from './components/Robot';
import ShoppingCart from './components/ShoppingCart';

interface Props {
  // username: string;
}

// interface State {
//   robotGallery: any[];
//   count: number;
// }

const App: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number>(0);
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    document.title = `点击${count}次`;
  }, [count]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await responses.json();
        setRobotGallery(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" className={styles.appLogo} />
        <h1>机器人舰队</h1>
      </div>
      {/* <h2>{props.username}</h2> */}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click
      </button>
      <ShoppingCart></ShoppingCart>
      {!error || (error !== '' && <div>网站出错：{error}</div>)}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r) => (
            <Robot id={r.id} email={r.email} name={r.name}></Robot>
          ))}
        </div>
      ) : (
        <h2>loading 加载中</h2>
      )}
    </div>
  );
};

export default App;
