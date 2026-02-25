import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Hi Friend, Thin Thin here. Your Comfort Friend AI!</h1>
      <button onClick={() => navigate("/chat")}>
        Let's Start
      </button>
    </div>
  );
}

export default Home;