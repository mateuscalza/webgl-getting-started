import React, { useState } from 'react'
import styled from 'styled-components'
import { useKey } from 'react-use'
import Panel from './components/panel/panel'
import Board from './components/board/board'

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  perspective: 90px;
`

function App() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0)
  const [layers, setLayers] = useState([
    {
      type: 'rect',
      width: 0.5,
      height: 0.5,
      color: '#686de0',
      x: 0,
      y: 0,
      rotation: 0,
    },
    {
      type: 'rect',
      width: 0.4,
      height: 0.4,
      color: '#badc58',
      x: 0,
      y: 0,
      rotation: 0,
    },
    {
      type: 'triangle',
      width: 0.3,
      height: 0.3,
      color: '#f0932b',
      x: 0,
      y: 0,
      rotation: 0,
    },
    {
      type: 'circle',
      radius: 0.03,
      color: '#eb4d4b',
      x: 0,
      y: 0,
      rotation: 0,
    },
  ])

  const handleTranslate = (x = 0, y = 0) =>
    setLayers(oldLayers => {
      const newLayers = oldLayers.slice(0)

      const currentLayer = newLayers[activeLayerIndex]
      newLayers[activeLayerIndex] = {
        ...currentLayer,
        x: currentLayer.x + x,
        y: currentLayer.y + y,
      }

      return newLayers
    })

  const handleRotate = (rotation = 0) =>
    setLayers(oldLayers => {
      const newLayers = oldLayers.slice(0)

      const currentLayer = newLayers[activeLayerIndex]
      newLayers[activeLayerIndex] = {
        ...currentLayer,
        rotation: currentLayer.rotation + rotation,
      }

      return newLayers
    })

  const keyTranslateFactor = 0.005
  const keyRotateFactor = 0.005
  useKey('ArrowUp', () => handleTranslate(0, keyTranslateFactor))
  useKey('ArrowDown', () => handleTranslate(0, -keyTranslateFactor))
  useKey('ArrowLeft', () => handleTranslate(-keyTranslateFactor, 0))
  useKey('ArrowRight', () => handleTranslate(keyTranslateFactor, 0))
  useKey('f', () => handleRotate(keyRotateFactor))
  useKey('g', () => handleRotate(-keyRotateFactor))

  return (
    <Wrapper>
      <Board layers={layers} />
      <Panel layers={layers} onTranslate={handleTranslate} onRotate={handleRotate} />
    </Wrapper>
  )
}

export default App
