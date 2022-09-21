import "./css/Board.css";
import { Link } from "react-router-dom";

export default function Board({boardlist, boardname}) {
  return (
    <>
      <table>
        <thead>
          <tr>
            {boardname.map((type) => (
              <th>{type.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {boardlist.map((list) => {
            return (
              <tr>
                <td>{list.contentNum}</td>
                <td><Link to={`/content/${list.contentNum}`}>{list.title} </Link></td>
                <td>{list.userId}</td>
                <td>{list.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>


    </>
  );
}
