import SubMenuCategory from './SubMenuCategory';

const MenuCategory = ({
  MenuCategory: { category }, handleAccordian, menuTitle,
}) => (
  <li className="menu-category">
    <button className="accordion-menu" onClick={handleAccordian} data-accordion-btn>
      <p className="menu-title">{menuTitle}</p>
      <div>
        <ion-icon name="add-outline" className="add-icon" />
        {/* <ion-icon name="remove-outline" className="remove-icon" /> */}
      </div>
    </button>
    <ul className="submenu-category-list" data-accordion>
      {
          category?.map((object, i) => (
            <SubMenuCategory key={i} item={object} />
          ))
        }

    </ul>
  </li>
);

export default MenuCategory;
