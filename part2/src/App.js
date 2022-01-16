import data from './data'
import './App.css';

// 필요한 것만 불러오는 이유 -> 용량..?
import {Nav, Navbar, Container, NavDropdown, Button} from 'react-bootstrap';

// Destructuring assignment
import {useState} from 'react'


function App() {
  
  let [shoesData, setShoesData] = useState(data)
  
  return (
    <div className="App">

      {/* 이렇게 사용하는 방법은 React-Bootstrap 방식임 */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Emt Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='Jumbotron'>
        <h1>20% 할인중!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <Button bsStyle="primary">Learn more</Button>
        </p>
      </div>

      {/* 이렇게 사용하는 방법은 원조 방식임 (단, 용량이 조금 커짐)*/}
      {/* React-Bootstrap 설치했는데 아래와 같이 사용하고 싶다면, CDN링크를 index.html에 추가해야 함! */}

      <div className='container'>
        <div className='row'>
          {
            shoesData.map( (i, idx) => {
              return <Item key={idx} shoesData={ i } imageSrc={ 'https://codingapple1.github.io/shop/shoes'+(idx+1)+'.jpg' } />
            })
          }
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
  );
}


function Item(props) {

  return (
    <div className='col-md-4'>
      <img src={ props.imageSrc } width="100%"/>
      <h4>{ props.shoesData.title }</h4>
      <p>{ props.shoesData.content }</p>
      <p>{ props.shoesData.price }</p>
    </div>
  )

}


export default App;
