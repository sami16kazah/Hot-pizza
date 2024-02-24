import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiServices';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    <div>
      <ul className="divide-y divide-stone-200 px-2">
        {menu.map((item) => (
          <MenuItem item={item} key={item.id}></MenuItem>
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
