import { useDeferredValue, useState, useTransition } from "react";

function Test() {
  let [name, setName] = useState('')
  let arr = new Array(10000).fill(0)
  let [isPending, startTransition] = useTransition()

  // 변동 사항이 생겼을 시, state가 늦게 처리됨!
  let state = useDeferredValue(name)

  return (
    <div>
      <input onChange={(e) => 
        startTransition(() => {
          setName(e.target.value)
        })
      }/>
      { isPending ? "✴️" : "✅" }
      {
        arr.map(() => <div>{state}</div>)
      }
    </div>
  )
}

export default Test