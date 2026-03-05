import { useLocation } from "react-router-dom";

export default function FormResult() {
  const location = useLocation();
  const data = location.state.data;

  return (
    <>
      <div>{data.exampleRequired}</div>
      <div>{data.gender}</div>
      <div>{data.age}</div>
    </>
  );
}
