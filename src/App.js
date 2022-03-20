import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [categories, setCategories] = useState();
  const [mealByName, setMealByName] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => setCategories(res.data.categories))
      .catch(error => console.error(error));
  }, []);

  const handleClick = () => {
    axios.get(`http://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then(res => setMealByName(res.data.meals[0]))
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
      <span>Enter Recipe </span>
      <input type="text" value={name} onChange={(e) => handleChange(e)} />
      <button type="button" onClick={() => handleClick()}>search</button>
      <br />
      <br />
    <div  style={{display:"block"}}>
      <table border="1" width="50%"  style={{float:"left"}}>
        <tr>
          <th>Id</th>
          <th>Category</th>
          <th>Description</th>
          <th>Thumbnail</th>
        </tr>
        {
          categories && categories.map((c) => {
            return <tr>
              <td>{c.idCategory}</td>
              <td>{c.strCategory}</td>
              <td>{c.strCategoryDescription}</td>
              <td><img src={c.strCategoryThumb} width="100px" height="100px" alt="error" /></td>
            </tr>
          })
        }
      </table>
      </div>

      <div  style={{display:"block"}}>
      <table border="1" width="50%" style={{float:"right"}}>
        {mealByName && Object.entries(mealByName).map(([key, value]) => {
          return <tr><td>{key}</td><td>{value}</td></tr>
        })}
      </table >

      </div>
    </div>
  );
}

export default App;

