import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteStory } from "./storiesSlice";

export default function StoryList() {
  const dispatch = useAppDispatch();
  const stories = useAppSelector((state) => state.stories.items);

  return (
    <div>
      <h2>Stories</h2>
      <ul>
        {stories.map((s) => (
          <li key={s.id}>
            {s.title}
            <button onClick={() => dispatch(deleteStory(s.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
