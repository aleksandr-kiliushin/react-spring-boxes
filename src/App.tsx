import { useDispatch, useSelector } from 'react-redux'
import { RootState, store } from './store'
import { addBox, deleteBox, setStatus } from './store/boxesSlice'
import { animated, useSpring } from '@react-spring/web'
import './App.css'

function App() {
  const boxes = useSelector((state: RootState) => state.boxes.boxes)
  const status = useSelector((state: RootState) => state.boxes.status)
  const dispatch = useDispatch()

  const [addBoxSprings, addBoxApi] = useSpring(() => ({}))
  const [removeBoxSprings, removeBoxApi] = useSpring(() => ({}))

  const onAdd = () => {
    if (status !== 'READY') {
      return
    }

    addBoxApi.start({
      from: {
        x: -(innerWidth / 5),
      },
      to: {
        x: 0,
      },
      config: {
        duration: 250,
      },
      onStart: () => {
        dispatch(addBox())
        dispatch(setStatus({ status: 'ADDING' }))
      },
      onResolve: () => {
        const boxesCountOnWhenAnimationFinished = store.getState().boxes.boxes.length
        if (boxesCountOnWhenAnimationFinished > 5) {
          dispatch(deleteBox())
        }
        dispatch(setStatus({ status: 'READY' }))
      },
    })
  }

  const onRemove = () => {
    if (status !== 'READY') {
      return
    }

    removeBoxApi.start({
      from: {
        x: 0,
      },
      to: {
        x: window.innerWidth,
      },
      config: {
        duration: 500,
      },
      onStart: () => {
        dispatch(setStatus({ status: 'DELETING' }))
      },
      onResolve: () => {
        dispatch(deleteBox())
        dispatch(setStatus({ status: 'READY' }))
      },
    })
  }

  return (
    <>
      <div className="controls">
        <button className="control add-box" onClick={onAdd}>
          Add
        </button>
        <button className="control delete-box" onClick={onRemove}>
          Delete
        </button>
      </div>
      <div className="container">
        {boxes.map((box, boxIndex) => {
          return (
            <animated.div
              style={{
                width: '20vw',
                backgroundColor: box.color,
                ...addBoxSprings,
                ...(status === 'DELETING' && boxIndex === boxes.length - 1 ? removeBoxSprings : {}),
              }}
              key={box.id}
            />
          )
        })}
      </div>
    </>
  )
}

export default App
