import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  canvas {
    display: block;
    width: 100%;
    height: 100%;
    cursor: grab;
  }
  canvas:active {
    cursor: grabbing;
  }
`