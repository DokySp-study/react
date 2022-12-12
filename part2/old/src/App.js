import data from "./data";
import "./App.css";

// 디테일 페이지 임포트
import Detail from "./Detail";

// 필요한 것만 불러오는 이유 -> 용량..?
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";

// Destructuring assignment
import { useState } from "react";

// Routing
import { Link, Route, Switch } from "react-router-dom";

function App() {
  let [shoesData, setShoesData] = useState(data);

  return (
    <div className="App">
      {/* 이렇게 사용하는 방법은 React-Bootstrap 방식임 */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Emt Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Link tag를 통한 라우터 이동 */}
              <Nav.Link>
                {" "}
                <Link to="/">Home</Link>{" "}
              </Nav.Link>
              <Nav.Link>
                {" "}
                <Link to="/detail">Detail</Link>{" "}
              </Nav.Link>

              {/* 아래와 같이 해도 라우팅은 되지만, 페이지 전체가 리랜더링된다! */}
              {/* 
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/detail'>Detail</Nav.Link>
              */}

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

      {/* */}
      {/* */}
      {/* ### Routing */}

      {/* 매칭이 되는 모든 페이지 보여줌 */}
      {/* -> 명확하게 매칭되는 것만 보이게 하기 위해 exact를 사용 */}
      {/* v6 에서는 사용방법 변함! */}

      {/* 페이지마다 다른 페이지가 아님! */}
      {/* HTML 파일 하나를 계속 갈아끼우면서 다른 페이지처럼 보이게 함! */}

      {/* 스위치를 사용하면 중복이 있을 경우, 제일 상단에 있는 페이지를 보여주게 됨! */}
      <Switch>
        {/* */}
        {/* 메인 페이지 */}
        <Route exact path="/">
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

            {/* 이렇게 사용하는 방법은 원조 방식임 (단, 용량이 조금 커짐)*/}
            {/* React-Bootstrap 설치했는데 아래와 같이 사용하고 싶다면, CDN링크를 index.html에 추가해야 함! */}

            <div className="container">
              <div className="row">
                {shoesData.map((shoe, idx) => (
                  <Item key={idx} shoesData={shoe} imageIdx={idx + 1} />
                ))}
              </div>
            </div>

            {/* 
              <div className='container'>
                <div className='row'>
                  <Item shoesData={ shoesData[0] } imageSrc={ 'https://codingapple1.github.io/shop/shoes1.jpg' } />
                  <Item shoesData={ shoesData[1] } imageSrc={ 'https://codingapple1.github.io/shop/shoes2.jpg' } />
                  <Item shoesData={ shoesData[2] } imageSrc={ 'https://codingapple1.github.io/shop/shoes3.jpg' } />
                </div>
              </div> 
            */}
          </div>
        </Route>

        {/* */}
        {/* 상세 페이지 */}
        <Route exact path="/detail">
          {/* 컴포넌트를 밖으로 뺌 -> 모듈화 */}
          {/* 폴더로 따로 빼기도 한다 */}

          {/* 중요한 데이터는 최상위(App)에서 관리 -> 하위 컴포넌트로 props로 전달해서 내림 */}
          {/* 복잡해지면 다른 컴포넌트 혹은 Redux로 관리 */}
          <Detail shoesData={shoesData} />
        </Route>
        {/* */}
        {/* 추가 라우팅 방법 */}
        {/* 이런 식으로 컴포넌트를 넣을 수도 있음 */}
        {/* <Route path="/modal" component={Item}/> */}

        {/* */}
        {/* url에 파라미터 값 받기 */}
        {/* url을 통해 특수한 값을 받아오는 방법은 body, query string, path variable (params) 가 있음 */}
        {/* https://velog.io/@jcinsh/Query-string-path-variable */}
        <Route path="/:id">
          <div>ㄴㅁㅇㄹㅁㄴㅇㄹㄴㅇㄹ</div>
        </Route>
        {/* */}
      </Switch>
    </div>
  );
}

function Item(props) {
  return (
    <div className="col-md-4">
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.imageIdx}.jpg`}
        width="100%"
      />
      <h4>{props.shoesData.title}</h4>
      <p>{props.shoesData.content}</p>
      <p>{props.shoesData.price}</p>
    </div>
  );
}

export default App;
