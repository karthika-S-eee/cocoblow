// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'

// import './index.css'

// import App from './App.jsx'

// import { BrowserRouter } from 'react-router-dom'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>

//     <BrowserRouter>

//       <App />

//     </BrowserRouter>

//   </StrictMode>,
// )

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

// import "./index.css";

// import App from "./App.jsx";

// import { BrowserRouter } from "react-router-dom";

// import { Provider } from "react-redux";

// import { store } from "./redux/store";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>

//     <Provider store={store}>

//       <BrowserRouter>

//         <App />

//       </BrowserRouter>

//     </Provider>

//   </StrictMode>
// );

import React from "react"
import ReactDOM from "react-dom/client"
import { injectSpeedInsights } from '@vercel/speed-insights'
import App from "./App"
import "./index.css"

injectSpeedInsights()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)