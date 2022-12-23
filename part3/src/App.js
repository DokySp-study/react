import data from "./utils/data";
import "./App.css";
import Detail from "./pages/Detail";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import { createContext, useState } from "react";
import { Link, Outlet, Route, Routes,  } from "react-router-dom";
import axios from "axios";
import Cart from "./pages/Cart";


// Context(state 바구니) 생성
export let Context1 = createContext()



function App() {
  let [ shoesData, setShoesData ] = useState(data);

  // context api로 상태관리
  let [ stock ] = useState([10, 11, 12])


  return (
    <div className="App">
      {/* 이렇게 사용하는 방법은 React-Bootstrap 방식임 */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Emt Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <Nav.Link>
                {" "}
                <Link to="/">Home</Link>{" "}
              </Nav.Link>
              <Nav.Link>
                {" "}
                <Link to="/detail">Detail</Link>{" "}
              </Nav.Link>
              <Nav.Link>
                {" "}
                <Link to="/cart">Cart</Link>{" "}
              </Nav.Link>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={ <MainPage/> }/>
        
        {/* <Route path="/detail/:id" element={ 
          <Context1.Provider 
            value={
              {stock, shoesData}
            }>
            <Detail/> 
          </Context1.Provider>
        }/> */}

        <Route path="/detail/:id" element={           
          <Detail shoesData={ shoesData }/> 
        }/>

        <Route path="about" element={
          <>
            어바웃페이지<br/>
            <Outlet/>
          </>}>
          <Route path="member" element={ <>구성원</> } />
          <Route path="location" element={ <>위치정보</> } />
        </Route>

        <Route path="/cart" element={
          <Cart/>
        } />
        
        <Route path="*" element={ <>없는 페이지입니다.</> } />
      </Routes>

    </div>
  );



  function MainPage() {
    return (
      <div>
        <div className="Jumbotron">
          <h1>20% 할인중!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component
            for calling extra attention to featured content or information.
          </p>
          <p>
            <Button bsStyle="primary">Learn more</Button>
          </p>
        </div> 
  
        <div className="container">
          <div className="row">
            {shoesData.map((shoe, idx) => (
              <Item key={idx} shoesData={shoe} imageIdx={idx + 1} />
            ))}
          </div>
        </div>

        <button onClick={ () => { 
          axios.get('https://codingapple1.github.io/shop/data2.json').then(
            (res) => {
              let tmp = [...shoesData, ...res.data]
              setShoesData(tmp)
            }
          ).catch( (reason) => {
            alert(reason)
          } )
        } }>버튼</button>

      </div>
    );
  }
}

function Item(props) {
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.imageIdx}.jpg`}
        width="100%"
        alt=""
      />
      <h4>{props.shoesData.title}</h4>
      <p>{props.shoesData.content}</p>
      <p>{props.shoesData.price}</p>
    </div>
  );
}

export default App;