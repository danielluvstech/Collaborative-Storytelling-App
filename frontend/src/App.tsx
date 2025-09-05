import LoginForm from "./features/auth/LoginForm";
import StoryList from "./features/stories/StoryList";

export default function App() {
  return (
    <div>
      <h1>Collaborative Storytelling</h1>
      <LoginForm />
      <StoryList />
    </div>
  );
}

