# Appendix 

## A-01. JSX에서 && 연산자
- 보통 && 연산자는 and 연산자로 활용되고, true 또는 false를 반환한다
- 그러나 JSX에서는 아래와 같다
  ```jsx
  { 조건식 && 참일때JSX표현식 }
  ```
  - 조건이 참일 때, JSX 표현식을 보여주고
  - 아닌 경우 null을 반환한다

## A-02. state와 sync / async

### JS async 처리방식
- JS에서는 비동기처리를 동기처리 코드 수행 이후 처리함!
- 비동기처리 코드가 아무리 빨라도 동기처리를 먼저 수행함!

### setState()
- **`useState()`의 변경함수는 async로 처리된다!!**
  ```jsx
  <button onClick={() => {
    setCount(count+1)
    if (count < 3) setAge(age+1)
  }}>
  ```
- 위의 코드의 경우, count가 2 이상이 되어도 age가 일시적으로 증가하는 모습을 볼 수 있다.
  - count와 age의 처리 시점이 안맞기 때문!!
- 해결방법
  1. useEffect로 state 변경 시, 코드를 처리하도록 구성하면 해결 가능!!
  2. 자료형을 하나로 묶어서(arr/obj) 처리
  3. 리랜더링이 필요없는 경우, state가 아닌 일반변수로 변경