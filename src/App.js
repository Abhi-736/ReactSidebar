
import React from 'react';
import Sidebar from './component/Sidebar';
import './style/style.css'

function App() {
  const [isDark,setisDark]= React.useState(false)//for applying dark theme to the browser window

const handleClick=()=>{
  setisDark(pre=>!pre)

}
  return (<div className='container' id={`${isDark}`} >
    <button className='themebtn' onClick={()=>(handleClick())}>{isDark?'Light Theme':'Dark Theme'}</button>
<Sidebar/>
  </div>
  );
}

export default App;
