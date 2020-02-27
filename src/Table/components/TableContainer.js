import React from "react";
import TableRow from "./TableRow";

// table
const TableContainer = ({ items, sortByDate }) => {
  const itemsList =
    items && items.length !== 0 ? (
      items.map(el => (
        <TableRow
          key={el.question_id}
          ownerAvatar={el.owner.profile_image}
          ownerName={el.owner.display_name}
          ownerLink={el.owner.link}
          title={el.title}
          questionLink={el.link}
          tags={el.tags}
          date={el.creation_date}
        />
      ))
    ) : (
      <p className="empty-text">-- Пусто --</p>
    );

  return (
    <div className="table">
      <div className="table__row table__header">
        <button className="table__cell" disabled>
          Автор
        </button>
        <button className="table__cell" disabled>
          Заголовок вопроса
        </button>
        <button className="table__cell" disabled>
          Теги
        </button>
        <button className="table__cell" onClick={sortByDate}>
          Дата создания
        </button>
      </div>
      <div className="table__body">{itemsList}</div>
    </div>
  );
};

export default TableContainer;
