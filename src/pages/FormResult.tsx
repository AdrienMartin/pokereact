import { useLocation } from "react-router-dom";

export default function FormResult() {
  const location = useLocation();
  const data = location.state.data;

  return (
    <>
      <div>{data.nom}</div>
      <div>{data.prenom}</div>
      <div>{data.age}</div>
    </>
  );
}
