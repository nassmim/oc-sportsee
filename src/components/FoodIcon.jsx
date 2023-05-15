import styled from "styled-components"

const Food = styled.div`
  display: flex;
  // justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 258/124;
  max-width: 258px;
  padding: 30px;
  border-radius: 5px;
  background-color: #fbfbfb;
`
export default function FoodIcon({ img, alt, style }) {
  return (
    <Food>
      <img src={img} alt={alt} style={style} />
    </Food>
  )
}
